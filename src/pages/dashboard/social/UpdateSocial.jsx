/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useNavigate, useParams } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { LuUploadCloud } from "react-icons/lu";
import { get, put } from "../../../utils/fetchApi";
import GoBackButton from "../../../components/Button/GoBackButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import cloudinaryImageUploader from "../../../helper/cloudinaryImageUploader";

const UpdateSocial = () => {
	const [socialData, setSocialData] = useState({});
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [socialLink, setSocialLink] = useState("");

	const [oldImage, setOldImage] = useState("");
	const [image, setImage] = useState(null);

	const [fileName, setFileName] = useState("No file selected");
	const [isLoading, setIsLoading] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(false);

	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const inputImageRef = useRef(null);

	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsDataLoading(true);
			const response = await get("social/" + id, id);
			setSocialData(response.data.payload.data);
			setIsDataLoading(false);
		};
		fetchEvent();
	}, []);

	useEffect(() => {
		if (Object.keys(socialData).length !== 0) {
			setName(socialData.name);
			setDescription(socialData.description);
			setSocialLink(socialData.socialLink);
			setOldImage(socialData.logo);
		}
	}, [socialData]);

	const handleUploadImage = () => {
		setIsUpdateImage(true);
	};

	const handleEventForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!(name || description || socialLink)) {
			setIsLoading(false);
			showErrorToast("All field is required");
			return;
		}
		if (isUpdateImage && !image) {
			setIsLoading(false);
			showErrorToast("social image is required");
			return;
		}

		try {
			let formData = {
				name,
				description,
				socialLink,
			};

			// Add image to formData if isUpdateImage is true and image exists
			if (isUpdateImage && image) {
				const data = await cloudinaryImageUploader(image);
				formData.logo = data.url;
			}

			try {
				const res = await put(`social/update-social/${id}`, formData);
				showSuccessToast(res.data?.message);
				navigate("/dashboard/social");
			} catch (err) {
				showErrorToast(err?.response?.data.message);
			}
		} catch (error) {
			console.error("Failed to upload image:", error);
			showErrorToast("Failed to upload image. Please try again.");
		} finally {
			setIsLoading(false);
		}

		// try {
		// 	const res = await put(`social/update-social/${id}`, formData, "multipart/form-data");
		// 	showSuccessToast(res.data?.message);
		// 	navigate("/dashboard/social");
		// } catch (err) {
		// 	showErrorToast(err?.response?.data.message);
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	if (isDataLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<GoBackButton />
			<HeaderText className="py-5">Update Social link</HeaderText>
			<form onSubmit={handleEventForm}>
				<div className="w-full md:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					<div>
						<p className="font-bold text-color-text  py-2">
							Social Link Name <span className="text-red-500">*</span>
						</p>
						<Input
							size="lg"
							color="yellow"
							label="ex:(Facebook)"
							value={name}
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
							label="ex:(2.3k followers)"
							value={description}
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
							label="ex:(https://www.facebook.com)"
							value={socialLink}
							className="text-color-text "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setSocialLink(ev.target.value)}
						/>
					</div>
					<div>
						<p className="font-bold text-color-text py-2">
							Social logo <span className="text-red-500">*</span>
						</p>
						{!isUpdateImage ? (
							<div className="w-64 mx-auto">
								<img src={oldImage} alt="..." />
								<div className="flex justify-center mt-2">
									<PrimaryButton className=" " onClick={handleUploadImage}>
										Upload new Image
									</PrimaryButton>
								</div>
							</div>
						) : (
							<>
								<div
									className={`flex justify-center items-center border-2 border-dashed  w-64 mx-auto h-64 cursor-pointer ${
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
										<div className="flex flex-col items-center gap-2 text-color-text">
											<LuUploadCloud className="w-12 h-12" />
											<p>Browse file to upload</p>
										</div>
									)}
								</div>
								<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
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
								<p className="text-red-500 text-md py-2">
									Note: If you don&apos;t want to upload a new cover image, please refresh the page
									before clicking the update button.
								</p>
							</>
						)}
					</div>
				</div>
				<div className="w-full flex justify-center items-center my-10 ">
					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Update"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateSocial;
