/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Spinner } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../../context/DataContext";
import { useParams } from "react-router-dom";

import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import { post } from "../../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PageHelmet from "../../../helper/PageHelmet";

const EventRegister = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [eventData, setEventData] = useState({});

	const { slug } = useParams();
	const { fetchEventBySlug } = useContext(DataContext);

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true);
			const event = await fetchEventBySlug(slug);
			setEventData(event);
			setIsLoading(false);
		};
		fetchEvent();
	}, []);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	// useEffect(() => {
	// 	Aos.init({ duration: 1000 });
	// }, []);

	const { title, dateTime, eventType } = eventData;
	const dateAndTime = new Date(dateTime);
	// -------------date-----------------------
	const formattedDate = dateAndTime.toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	// ------------------time--------------
	const formattedTime = dateAndTime.toLocaleTimeString("en-US", {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
	});

	const handleAddItems = async (data) => {
		const registerData = {
			firstName: data.firstName,
			lastName: data.lastName,
			whatsapp: data.whatsapp,
			phone: data.phone,
			email: data.email,
			instituteName: data.instituteName,
			accountNumber: data.accountNumber,
			// eventId: id,
			eventSlug: slug,
			eventTitle: title,
		};
		// console.log(registerData, "items");

		try {
			setButtonLoading(true);
			const response = await post("events/register-event", registerData);
			reset();
			showSuccessToast(response.data.message);
		} catch (error) {
			// console.log(error);
			showErrorToast(error.response.data.message);
		} finally {
			setButtonLoading(false);
		}
	};

	if (isLoading) {
		<LoadingSpinner />;
	}

	const Skeleton = () => {
		return (
			<div
				role="status"
				className="max-w-sm p-4 border border-gray-700 rounded shadow animate-pulse md:p-6 dar h-44"
			>
				<div className="h-2.5 bg-gray-700 rounded-full w-48 mb-4"></div>
				<div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
				<div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
				<div className="h-2 bg-gray-700 rounded-full"></div>
				<div className="flex items-center mt-4">
					<div>
						<div className="h-2.5 bg-gray-700 rounded-full w-32 mb-2"></div>
						<div className="w-48 h-2 bg-gray-700 rounded-full"></div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<>
			<PageHelmet title={title} description={title} link={shareUrl} type="webapp" />
			<div className="w-full  page-container flex flex-col lg:flex-row-reverse mx-auto justify-start p-5 ">
				<div className="pb-5 lg:hidden">
					<GoBackButton />
				</div>
				{isLoading ? (
					<Skeleton />
				) : (
					<>
						<div className="w-full lg:w-3/12 h-max  border border-gray-500 flex flex-col items-center p-2 py-5 ">
							<p className="text-2xl font-semibold text-center text-color-header">{title}</p>
							<p className="text-color-primary capitalize pt-3">{eventType} program</p>
							<p className="text-color-primary">
								{formattedDate}
								<span className="text-gray-500"> | </span>
								{formattedTime}
							</p>
						</div>
					</>
				)}
				<form onSubmit={handleSubmit(handleAddItems)} className="w-full lg:w-[50rem]  lg:p-5">
					<div className="hidden lg:block">
						<GoBackButton />
					</div>
					<HeaderText className="py-5 ">Program Register</HeaderText>
					<div className="flex flex-col lg:flex-row gap-5">
						<div className="flex flex-col gap-1 w-full">
							<Input
								variant="standard"
								color="blue"
								label="First Name"
								{...register("firstName", {
									required: "Required *",
								})}
								error={!!errors.firstName}
								className="text-color-primary"
							/>
							{errors.firstName && <p className="text-red-500 text-sm ">{errors.firstName.message}</p>}
						</div>
						<div className="flex flex-col gap-1 w-full">
							<Input
								variant="standard"
								color="blue"
								label="Last Name"
								{...register("lastName", {
									required: "Required *",
								})}
								error={!!errors.lastName}
								className="text-color-primary"
							/>
							{errors.lastName && <p className="text-red-500 text-sm ">{errors.lastName.message}</p>}
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-5 pt-5">
						<div className="flex flex-col gap-1 w-full">
							<Input
								variant="standard"
								color="blue"
								label="Whatsapp Number"
								{...register("whatsapp", {
									required: "Required *",
								})}
								error={!!errors.whatsapp}
								className="text-color-primary"
							/>
							{errors.whatsapp && <p className="text-red-500 text-sm ">{errors.whatsapp.message}</p>}
						</div>
						<div className="flex flex-col gap-1 w-full">
							<Input
								variant="standard"
								color="blue"
								label="Phone Number"
								{...register("phone", {
									required: "Required *",
								})}
								error={!!errors.phone}
								className="text-color-primary"
							/>
							{errors.phone && <p className="text-red-500 text-sm ">{errors.phone.message}</p>}
						</div>
					</div>
					<div className="flex flex-col gap-5 py-5">
						<div className="flex flex-col gap-1 w-full">
							<Input
								color="blue"
								variant="standard"
								label="Email"
								{...register("email", {
									required: "Required *",
								})}
								error={!!errors.email}
								className="text-color-primary"
							/>
							{errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
						</div>
						<div className="flex flex-col gap-1 w-full">
							<Input
								color="blue"
								variant="standard"
								label="Institute name with designation"
								{...register("instituteName", {
									required: "Required *",
								})}
								error={!!errors.instituteName}
								className="text-color-primary"
							/>
							{errors.instituteName && (
								<p className="text-red-500 text-sm ">{errors.instituteName.message}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 w-full">
							<Input
								color="blue"
								variant="standard"
								label="Sender Account Number"
								{...register("accountNumber", {
									required: "Required *",
								})}
								error={!!errors.accountNumber}
								className="text-color-primary"
							/>
							{errors.accountNumber && (
								<p className="text-red-500 text-sm ">{errors.accountNumber.message}</p>
							)}
						</div>
					</div>
					<div className="flex justify-center pb-10">
						<PrimaryButton buttonType={"submit"} className="px-12" disabled={buttonLoading}>
							{buttonLoading ? <Spinner color="blue" className="mx-auto" /> : "Submit"}
						</PrimaryButton>
					</div>
				</form>
			</div>
		</>
	);
};

export default EventRegister;
