import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import { LuUploadCloud } from "react-icons/lu";
import { BsTrashFill } from "react-icons/bs";
import handleFileUpload from "../../../helper/ImageUploader";
import { post } from "../../../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import Cookies from "js-cookie";

const UpdateProfile = () => {
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [oldImage, setOldImage] = useState("");
	const [fileName, setFileName] = useState("No file selected");
	const [isUpdateImage, setIsUpdateImage] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const cookies = Cookies.get("token");

	const { user, fetchData } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			setName(user.name);
			setOldImage(user.avatar);
		}
	}, [user]);

	const handleUploadImage = () => {
		setIsUpdateImage(true);
	};

	const handleupdateProfile = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let imgData = {};
		if (isUpdateImage && avatar) {
			imgData = await handleFileUpload(avatar);
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
			// console.log(response.data);

			showSuccessToast(response.data?.message);
			fetchData();
			navigate("/dashboard");
		} catch (error) {
			showErrorToast(error.message);

			showErrorToast(error?.response?.data.message || "An error occurred");
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
				<div className="w-full md:w-1/2">
					<Input
						size="lg"
						color="blue"
						value={name}
						label="Name"
						className="text-gray-800 dark:text-white"
						style={{ fontSize: "18px", fontWeight: "normal" }}
						onChange={(ev) => setName(ev.target.value)}
					/>
				</div>

				<div className="w-full md:w-1/2">
					<p className="font-bold text-textPrimary dark:text-white py-2">
						Cover Image <span className="text-red-500">*</span>
					</p>
					{!isUpdateImage ? (
						<div className="border-2 border-gray-500 border-dashed py-2">
							<img src={oldImage} alt="..." className="w-80 mx-auto" />
							<div className="flex justify-center mt-2">
								<Button className="py-3 bg-textPrimary" onClick={handleUploadImage}>
									Upload new Image
								</Button>
							</div>
						</div>
					) : (
						<>
							<div
								className={`flex justify-center items-center border-2 border-dashed  mx-auto w-80 h-80 cursor-pointer ${
									avatar ? "border-blue-500" : "border-gray-500"
								}`}
								onClick={() => document.querySelector(".input-field").click()}
							>
								<input
									type="file"
									accept="image/*"
									className="input-field "
									hidden
									onChange={({ target: { files } }) => {
										files[0] && setFileName(files[0].name);
										if (files) {
											setAvatar(files[0]);
										}
									}}
								/>
								{avatar ? (
									<img
										src={URL.createObjectURL(avatar)}
										className="w-full h-full p-5"
										alt={fileName}
									/>
								) : (
									<div className="flex flex-col items-center gap-2">
										<LuUploadCloud className="w-12 h-12" />
										<p>Browse file to upload</p>
									</div>
								)}
							</div>
							<section className="flex justify-end gap-3 items-center bg-gray-300 rounded-md mt-1 p-2">
								{fileName}
								{avatar !== null && (
									<IconButton variant="text" className="rounded-full">
										<BsTrashFill
											onClick={() => {
												setFileName("No file selected");
												setAvatar(null);
											}}
											className="w-5 h-5 text-red-500 cursor-pointer"
										/>
									</IconButton>
								)}
							</section>
							<p className="text-red-500 text-sm py-2">
								Note: If you don&apos;t want to upload a new image, please refresh the page before
								clicking the update button.
							</p>
						</>
					)}
					<div className="mx-auto my-10 w-full md:w-3/6">
						<Button
							type="submit"
							variant="text"
							className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive text-white capitalize text-lg py-2 w-full"
						>
							{isLoading ? <Spinner color="blue" className="mx-auto" /> : "Update"}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateProfile;
