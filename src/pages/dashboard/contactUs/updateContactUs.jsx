import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { get, put } from "../../../utils/fetchApi";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const UpdateContactUs = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [oldImage, setOldImage] = useState(null);
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file choosen");
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const inputImageRef = useRef(null);
	const navigate = useNavigate();

	const { id } = useParams();

	const { data: contactData = [], isLoading: loading } = useQuery({
		queryKey: ["contactData"],
		queryFn: async () => {
			const res = await get(`contact/${id}`);
			const data = res.data.payload.data;

			return data;
		},
	});
	useEffect(() => {
		if (Object.keys(contactData).length > 0) {
			setTitle(contactData.title);
			setDescription(contactData.description);
			setOldImage(contactData.image);
		}
	}, [contactData]);

	const handleForm = async (e) => {
		e.preventDefault();

		if (!(title || description)) {
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			setIsLoading(true);
			const formData = {
				title,
				description,
			};

			let profileImageUrl = null;

			if (isUpdateImage && image) {
				const imageData = await cloudinaryImageUploader(image);
				if (!imageData) {
					showErrorToast("Error uploading image.");
					return;
				}
				profileImageUrl = imageData.url;
			}

			if (isUpdateImage && image) {
				formData.image = profileImageUrl;
			}
			// Proceed with the submission
			const res = await put(`contact/${id}`, formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/contact");
		} catch (error) {
			console.error("Error uploading social support ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the profile.";
			showErrorToast(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="lg:pb-10">
			<GoBackButton />
			<HeaderText className="py-5">Update Contact</HeaderText>
			<form onSubmit={handleForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							Title <span className="text-red-500">*</span>
						</p>
						<Input
							value={title}
							size="lg"
							color="blue"
							label="titlr"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>

					<div>
						<p className="font-bold text-color-primary  py-2">
							Description<span className="text-red-500">*</span>
						</p>
						<Textarea
							value={description}
							size="lg"
							color="blue"
							label="description"
							className="text-color-primary"
							rows={4}
							onChange={(ev) => setDescription(ev.target.value)}
						/>
					</div>

					<div className="w-full">
						<p className="font-bold text-color-primary py-2">
							Image <span className="text-red-500">*</span>
						</p>
						<div style={{ maxWidth: "600px" }} className="mx-auto">
							{!isUpdateImage ? (
								<div className="flex flex-col justify-center">
									<img src={oldImage} alt="..." className="" />
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
										className={`flex justify-center items-center  border-2 border-dashed  h-80 cursor-pointer  ${
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
											<div className="flex flex-col items-center gap-2 text-color-primary">
												<LuUploadCloud className="w-12 h-12" />
												<p>Browse file to upload</p>
											</div>
										)}
									</div>
									<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-primary rounded-md mt-1 p-2">
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
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateContactUs;
