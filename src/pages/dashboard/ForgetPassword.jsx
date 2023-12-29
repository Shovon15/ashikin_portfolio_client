import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { Card, Input, Spinner } from "@material-tailwind/react";
import loginIcon from "../../assets/icon/user.png";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../helper/ToastMessage";
import PrimaryButton from "../../components/Button/PrimaryButton";
import GoBackButton from "../../components/Button/GoBackButton";

const ForgetPassword = () => {
	const { user } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [isTextShow, setIsTextShow] = useState(false);

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

	const handleForgetPasswor = async (data) => {
		const loginData = {
			reqEmail: data.email,
		};
		// console.log(loginData);

		try {
			setIsLoading(true);
			const response = await post("admin/forget-password", loginData);
			setIsTextShow(true);
			showSuccessToast(response.data.message);
		} catch (error) {
			// console.log(error);
			showErrorToast(error?.response?.data.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex justify-center items-center bg-primary dark:bg-darkPrimary min-h-screen relative">
			<div className="absolute top-5 left-3">
				<GoBackButton />
			</div>
			<Card className="px-5 py-10 bg-color-secondary">
				<div className="mx-auto flex flex-col items-center gap-3">
					<p className="font-bold text-3xl text-color-header text-center">Admin Forget Password</p>
					<img src={loginIcon} alt="..." className="w-20 h-20" />
				</div>

				<form onSubmit={handleSubmit(handleForgetPasswor)} className="my-8 mb-2 w-80 max-w-screen-lg ">
					<div className="mb-4 flex flex-col gap-2 text-start">
						<p className="text-color-text text-center">
							Please enter the email address associated with your account. We will send you a link to
							reset your password.
						</p>
						<Input
							size="lg"
							label="email"
							color="yellow"
							type="text"
							{...register("email", {
								required: "Email is Required *",
							})}
							className="text-color-text"
						/>
						{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					</div>

					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-10 w-full">
						{isLoading ? <Spinner color="gray" className="mx-auto my-0.5 h-5 w-5" /> : "submit"}
					</PrimaryButton>
					{isTextShow && (
						<p className="text-red-500 text-center my-2">
							Please go to your email and click the link for Password reset.
						</p>
					)}
				</form>
			</Card>
		</div>
	);
};

export default ForgetPassword;
