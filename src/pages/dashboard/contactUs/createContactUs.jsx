import { useState } from "react";
import { useRef } from "react";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";
import { post } from "../../../utils/fetchApi";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const CreateContactUs = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file choosen");
	const [isLoading, setIsLoading] = useState(false);

	const inputImageRef = useRef(null);
	const navigate = useNavigate();

	const handleForm = async (e) => {
		e.preventDefault();

		if (!(title || description || image)) {
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
				title,
				description,
				image: imageData.url,
			};

			// Proceed with the submission
			const res = await post("contact", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/contact");
		} catch (error) {
			console.error("Error uploading contact ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the contact.";
			showErrorToast(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="lg:pb-10">
			<GoBackButton />
			<HeaderText className="py-5">Create Contact </HeaderText>
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
							label="title"
							className="text-color-primary"
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>

					<div>
						<p className="font-bold text-color-primary  py-2">
							Description <span className="text-red-500">*</span>
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
						<div
							className={`center border-2 border-dashed mx-auto w-full h-80 cursor-pointer
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
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default CreateContactUs;
