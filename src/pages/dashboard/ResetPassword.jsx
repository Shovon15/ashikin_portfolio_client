import { Card, Input, Spinner } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import loginIcon from "../../assets/icon/user.png";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthProvider";
import { get, put } from "../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../helper/ToastMessage";
import PrimaryButton from "../../components/Button/PrimaryButton";

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
		const fetchData = async () => {
			const response = await get("admin");
			const hasUsers = response.data.payload.data;
			if (hasUsers.length > 0 && user) {
				navigate("/dashboard");
			} else if (hasUsers.length === 0) {
				navigate("/signup");
			}
		};
		fetchData();
	});

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleResetPassword = async (data) => {
		const passResetData = {
			password: data.password,
			confirmPassword: data.confirmPassword,
		};
		// console.log(passResetData);
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
		<div className="flex justify-center items-center bg-primary dark:bg-darkPrimary min-h-screen">
			<Card className="px-5 py-10 bg-color-secondary">
				<div className="mx-auto flex flex-col items-center gap-3">
					<p className="font-bold text-3xl text-color-header text-center">Admin Reset Password</p>
					<img src={loginIcon} alt="..." className="w-20 h-20" />
				</div>

				<form onSubmit={handleSubmit(handleResetPassword)} className="my-8 mb-2 w-80 max-w-screen-lg ">
					<div className="mb-4 flex flex-col gap-6 text-start">
						<div className="relative">
							<Input
								size="lg"
								label="password"
								color="yellow"
								type={passwordShown ? "text" : "password"}
								{...register("password", {
									required: " Required",
								})}
								className="text-color-text"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
								<span onClick={togglePassword} className="cursor-pointer text-xl">
									{passwordShown === true ? (
										<PiEye className="text-color-text" />
									) : (
										<PiEyeClosed className="text-color-text" />
									)}
								</span>
							</div>
							{errors.password && <p className="text-red-500">{errors.password.message}</p>}
						</div>
						<div className="relative">
							<Input
								size="lg"
								label="Confirm password"
								color="yellow"
								type={passwordShown ? "text" : "password"}
								{...register("confirmPassword", {
									required: " Required",
								})}
								className="text-color-text"
							/>
							<div className="absolute inset-y-0 right-0 pr-3 flex items-center h-12">
								<span onClick={togglePassword} className="cursor-pointer text-xl">
									{passwordShown === true ? (
										<PiEye className="text-color-text" />
									) : (
										<PiEyeClosed className="text-color-text" />
									)}
								</span>
							</div>
							{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
						</div>
					</div>

					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-10 w-full">
						{isLoading ? <Spinner color="gray" className="mx-auto my-0.5 h-5 w-5" /> : "submit"}
					</PrimaryButton>
				</form>
			</Card>
		</div>
	);
};

export default ResetPassword;
