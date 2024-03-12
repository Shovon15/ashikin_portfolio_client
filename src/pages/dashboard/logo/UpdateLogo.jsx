import { IconButton, Spinner } from "@material-tailwind/react";
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

const UpdateLogo = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [oldLogoImage, setOldLogoImage] = useState("");

	const [newLogoImage, setNewLogoImage] = useState(null);

	const [logoImageFileName, setLogoImageFileName] = useState("No file choosen");

	const inputLogoImageRef = useRef(null);

	const navigate = useNavigate();

	const [isUpdateLogoImage, setIsUpdateLogoImage] = useState(false);

	// const handleUploadImage = () => {
	// 	setIsUpdateImage(true);
	// };

	const [logoData, setLogoData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await get("logo");
			setLogoData(response.data.payload.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (Object.keys(logoData).length !== 0) {
			setOldLogoImage(logoData?.logoImage);
		}
	}, [logoData]);

	const handleBannerForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let logoImageData = {};

		if (newLogoImage && isUpdateLogoImage) {
			logoImageData = await handleFileUpload(newLogoImage);
		}

		const formData = {
			...(isUpdateLogoImage ? { logoImage: logoImageData?.url || null } : {}),
		};
		console.log(formData, "formData");

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const res = await put("logo/update-logo", formData);
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
			<HeaderText>Update Logo</HeaderText>
			<form onSubmit={handleBannerForm}>
				<div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
					{/* portfolio image */}
					<div>
						<p className="font-bold text-color-text py-2">
							Logo <span className="text-red-500">*</span>
						</p>
						<div style={{ maxWidth: "400px" }} className="mx-auto">
							{!isUpdateLogoImage ? (
								<div className="border-2 border-dashed border-color-border w-full flex flex-col justify-center p-3">
									<img src={oldLogoImage} alt="logo" />
									<div className="flex justify-center mt-5 pb-2">
										<PrimaryButton className=" py-2 " onClick={() => setIsUpdateLogoImage(true)}>
											Upload new Image
										</PrimaryButton>
									</div>
								</div>
							) : (
								<div>
									<div
										className={`flex justify-center items-center border-2 border-dashed  w-full h-34 cursor-pointer  ${
											newLogoImage ? "border-color-border" : "border-gray-500"
										}`}
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
													setLogoImageFileName(files[0].name);
													setNewLogoImage(files[0]);
												}
											}}
											ref={inputLogoImageRef}
											key={logoImageFileName}
										/>
										{newLogoImage ? (
											<img
												src={URL.createObjectURL(newLogoImage)}
												className="w-full h-full p-5"
												alt={logoImageFileName}
											/>
										) : (
											<div className="flex flex-col items-center gap-2 text-color-text py-5">
												<LuUploadCloud className="w-12 h-12" />
												<p>Browse file to upload</p>
											</div>
										)}
									</div>
									<section className="flex justify-end gap-3 items-center bg-color-secondary text-color-text rounded-md mt-1 p-2">
										{logoImageFileName}
										{newLogoImage !== null && (
											<IconButton variant="text" className="rounded-full">
												<BsTrashFill
													onClick={() => {
														setLogoImageFileName("No file selected");
														setNewLogoImage(null);
														inputLogoImageRef.current.value = null;
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

export default UpdateLogo;
