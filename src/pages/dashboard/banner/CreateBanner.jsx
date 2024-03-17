import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";

const CreateBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [bannerHeader, setBannerHeader] = useState("");
	const [bannerText, setBannerText] = useState("");

	const [selectedImages, setSelectedImages] = useState([]);
	const [selectedImageFileNames, setSelectedImageFileNames] = useState([]);
	const inputBannerImageRef = useRef(null);

	const navigate = useNavigate();

	const handleImageChange = (event) => {
		const files = event.target.files;
		const imagesArray = Array.from(files);
		setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);

		const fileNamesArray = Array.from(files).map((file) => file.name);
		setSelectedImageFileNames((prevNames) => [...prevNames, ...fileNamesArray]);
	};

	const removeImage = (index) => {
		setSelectedImages((prevImages) => prevImages.filter((image, i) => i !== index));
		setSelectedImageFileNames((prevNames) => prevNames.filter((name, i) => i !== index));
	};

	const handleBannerForm = async (e) => {
		e.preventDefault();

		if (Object.values({ bannerHeader, bannerText }).some((field) => !field) || !selectedImages.length > 0) {
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			setIsLoading(true);

			const imageList = await Promise.all(
				selectedImages.map(async (image) => {
					try {
						const imageData = await cloudinaryImageUploader(image);
						return imageData.url;
					} catch (error) {
						// Handle error for individual image upload
						console.error("Error uploading image:", error);
						return null;
					}
				})
			);
			if (imageList.some((url) => url === null)) {
				showErrorToast("Error occurred during image upload. Please try again.");
				return;
			}

			const formData = {
				bannerHeader,
				bannerText,
				imageList: imageList.filter((url) => url !== null),
			};

			const res = await post("banner/create-banner", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/banner");
		} catch (error) {
			console.error("Error upload banner ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the banner.";
			showErrorToast(errorMessage);
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
							Banner Heading <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							value={bannerHeader}
							color="yellow"
							label="Banner Heading"
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setBannerHeader(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text  py-2">
							Banner Description <span className="text-red-500">*</span>
						</p>
						<Textarea
							value={bannerText}
							size="lg"
							color="yellow"
							label="Banner description"
							className="text-color-text "
							rows={4}
							onChange={(ev) => setBannerText(ev.target.value)}
						/>
					</div>

					<div className="">
						<p className="font-bold text-color-text py-2">
							Banner Image(&apos;s) <span className="text-red-500">*</span>
						</p>

						<div className="flex gap-2 flex-wrap justify-center ">
							{selectedImages.length > 0 &&
								selectedImages.map((image, index) => (
									<div
										key={index}
										className="flex flex-col justify-center items-center hover:ring-2 p-1"
									>
										<img
											src={URL.createObjectURL(image)}
											className="w-44 h-34"
											alt={selectedImageFileNames[index]}
										/>
										<IconButton
											onClick={() => removeImage(index)}
											variant="text"
											className=" text-red-500 rounded-full"
										>
											<BsTrashFill className="w-5 h-5" />
										</IconButton>
									</div>
								))}
						</div>
						<div className="flex justify-center p-2">
							<div
								className={`center border-2 border-dashed w-44 h-44 cursor-pointer border-gray-500}`}
								onClick={() => inputBannerImageRef.current.click()}
							>
								<input
									type="file"
									accept="image/*"
									className="input-field"
									hidden
									onChange={handleImageChange}
									ref={inputBannerImageRef}
									multiple
								/>
								<div className="flex flex-col items-center gap-2 text-color-text">
									<LuUploadCloud className="w-12 h-12 " />
									<p className="">Browse file to upload</p>
								</div>
							</div>
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

export default CreateBanner;
