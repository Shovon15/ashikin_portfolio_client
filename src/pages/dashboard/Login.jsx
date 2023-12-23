import { Card, Input, Spinner } from "@material-tailwind/react";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import loginIcon from "../../assets/icon/user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../../context/AuthProvider";
import { post } from "../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../helper/ToastMessage";
import PrimaryButton from "../../components/Button/PrimaryButton";

const Login = () => {
	const { user, fetchData } = useContext(AuthContext);
	const [passwordShown, setPasswordShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/dashboard";

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	});

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleLogin = async (data) => {
		const loginData = {
			email: data.email,
			password: data.password,
		};

		try {
			setIsLoading(true);

			const response = await post("admin/login", loginData);
			const userToken = response.data.payload?.token;
			Cookies.set("token", userToken, {
				expires: 30,
			});
			fetchData();

			showSuccessToast(response.data.message);
			setIsLoading(false);
			navigate(from, { replace: true });
		} catch (error) {
			// console.log(error);
			showErrorToast(error?.response?.data.message);
			setIsLoading(false);
		}
	};
	return (
		<div className="flex justify-center items-center bg-color-primary dark:bg-darkPrimary min-h-screen">
			<Card className="px-5 py-10 bg-color-secondary">
				<div className="mx-auto flex flex-col items-center gap-3">
					<p className="font-bold text-3xl text-color-header text-center">Admin Login</p>
					<img src={loginIcon} alt="..." className="w-20 h-20" />
				</div>

				<form onSubmit={handleSubmit(handleLogin)} className="my-8 mb-2 w-80 max-w-screen-lg">
					<div className="mb-4 flex flex-col gap-6 text-start">
						<div>
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
						<div className="relative">
							<Input
								size="lg"
								label="password"
								color="yellow"
								type={passwordShown ? "text" : "password"}
								{...register("password", {
									required: "password is Required *",
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
					</div>

					<PrimaryButton buttonType={"submit"} disabled={isLoading} className="px-10 w-full">
						{isLoading ? <Spinner color="gray" className="mx-auto my-0.5 h-5 w-5" /> : "submit"}
					</PrimaryButton>

					<div className="py-5">
						<Link to="/forget-password">
							<p className="text-color-text hover:text-color-header">Forget Password?</p>
						</Link>
					</div>
					<div>
						<Link to="/">
							<PrimaryButton className="w-full">Home</PrimaryButton>
						</Link>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Login;
