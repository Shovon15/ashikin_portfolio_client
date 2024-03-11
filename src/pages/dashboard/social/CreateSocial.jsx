import { IconButton, Input, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";

const CreateSocial = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [socialLink, setSocialLink] = useState("");

	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No file selected");

	const [isLoading, setIsLoading] = useState(false);

	const inputImageRef = useRef(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!(name || image || description || socialLink)) {
			setIsLoading(false);
			showErrorToast("All field is required");
			return;
		}

		const formData = new FormData();
		formData.append("name", name);
		formData.append("description", description);
		formData.append("socialLink", socialLink);
		formData.append("logo", image); 

		try {
			const res = await post("social/create-social", formData, "multipart/form-data");
			showSuccessToast(res.data?.message);
			navigate("/dashboard/social");
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
			<HeaderText>Create Socail Link</HeaderText>
			<form onSubmit={handleSubmit}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Social Link Name <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="Facebook"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text capitalize py-2">
							Social Description <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="2.3k followers"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setDescription(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text capitalize py-2">
							Social Link <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="https://www.facebook.com"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setSocialLink(ev.target.value)}
						/>
					</div>
					{/* image-input */}
					<div>
						<p className="font-bold text-color-text py-2">
							Social logo <span className="text-red-500">*</span>
						</p>
						<div className="w-80 h-80 mx-auto">
							<div
								className={`center border-2 border-dashed w-full h-full cursor-pointer
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
									<img
										src={URL.createObjectURL(image)}
										className="w-full h-full p-5"
										alt={fileName}
									/>
								) : (
									<div className="flex flex-col items-center gap-2 text-color-text">
										<LuUploadCloud className="w-12 h-12 " />
										<p className="">Browse file to upload</p>
									</div>
								)}
							</div>
							<section
								className="flex-end gap-3 bg-color-secondary
                           rounded-md mt-1 p-2 pr-2 text-color-text my-5"
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
				</div>

				<div className="w-full flex justify-center items-center my-16 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Submit"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default CreateSocial;
