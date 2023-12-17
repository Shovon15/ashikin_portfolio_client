import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import loginIcon from "../../assets/icon/user.png";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthProvider";
import { put } from "../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../components/shared/ToastMessage";

const ResetPassword = () => {
	const { user, fetchData } = useContext(AuthContext);
	const [passwordShown, setPasswordShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { id, token } = useParams();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	});

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleResetPassword = async (data) => {
		const passResetData = {
			password: data.password,
			confirmPassword: data.confirmPassword,
		};
		console.log(passResetData);
		try {
			setIsLoading(true);

			const response = await put(`admin/reset-password/${id}/${token}`, passResetData);

			const userToken = response.data.payload?.token;
			Cookies.set("token", userToken, {
				expires: 30,
			});
			fetchData();
			showSuccessToast(response.data.message);
			navigate("/dashboard");
		} catch (error) {
			showErrorToast(error?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center bg-primary dark:bg-darkPrimary h-screen">
			<Card color="white" className="px-5 py-10">
				<div className="mx-auto flex flex-col items-center gap-3">
					<p className="font-bold text-3xl text-textPrimary text-center">Admin Reset Password</p>
					<img src={loginIcon} alt="..." className="w-20 h-20" />
				</div>

				<form onSubmit={handleSubmit(handleResetPassword)} className="my-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6 text-start">
						<div className="relative">
							<Input
								size="lg"
								label="password"
								color="blue"
								type={passwordShown ? "text" : "password"}
								{...register("password", {
									required: " Required",
								})}
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
								<span onClick={togglePassword} className="cursor-pointer text-xl">
									{passwordShown === true ? <PiEye /> : <PiEyeClosed />}
								</span>
							</div>
							{errors.password && <p className="text-red-500">{errors.password.message}</p>}
						</div>
						<div className="relative">
							<Input
								size="lg"
								label="Confirm password"
								color="blue"
								type={passwordShown ? "text" : "password"}
								{...register("confirmPassword", {
									required: " Required",
								})}
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
								<span onClick={togglePassword} className="cursor-pointer text-xl">
									{passwordShown === true ? <PiEye /> : <PiEyeClosed />}
								</span>
							</div>
							{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
						</div>
					</div>

					<Button
						type="submit"
						className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-700 "
						disabled={isLoading}
						fullWidth
					>
						{isLoading ? <Spinner color="gray" className="mx-auto h-5 w-5" /> : "update"}
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default ResetPassword;
