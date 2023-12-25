import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { IconButton, Input, Spinner } from "@material-tailwind/react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import handleFileUpload from "../../../helper/ImageUploader";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import Cookies from "js-cookie";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const UpdateProfile = () => {
	const [name, setName] = useState("");
	const [image, setImage] = useState(null);
	const [oldImage, setOldImage] = useState("");
	const [fileName, setFileName] = useState("No file selected");
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const cookies = Cookies.get("token");

	const { user, fetchData } = useContext(AuthContext);

	const navigate = useNavigate();
	const inputImageRef = useRef(null);

	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			setName(user.name);
			setOldImage(user.avatar);
		}
	}, [user]);

	const handleupdateProfile = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (isUpdateImage && image) {
			imgData = await handleFileUpload(image);
		}

		const formData = {
			name,
			...(isUpdateImage ? { cover: imgData?.url || null } : {}),
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const response = await post(`admin/update-profile/${cookies}`, formData);
			showSuccessToast(response.data?.message);
			fetchData();
			navigate("/dashboard");
		} catch (error) {
			// showErrorToast(error.message);
			showErrorToast(error?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="">
			<div className="">
				<GoBackButton />
			</div>
			<HeaderText className="py-5">Profile Update</HeaderText>
			<form onSubmit={handleupdateProfile} className="mx-5 md:mx-10">
				<div className="w-full md:w-1/2 mx-auto">
					<Input
						size="lg"
						color="yellow"
						value={name}
						label="Name"
						className="text-color-text "
						style={{ fontSize: "18px", fontWeight: "normal" }}
						onChange={(ev) => setName(ev.target.value)}
					/>

					<div style={{ maxWidth: "400px" }} className="mx-auto py-5">
						<p className="font-bold text-color-text py-2">
							Service Image <span className="text-red-500">*</span>
						</p>
						{!isUpdateImage ? (
							<div className="">
								<img src={oldImage} alt="..." />
								<div className="flex justify-center mt-2">
									<PrimaryButton className=" py-2" onClick={() => setIsUpdateImage(true)}>
										Upload new Image
									</PrimaryButton>
								</div>
							</div>
						) : (
							<div>
								<div
									className={`flex justify-center items-center border-2 border-dashed  w-full h-80 cursor-pointer  ${
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
							</div>
						)}
					</div>
				</div>

				<div className="center py-5 md:py-10">
					<PrimaryButton buttonType={"submit"} className="px-16">
						{isLoading ? <Spinner color="gray" className="mx-auto" /> : "Update"}
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default UpdateProfile;
