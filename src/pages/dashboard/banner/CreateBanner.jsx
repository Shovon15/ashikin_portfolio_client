import { IconButton, Input, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";

const CreateBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [bannerHeader, setBannerHeader] = useState("");
	const [bannerText, setBannerText] = useState("");

	const [backgroundImage, setBackgroundImage] = useState(null);
	const [portfolioImage, setPortfolioImage] = useState(null);

	const [backgroundFileName, setBackgroundFileName] = useState("No file choosen");
	const [portfolioFileName, setPortfolioFileName] = useState("No file choosen");

	const inputBackgroundImageRef = useRef(null);
	const inputPortfolioImageRef = useRef(null);

	const navigate = useNavigate();

	// console.log(portfolioImage, portfolioFileName);

	const handleBannerForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let backgroundmgData = {};
		let portfolioImageData = {};

		if (backgroundImage) {
			backgroundmgData = await handleFileUpload(backgroundImage);
		}
		if (portfolioImage) {
			portfolioImageData = await handleFileUpload(portfolioImage);
		}

		const formData = {
			bannerHeader,
			bannerText,
			backgroundImage: backgroundmgData?.url || null,
			portfolioImage: portfolioImageData?.url || null,
		};
		console.log(formData, "formData");

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await post("banner/create-banner", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/banner");
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
			<HeaderText>Create banner</HeaderText>
			<form onSubmit={handleBannerForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Blog Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="Blog Title"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setBannerHeader(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text  py-2">
							Blog Title <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="Blog Title"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setBannerText(ev.target.value)}
						/>
					</div>

					<div>
						<p className="font-bold text-color-text py-2">
							Background Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`center border-2 border-dashed w-full h-80 cursor-pointer
                            ${backgroundImage ? "border-color-border" : "border-gray-500"}`}
							onClick={() => inputBackgroundImageRef.current.click()}
						>
							<input
								type="file"
								accept="image/*"
								className="input-field"
								hidden
								onChange={(event) => {
									const files = event.target.files;
									if (files[0]) {
										setBackgroundFileName(files[0].name);
										setBackgroundImage(files[0]);
									}
								}}
								ref={inputBackgroundImageRef}
								key={backgroundFileName}
							/>
							{backgroundImage ? (
								<img
									src={URL.createObjectURL(backgroundImage)}
									className="w-full h-full p-5"
									alt={backgroundFileName}
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
                           rounded-md mt-1 p-2 pr-2 text-color-text"
						>
							{backgroundFileName}
							{backgroundImage !== null && (
								<IconButton variant="text" className="rounded-full">
									<BsTrashFill
										onClick={() => {
											setBackgroundFileName("No file selected");
											setBackgroundImage(null);
											inputBackgroundImageRef.current.value = null;
										}}
										className="w-5 h-5 text-red-500 cursor-pointer"
									/>
								</IconButton>
							)}
						</section>
					</div>
					<div>
						<p className="font-bold text-color-text py-2">
							Portfolio Image <span className="text-red-500">*</span>
						</p>
						<div
							className={`center border-2 border-dashed w-full max-w-[300px] mx-auto h-80 cursor-pointer
                            ${portfolioImage ? "border-color-border" : "border-gray-500"}`}
							onClick={() => inputPortfolioImageRef.current.click()}
						>
							<input
								type="file"
								accept="image/*"
								className="input-field"
								hidden
								onChange={(event) => {
									const files = event.target.files;
									if (files[0]) {
										setPortfolioFileName(files[0].name);
										setPortfolioImage(files[0]);
									}
								}}
								ref={inputPortfolioImageRef}
								key={portfolioFileName}
							/>
							{portfolioImage ? (
								<img
									src={URL.createObjectURL(portfolioImage)}
									className="w-full h-full p-5"
									alt={portfolioFileName}
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
                           rounded-md mt-1 p-2 pr-2 text-color-text"
						>
							{portfolioFileName}
							{portfolioImage !== null && (
								<IconButton variant="text" className="rounded-full">
									<BsTrashFill
										onClick={() => {
											setPortfolioFileName("No file selected");
											setPortfolioImage(null);
											inputPortfolioImageRef.current.value = null;
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

export default CreateBanner;
