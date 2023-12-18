import { Button, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../../context/DataContext";
import { useParams } from "react-router-dom";
import Aos from "aos";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";

const EventRegister = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { fetchEventById } = useContext(DataContext);
	const { id } = useParams();

	const [eventData, setEventData] = useState({});
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true);
			const event = await fetchEventById(id);
			setEventData(event);
			setIsLoading(false);
		};
		fetchEvent();
	}, []);

	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

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

	const handleAddItems = (data) => {
		const items = {
			firstName: data.firstName,
			lastName: data.lastName,
			whatsapp: data.whatsapp,
			phone: data.phone,
			email: data.email,
			instituteName: data.instituteName,
			accountNumber: data.accountNumber,
		};
		console.log(items, "items");
	};
	return (
		<div className="w-full lg:w-[60rem] flex flex-col lg:flex-row-reverse mx-auto justify-start p-5 ">
			<div className="pb-5 lg:hidden">
				<GoBackButton />
			</div>
			{!isLoading && (
				<>
					<div
						data-aos="zoom-in"
						className="w-full lg:w-3/12 h-max  border border-gray-500 flex flex-col items-center p-2 py-5 "
					>
						<p className="text-2xl font-semibold text-center text-textPrimary">{title}</p>
						<p className="">{eventType} event</p>
						<p className="text-textSecondary">
							{formattedDate}
							<span>|</span>
							{formattedTime}
						</p>
					</div>
				</>
			)}
			<form onSubmit={handleSubmit(handleAddItems)} className="w-full lg:w-9/12 lg:p-5">
				<div className="hidden lg:block">
					<GoBackButton />
				</div>
				<HeaderText className="py-5">EventRegister</HeaderText>
				<div className="flex flex-col lg:flex-row gap-5">
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="First Name"
							{...register("firstName", {
								required: "Required *",
							})}
							error={!!errors.firstName}
						/>
						{errors.firstName && <p className="text-red-500 text-sm ">{errors.firstName.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Last Name"
							{...register("lastName", {
								required: "Required *",
							})}
							error={!!errors.lastName}
						/>
						{errors.lastName && <p className="text-red-500 text-sm ">{errors.lastName.message}</p>}
					</div>
				</div>
				<div className="flex flex-col lg:flex-row gap-5 pt-5">
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Whatsapp Number"
							{...register("whatsapp", {
								required: "Required *",
							})}
							error={!!errors.whatsapp}
						/>
						{errors.whatsapp && <p className="text-red-500 text-sm ">{errors.whatsapp.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Phone Number"
							{...register("phone", {
								required: "Required *",
							})}
							error={!!errors.phone}
						/>
						{errors.phone && <p className="text-red-500 text-sm ">{errors.phone.message}</p>}
					</div>
				</div>
				<div className="flex flex-col gap-5 py-5">
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Email"
							{...register("email", {
								required: "Required *",
							})}
							error={!!errors.email}
						/>
						{errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Institute name with designation"
							{...register("instituteName", {
								required: "Required *",
							})}
							error={!!errors.instituteName}
						/>
						{errors.instituteName && (
							<p className="text-red-500 text-sm ">{errors.instituteName.message}</p>
						)}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Sender Account Number"
							{...register("accountNumber", {
								required: "Required *",
							})}
							error={!!errors.accountNumber}
						/>
						{errors.accountNumber && (
							<p className="text-red-500 text-sm ">{errors.accountNumber.message}</p>
						)}
					</div>
				</div>
				<div className="flex justify-center pb-10">
					<Button
						type="submit"
						data-aos="fade-up"
						className="bg-gradient-to-r from-cyan-500 to-blue-700  py-3 capitalize text-md shadow-xl focus:shadow-xl active:shadow-2xl px-12"
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EventRegister;
