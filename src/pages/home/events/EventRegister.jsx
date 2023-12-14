import { Button, Input, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../../context/DataContext";
import { useParams } from "react-router-dom";

const EventRegister = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { fetchEventById, receiveEventById } = useContext(DataContext);
	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true);
			await fetchEventById(id);
			setIsLoading(false);
		};
		fetchEvent();
	}, []);
	const { title, dateTime, eventType } = receiveEventById;
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
			{!isLoading && (
				<>
					<div className="w-full lg:w-3/12 h-max  border border-gray-500 flex flex-col items-center p-2 py-5 dark:text-gray-400">
						<p className="text-xl font-semibold text-center">{title}</p>
						<p className="">{eventType} event</p>
						<p className="">
							{formattedDate}
							<span>|</span>
							{formattedTime}
						</p>
					</div>
				</>
			)}
			<form onSubmit={handleSubmit(handleAddItems)} className="w-full lg:w-9/12 lg:p-5">
				<Typography variant="h2" className="text-center py-5 dark:text-gray-400">
					EventRegister
				</Typography>
				<div className="flex flex-col lg:flex-row gap-5">
					<div className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="First Name"
							{...register("firstName", {
								required: "First Name is Required *",
							})}
							error={!!errors.firstName}
						/>
						{errors.firstName && <p className="text-red-500 text-sm ">{errors.firstName.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Last Name"
							{...register("lastName", {
								required: "Last name is Required *",
							})}
							error={!!errors.lastName}
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
								required: "Whatsapp Number is Required *",
							})}
							error={!!errors.whatsapp}
						/>
						{errors.whatsapp && <p className="text-red-500 text-sm ">{errors.whatsapp.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Phone Number"
							{...register("phone", {
								required: "Phone Number is Required *",
							})}
							error={!!errors.phone}
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
								required: "Email is Required *",
							})}
							error={!!errors.email}
						/>
						{errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Institute name with designation"
							{...register("instituteName", {
								required: "institution name is Required *",
							})}
							error={!!errors.instituteName}
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
								required: "Sender Account Number is Required *",
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
						variant="text"
						className="capitalize text-xl bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive text-white py-2 w-full"
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EventRegister;
