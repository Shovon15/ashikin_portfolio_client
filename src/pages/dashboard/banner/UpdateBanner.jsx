import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import GoBackButton from "../../../components/Button/GoBackButton";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useEffect, useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { get, put } from "../../../utils/fetchApi";
import handleFileUpload from "../../../helper/ImageUploader";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";

const UpdateBanner = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [bannerHeader, setBannerHeader] = useState("");
	const [bannerText, setBannerText] = useState("");
	const [oldBackgroundImage, setOldBackgroundImage] = useState("");
	const [oldPortfolioImage, setOldPortfolioImage] = useState("");

	const [newBackgroundImage, setNewBackgroundImage] = useState(null);
	const [newPortfolioImage, setNewPortfolioImage] = useState(null);

	const [backgroundImageFileName, setBackgroundImageFileName] = useState("No file choosen");
	const [portfolioFileName, setPortfolioFileName] = useState("No file choosen");

	const inputBackgroundImageRef = useRef(null);
	const inputPortfolioImageRef = useRef(null);

	const navigate = useNavigate();

	const [isUpdateBackgroundImage, setIsUpdateBackgroundImage] = useState(false);
	const [isUpdatePortfolioImage, setIsUpdatePortfolioImage] = useState(false);

	// const handleUploadImage = () => {
	// 	setIsUpdateImage(true);
	// };

	const [bannerData, setBannerData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await get("banner");
			setBannerData(response.data.payload.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (Object.keys(bannerData).length !== 0) {
			setBannerHeader(bannerData?.bannerHeader);
			setBannerText(bannerData?.bannerText);
			setOldBackgroundImage(bannerData?.backgroundImage);
			setOldPortfolioImage(bannerData?.portfolioImage);
		}
	}, [bannerData]);
	console.log(bannerData[0]?.backgroundImage);

	const handleBannerForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let backgroundmgData = {};
		let portfolioImageData = {};

		if (newBackgroundImage && isUpdateBackgroundImage) {
			backgroundmgData = await handleFileUpload(newBackgroundImage);
		}
		if (newPortfolioImage && isUpdatePortfolioImage) {
			portfolioImageData = await handleFileUpload(newPortfolioImage);
		}

		const formData = {
			bannerHeader,
			bannerText,
			...(isUpdateBackgroundImage ? { backgroundImage: backgroundmgData?.url || null } : {}),
			...(isUpdatePortfolioImage ? { portfolioImage: portfolioImageData?.url || null } : {}),
		};
		console.log(formData, "formData");

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await put("banner/update-banner", formData);
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
			<HeaderText>Update banner</HeaderText>
			<form onSubmit={handleBannerForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Banner Heading <span className="text-red-500">*</span>
						</p>
						<Input
							value={bannerHeader}
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
						<Textarea
							value={bannerText}
							size="lg"
							color="yellow"
							label="Blog title"
							className="text-color-text "
							rows={4}
							onChange={(ev) => setBannerText(ev.target.value)}
						/>
					</div>
					{/* background image */}
					<div>
						<p className="font-bold text-color-text py-2">
							Banner Image <span className="text-red-500">*</span>
						</p>
						<div className="mx-auto">
							{!isUpdateBackgroundImage ? (
								<div className=" border-2 border-dashed border-color-border p-5">
									<img src={oldBackgroundImage} alt="..." />
									<div className="flex justify-center mt-2">
										<PrimaryButton
											className="py-2"
											onClick={() => setIsUpdateBackgroundImage(true)}
										>
											Upload new Image
										</PrimaryButton>
									</div>
								</div>
							) : (
								<div>
									<div
										className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer  ${
											newBackgroundImage ? "border-color-border" : "border-gray-500"
										}`}
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
													setBackgroundImageFileName(files[0].name);
													setNewBackgroundImage(files[0]);
												}
											}}
											ref={inputBackgroundImageRef}
											key={backgroundImageFileName}
										/>
										{newBackgroundImage ? (
											<img
												src={URL.createObjectURL(newBackgroundImage)}
												className="w-full h-full p-5"
												alt={backgroundImageFileName}
											/>
										) : (
											<div className="flex flex-col items-center gap-2 text-color-text">
												<LuUploadCloud className="w-12 h-12" />
												<p>Browse file to upload</p>
											</div>
										)}
									</div>
									<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
										{backgroundImageFileName}
										{newBackgroundImage !== null && (
											<IconButton variant="text" className="rounded-full">
												<BsTrashFill
													onClick={() => {
														setBackgroundImageFileName("No file selected");
														setNewBackgroundImage(null);
														inputBackgroundImageRef.current.value = null;
													}}
													className="w-5 h-5 text-red-500 cursor-pointer"
												/>
											</IconButton>
										)}
									</section>
									<p className="text-red-500 text-md py-2">
										Note: If you don&apos;t want to upload a new blog image, please refresh the page
										before clicking the update button.
									</p>
								</div>
							)}
						</div>
					</div>
					{/* portfolio image */}
					<div>
						<p className="font-bold text-color-text py-2">
							Portfolio Image <span className="text-red-500">*</span>
						</p>
						<div style={{ maxWidth: "400px" }} className="mx-auto">
							{!isUpdatePortfolioImage ? (
								<div className="border-2 border-dashed border-color-border">
									<img src={oldPortfolioImage} alt="..." />
									<div className="flex justify-center mt-2 pb-2">
										<PrimaryButton
											className=" py-2 "
											onClick={() => setIsUpdatePortfolioImage(true)}
										>
											Upload new Image
										</PrimaryButton>
									</div>
								</div>
							) : (
								<div>
									<div
										className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer  ${
											newPortfolioImage ? "border-color-border" : "border-gray-500"
										}`}
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
													setNewPortfolioImage(files[0]);
												}
											}}
											ref={inputPortfolioImageRef}
											key={portfolioFileName}
										/>
										{newPortfolioImage ? (
											<img
												src={URL.createObjectURL(newPortfolioImage)}
												className="w-full h-full p-5"
												alt={portfolioFileName}
											/>
										) : (
											<div className="flex flex-col items-center gap-2 text-color-text">
												<LuUploadCloud className="w-12 h-12" />
												<p>Browse file to upload</p>
											</div>
										)}
									</div>
									<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
										{portfolioFileName}
										{newPortfolioImage !== null && (
											<IconButton variant="text" className="rounded-full">
												<BsTrashFill
													onClick={() => {
														setPortfolioFileName("No file selected");
														setNewPortfolioImage(null);
														inputPortfolioImageRef.current.value = null;
													}}
													className="w-5 h-5 text-red-500 cursor-pointer"
												/>
											</IconButton>
										)}
									</section>
									<p className="text-red-500 text-md py-2">
										Note: If you don&apos;t want to upload a new blog image, please refresh the page
										before clicking the update button.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-[5rem]">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Update"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateBanner;
