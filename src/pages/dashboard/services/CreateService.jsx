import { IconButton, Input, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";

const CreateService = () => {
	const [heading, setHeading] = useState("");
	const [title, setTitle] = useState("");
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [description, setDescription] = useState([""]);

	const [isLoading, setIsLoading] = useState(false);

	// --------------description input fileds-----------------
	const handleDescInputChange = (index, value) => {
		const newDescription = [...description];
		newDescription[index] = value;
		setDescription(newDescription);
	};
	const handleAddMore = () => setDescription([...description, ""]);
	const handleRemove = (index) => {
		const newDescription = [...description];
		newDescription.splice(index, 1);
		setDescription(newDescription);
	};
	// ---------------------------------------------------
	const inputImageRef = useRef(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			heading,
			title,
			cover: imgData?.url || null,
			description,
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await post("services/write-service", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/services");
		} catch (err) {
			showErrorToast(err?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Create Service</HeaderText>
			<form onSubmit={handleSubmit}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							Service Heading <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="Service Heading"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setHeading(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-primary capitalize py-2">
							service Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="blue"
							label="service Title"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setTitle(ev.target.value)}
						/>
					</div>
					{/* image-input */}
					<div>
						<p className="font-bold text-color-primary py-2">
							Service Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`center border-2 border-dashed w-full h-80 cursor-pointer
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
					<div>
						<p className="font-bold text-color-primary  py-2">
							Service Description <span className="text-red-500">*</span>
						</p>
						{description.map((item, index) => (
							<div key={index} className="mb-4 flex">
								<Input
									size="lg"
									color="blue"
									label={`Service description ${index + 1}`}
									className="text-color-primary "
									value={item}
									onChange={(e) => handleDescInputChange(index, e.target.value)}
								/>
								{description.length > 1 && (
									<button
										type="button"
										onClick={() => handleRemove(index)}
										className="ml-2 text-red-500 p-3 hover:bg-color-secondary rounded-full"
									>
										<BsTrashFill className="w-5 h-5" />
									</button>
								)}
							</div>
						))}
						<div className="center">
							<PrimaryButton onClick={handleAddMore} className="p-2 ">
								Add More Description
							</PrimaryButton>
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

export default CreateService;
