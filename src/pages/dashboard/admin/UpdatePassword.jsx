import { Button, Input, Spinner } from "@material-tailwind/react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useContext, useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { post } from "../../../utils/fetchApi";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const UpdatePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState("");

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

	const { cookies } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleEventForm = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (newPassword !== confirmNewPassword) {
			setIsLoading(false);
			showErrorToast("New Password Did Not Match");
			return;
		}
		const formData = {
			oldPassword,
			newPassword,
			confirmNewPassword,
		};

		if (Object.values(formData).some((field) => !field)) {
			// Handle the case where data is missing
			setIsLoading(false);
			showErrorToast("Please Fill in All Fields");
			return;
		}

		try {
			const response = await post(`admin/update-password/${cookies.token}`, formData);
			showSuccessToast(response.data?.message);
			navigate("/dashboard");
		} catch (error) {
			showErrorToast(error?.response?.data.message || "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const handleToggleOldPassword = () => setShowOldPassword(!showOldPassword);
	const handleToggleNewPassword = () => setShowNewPassword(!showNewPassword);
	const handleToggleConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);

	return (
		<div>
			<GoBackButton />
			<HeaderText className="py-5">Password Update</HeaderText>
			<form onSubmit={handleEventForm} className="mx-5 md:mx-10">
				<div className="w-full md:w-1/2 lg:max-w-[20rem] mx-auto flex flex-col  gap-5">
					<div className="relative">
						<Input
							type={showOldPassword ? "text" : "password"}
							size="lg"
							color="blue"
							value={oldPassword}
							label="Old Password"
							className="text-gray-800 dark:text-white  "
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setOldPassword(ev.target.value)}
						/>
						<div className="cursor-pointer absolute top-3 right-4 z-30" onClick={handleToggleOldPassword}>
							{showOldPassword ? <PiEyeClosed /> : <PiEye />}
						</div>
					</div>
					<div className="relative">
						<Input
							type={showNewPassword ? "text" : "password"}
							size="lg"
							color="blue"
							value={newPassword}
							label="New Password"
							className="text-gray-800 dark:text-white"
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setNewPassword(ev.target.value)}
						/>
						<div className="cursor-pointer absolute top-3 right-4 z-30" onClick={handleToggleNewPassword}>
							{showNewPassword ? <PiEyeClosed /> : <PiEye />}
						</div>
					</div>
					<div className="relative">
						<Input
							type={showConfirmNewPassword ? "text" : "password"}
							size="lg"
							color="blue"
							value={confirmNewPassword}
							label="Confirm New Password"
							className="text-gray-800 dark:text-white"
							style={{ fontSize: "18px", fontWeight: "normal" }}
							onChange={(ev) => setConfirmNewPassword(ev.target.value)}
						/>
						<div
							className="cursor-pointer absolute top-3 right-4 z-30"
							onClick={handleToggleConfirmNewPassword}
						>
							{showConfirmNewPassword ? <PiEyeClosed /> : <PiEye />}
						</div>
					</div>
					<Button
						type="submit"
						variant="text"
						className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive text-white capitalize text-lg py-2 w-full"
						disabled={isLoading}
					>
						{isLoading ? <Spinner color="blue" className="mx-auto" /> : "Update"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default UpdatePassword;
