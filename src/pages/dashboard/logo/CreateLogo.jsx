import { IconButton, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";
import { post } from "../../../utils/fetchApi";

const CreateLogo = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [logoImage, setLogoImage] = useState(null);

	const [logoFileName, setLogoFileName] = useState("No file choosen");

	const inputLogoImageRef = useRef(null);

	const navigate = useNavigate();

	const handleBannerForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!logoImage) {
			setIsLoading(false);
			showErrorToast("logo is required");
			return;
		}

		const formData = new FormData();
		formData.append("logo", logoImage);

		try {
			const res = await post("logo/create-logo", formData, "multipart/form-data");
			showSuccessToast(res.data?.message);
			navigate("/dashboard/logo");
		} catch (err) {
			showErrorToast(err?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="pb-10">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Create Logo</HeaderText>
			<form onSubmit={handleBannerForm}>
				<div className="max-w-80 lg:w-1/3 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text py-2">
							Logo <span className="text-red-500">*</span>
						</p>
						<div
							className={`mx-auto border-2 border-dashed max-w-80 h-80 cursor-pointer
                            ${logoImage ? "border-color-border" : "border-gray-500"}`}
							onClick={() => inputLogoImageRef.current.click()}
						>
							<input
								type="file"
								accept="image/*"
								className="input-field"
								hidden
								onChange={(event) => {
									const files = event.target.files;
									if (files[0]) {
										setLogoFileName(files[0].name);
										setLogoImage(files[0]);
									}
								}}
								ref={inputLogoImageRef}
								key={logoFileName}
							/>
							{logoImage ? (
								<img
									src={URL.createObjectURL(logoImage)}
									className="w-80 h-80 p-5"
									alt={logoFileName}
								/>
							) : (
								<div className="h-full flex flex-col justify-center items-center gap-2 text-color-text">
									<LuUploadCloud className="w-12 h-12 " />
									<p className="">Browse file to upload</p>
								</div>
							)}
						</div>
						<section
							className="flex-end gap-3 bg-color-secondary
                           rounded-md mt-1 p-2 pr-2 text-color-text"
						>
							{logoFileName}
							{logoImage !== null && (
								<IconButton variant="text" className="rounded-full">
									<BsTrashFill
										onClick={() => {
											setLogoFileName("No file selected");
											setLogoImage(null);
											inputLogoImageRef.current.value = null;
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

export default CreateLogo;
