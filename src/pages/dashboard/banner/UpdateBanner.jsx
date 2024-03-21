import { IconButton, Input, Spinner, Textarea } from "@material-tailwind/react";
import GoBackButton from "../../../components/Button/GoBackButton";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useEffect, useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import { get, put } from "../../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";

const UpdateBanner = () => {
	const [bannerHeader, setBannerHeader] = useState("");
	const [bannerText, setBannerText] = useState("");
	const [oldImageList, setOldImageList] = useState([]);
	const [newImageList, setNewImageList] = useState([]);
	const [loading, setLoading] = useState(false);

	const inputBannerImageRef = useRef(null);

	const navigate = useNavigate();

	const { data: bannerData = [], isLoading } = useQuery({
		queryKey: ["bannerData"],
		queryFn: async () => {
			const res = await get("banner");
			const data = res.data.payload.data;

			return data;
		},
	});

	useEffect(() => {
		if (Object.keys(bannerData).length !== 0) {
			setBannerHeader(bannerData[0]?.bannerHeader);
			setBannerText(bannerData[0]?.bannerText);
			setOldImageList(bannerData[0]?.imageList);
		}
	}, [bannerData]);

	const handleImageChange = (event) => {
		const files = event.target.files;
		const imagesArray = Array.from(files);
		setNewImageList((prevImages) => [...prevImages, ...imagesArray]);
	};

	const handleBannerForm = async (e) => {
		e.preventDefault();
		console.log(oldImageList, newImageList);

		if (Object.values({ bannerHeader, bannerText }).some((field) => !field)) {
			setLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			setLoading(true);
			let formData = {
				bannerHeader,
				bannerText,
				imageList: [] // Initialize with an empty array
			};
			
			if (oldImageList.length > 0) {
				formData.imageList = [...oldImageList]; 
			}
			
			if (newImageList.length > 0) {
				const newImagesUploaded = await Promise.all(
					newImageList.map(async (image) => {
						try {
							const imageData = await cloudinaryImageUploader(image);
							return imageData.url;
						} catch (error) {
							console.error("Error uploading image:", error);
							return null;
						}
					})
				);
			
				if (newImagesUploaded.some((url) => url === null)) {
					showErrorToast("Error occurred during image upload. Please try again.");
					setLoading(false);
					return;
				}
			
				formData.imageList = [...formData.imageList, ...newImagesUploaded];
			}
			
			if (formData.imageList.length === 0) {
				// Handle the case where no images are present
				showErrorToast("Please upload at least one image.");
				setLoading(false);
				return;
			}

			

			const res = await put("banner/update-banner", formData);
			showSuccessToast(res.data?.message);
			navigate("/dashboard/banner");
		} catch (error) {
			console.error("Error upload banner ", error);
			const errorMessage = error?.response?.data?.message || "An error occurred while uploading the banner.";
			showErrorToast(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="pb-10">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Update banner</HeaderText>
			<form onSubmit={handleBannerForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-primary  py-2">
							Banner Heading <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							value={bannerHeader}
							color="blue"
							label="Banner Heading"
							className="text-color-primary "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setBannerHeader(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-primary  py-2">
							Banner Description <span className="text-red-500">*</span>
						</p>
						<Textarea
							value={bannerText}
							size="lg"
							color="blue"
							label="Banner description"
							className="text-color-primary "
							rows={4}
							onChange={(ev) => setBannerText(ev.target.value)}
						/>
					</div>

					<div className="">
						<p className="font-bold text-color-primary py-2">
							Banner Image(&apos;s) <span className="text-red-500">*</span>
						</p>
						{oldImageList.length > 0 && (
							<>
								<p className="font-bold text-color-primary py-2">Uploaded image lists</p>
								<div className="flex gap-2 flex-wrap justify-center border">
									{oldImageList.map((image, index) => (
										<div
											key={index}
											className="flex flex-col justify-center items-center hover:ring-2 p-1"
										>
											<img src={image} className="w-44 h-34" alt={`image-${index}`} />
											<IconButton
												onClick={() =>
													setOldImageList((prevImages) =>
														prevImages.filter((_, i) => i !== index)
													)
												}
												variant="text"
												className="text-red-500 rounded-full"
											>
												<BsTrashFill className="w-5 h-5" />
											</IconButton>
										</div>
									))}
								</div>
							</>
						)}

						{newImageList.length > 0 && (
							<>
								<p className="font-bold text-color-primary py-2">New Image(&apos;s)</p>
								<div className="flex gap-2 flex-wrap justify-center border">
									{newImageList.map((image, index) => (
										<div
											key={index}
											className="flex flex-col justify-center items-center hover:ring-2 p-1"
										>
											<img src={URL.createObjectURL(image)} className="w-44 h-34" alt={[index]} />
											<IconButton
												onClick={() =>
													setNewImageList((prevImages) =>
														prevImages.filter((image, i) => i !== index)
													)
												}
												variant="text"
												className=" text-red-500 rounded-full"
											>
												<BsTrashFill className="w-5 h-5" />
											</IconButton>
										</div>
									))}
								</div>
							</>
						)}

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
								<div className="flex flex-col items-center gap-2 text-color-primary">
									<LuUploadCloud className="w-12 h-12 " />
									<p className="">Browse file to upload</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={loading} className="px-[5rem]">
						{loading ? <Spinner color="gray" className="mx-auto" /> : "Update"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateBanner;
