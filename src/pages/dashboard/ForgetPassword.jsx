import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import loginIcon from "../../assets/icon/user.png";

import { post } from "../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../helper/ToastMessage";

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
		if (user) {
			navigate("/dashboard");
		}
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
		<div className="flex justify-center items-center bg-primary dark:bg-darkPrimary h-screen">
			<Card color="white" className="px-5 py-10">
				<div className="mx-auto flex flex-col items-center gap-3">
					<p className="font-bold text-3xl text-textPrimary text-center">Admin Forget Password</p>
					<img src={loginIcon} alt="..." className="w-20 h-20" />
				</div>

				<form onSubmit={handleSubmit(handleForgetPasswor)} className="my-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-2 text-start">
						<p className="text-textPrimary text-center">
							Please enter the email address associated with your account. We will send you a link to
							reset your password.
						</p>
						<Input
							size="lg"
							label="email"
							color="blue"
							type="text"
							{...register("email", {
								required: "Email is Required",
							})}
						/>
						{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					</div>

					<Button
						type="submit"
						className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-700 "
						disabled={isLoading}
						fullWidth
					>
						{!isLoading ? "send" : <Spinner color="gray" className="mx-auto h-5 w-5" />}
					</Button>
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
