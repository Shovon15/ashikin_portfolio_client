import { Editor } from "@tinymce/tinymce-react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useRef } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { get, put } from "../../../utils/fetchApi";

const UpdateAbout = () => {
	const [heading, setHeading] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [oldImage, setOldImage] = useState(null);
	const [fileName, setFileName] = useState("No file choosen");
	const [loading, setLoading] = useState(false);
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const inputImageRef = useRef(null);
	const editorRef = useRef(null);
	const navigate = useNavigate();

	const { data: profileData = [], isLoading } = useQuery({
		queryKey: ["profileData"],
		queryFn: async () => {
			const res = await get("profile");
			const data = res.data.payload.data;

			return data;
		},
	});

	useEffect(() => {
		if (Object.keys(profileData).length !== 0) {
			setHeading(profileData[0]?.profileHeader);
			setDescription(profileData[0]?.description);
			setOldImage(profileData[0]?.profileImage);
		}
	}, [profileData]);

	const handleForm = async (e) => {
		e.preventDefault();

		if (!heading || !description) {
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			setLoading(true);
			let profileImageUrl = null;

			if (isUpdateImage && image) {
				const imageData = await cloudinaryImageUploader(image);
				if (!imageData) {
					showErrorToast("Error uploading image.");
					return;
				}
				profileImageUrl = imageData.url;
			}

			const formData = {
				heading,
				description,
				profileImage: profileImageUrl,
			};

			// Proceed with the submission
			const res = await put("profile/update-profile", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/about");
		} catch (error) {
			console.error("Error uploading profile ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the profile.";
			showErrorToast(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="lg:pb-10">
			<GoBackButton />
			<HeaderText className="py-5">Create About</HeaderText>
			<form onSubmit={handleForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							about Heading <span className="text-red-500">*</span>
						</p>
						<Input
							value={heading}
							size="lg"
							color="yellow"
							label="heading"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setHeading(ev.target.value)}
						/>
					</div>

					<div className="w-full">
						<p className="font-bold text-color-text py-2">
							Profile Image <span className="text-red-500">*</span>
						</p>
						<div style={{ maxWidth: "400px" }} className="mx-auto">
							{!isUpdateImage ? (
								<div className="">
									<img src={oldImage} alt="..." className="w-80 h-80 mx-auto" />
									<div className="flex justify-center mt-2">
										<PrimaryButton className=" " onClick={() => setIsUpdateImage(true)}>
											Upload new Image
										</PrimaryButton>
									</div>
								</div>
							) : (
								<div>
									<div className="flex justify-end pl-5">
										<IconButton variant="text" className="rounded-full">
											<RxCross2
												onClick={() => {
													setFileName("No file selected");
													setImage(null);
													setIsUpdateImage(false);
													inputImageRef.current.value = null;
												}}
												className="w-5 h-5 text-red-500 cursor-pointer"
											/>
										</IconButton>
									</div>
									<div
										className={`flex justify-center items-center border-2 border-dashed  w-80 h-80 mx-auto cursor-pointer  ${
											image ? "border-color-border" : "border-gray-500"
										}`}
										onClick={() => inputImageRef.current.click()}
									>
										<input
											type="file"
											accept="image/*"
											className="input-field"
											hidden
											onChange={(event) => {
												const files = event.target.files;
												if (files[0]) {
													setFileName(files[0].name);
													setImage(files[0]);
												}
											}}
											ref={inputImageRef}
											key={fileName}
										/>
										{image ? (
											<img
												src={URL.createObjectURL(image)}
												className="w-full h-full p-5"
												alt={fileName}
											/>
										) : (
											<div className="flex flex-col items-center gap-2 text-color-text">
												<LuUploadCloud className="w-12 h-12" />
												<p>Browse file to upload</p>
											</div>
										)}
									</div>
									<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
										{fileName}
										{image !== null && (
											<IconButton variant="text" className="rounded-full">
												<BsTrashFill
													onClick={() => {
														setFileName("No file selected");
														setImage(null);
														setIsUpdateImage(false);
														inputImageRef.current.value = null;
													}}
													className="w-5 h-5 text-red-500 cursor-pointer"
												/>
											</IconButton>
										)}
									</section>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* text-editor */}
				<div className="h-auto">
					<p className="font-bold text-color-text py-2">
						Description <span className="text-red-500">*</span>
					</p>
					<Editor
						apiKey="dne6kwcfh5bie2h2hkj9qjtgu1xk4qthm9k6xajczb3vuj4e"
						onInit={(evt, editor) => {
							editorRef.current = editor;
							editor.on("change", () => setDescription(editor.getContent()));
						}}
						init={{
							plugins:
								"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
							toolbar:
								"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
						}}
						initialValue={description}
					/>
				</div>
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={loading} className="px-16">
						{loading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateAbout;
