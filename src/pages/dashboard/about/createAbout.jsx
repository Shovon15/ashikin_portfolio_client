import { Editor } from "@tinymce/tinymce-react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useRef } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";

const CreateAbout = () => {
	const [heading, setHeading] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file choosen");
	const [isLoading, setIsLoading] = useState(false);

	const inputImageRef = useRef(null);
	const editorRef = useRef(null);
	const navigate = useNavigate();

	const handleForm = async (e) => {
		e.preventDefault();

		if (!heading || !description || !image) {
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			setIsLoading(true);

			const imageData = await cloudinaryImageUploader(image);
			if (!imageData) {
				showErrorToast("Error uploading image.");
				return;
			}

			const formData = {
				heading,
				description,
				profileImage: imageData.url,
			};

			// Proceed with the submission
			const res = await post("profile/create-profile", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/about");
		} catch (error) {
			console.error("Error uploading profile ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the profile.";
			showErrorToast(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="lg:pb-10">
			<GoBackButton />
			<HeaderText className="py-5">Create About</HeaderText>
			<form onSubmit={handleForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							about Heading <span className="text-red-500">*</span>
						</p>
						<Input
							value={heading}
							size="lg"
							color="blue"
							label="heading"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setHeading(ev.target.value)}
						/>
					</div>

					<div className="w-full">
						<p className="font-bold text-color-primary py-2">
							profile Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`center border-2 border-dashed mx-auto w-80 h-80 cursor-pointer
                    ${image ? "border-color-border" : "border-gray-500"}`}
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
								<img src={URL.createObjectURL(image)} className="w-full h-full p-5" alt={fileName} />
							) : (
								<div className="flex flex-col items-center gap-2 text-color-primary">
									<LuUploadCloud className="w-12 h-12 " />
									<p className="">Browse file to upload</p>
								</div>
							)}
						</div>
						<section
							className="flex-end gap-3 bg-color-secondary
                   rounded-md mt-1 p-2 pr-2 text-color-primary"
						>
							{fileName}
							{image !== null && (
								<IconButton variant="text" className="rounded-full">
									<BsTrashFill
										onClick={() => {
											setFileName("No file selected");
											setImage(null);
											inputImageRef.current.value = null;
										}}
										className="w-5 h-5 text-red-500 cursor-pointer"
									/>
								</IconButton>
							)}
						</section>
					</div>
				</div>
				{/* text-editor */}
				<div className="h-auto">
					<p className="font-bold text-color-primary py-2">
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
					/>
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

export default CreateAbout;
