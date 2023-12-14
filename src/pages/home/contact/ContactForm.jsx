import { Button, Input, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
	const {
		register,

		formState: { errors },
		handleSubmit,
	} = useForm();
	const handleAddItems = (data) => {
		const items = {
			name: data.name,
			phone: data.phone,
			organizationName: data.organization,
			location: data.location,
			audienceNumber: data.audienceNumber,
			eventText: data.eventText,
		};
		console.log(items, "items");
	};
	return (
		<div className="p-5 md:p-10">
			<form onSubmit={handleSubmit(handleAddItems)}>
				<div className="flex flex-col lg:flex-row gap-5">
					<div className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Name"
							{...register("name", {
								required: "Name is Required *",
							})}
							error={!!errors.name}
						/>
						{errors.name && <p className="text-red-500 text-sm ">{errors.name.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							variant="standard"
							color="blue"
							label="Phone"
							{...register("phone", {
								required: "Phone is Required *",
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
							label="Organization name"
							{...register("organization", {
								required: "Organization name is Required *",
							})}
							error={!!errors.organization}
						/>
						{errors.organization && <p className="text-red-500 text-sm ">{errors.organization.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Location of the Event"
							{...register("location", {
								required: "Location of the Event is Required *",
							})}
							error={!!errors.location}
						/>
						{errors.location && <p className="text-red-500 text-sm ">{errors.location.message}</p>}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Input
							color="blue"
							variant="standard"
							label="Number of Audience"
							{...register("audienceNumber", {
								required: "Number of Audience is Required *",
							})}
							error={!!errors.audienceNumber}
						/>
						{errors.audienceNumber && (
							<p className="text-red-500 text-sm ">{errors.audienceNumber.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-1 w-full">
						<Textarea
							color="blue"
							variant="standard"
							label="About the Event"
							{...register("eventText", {
								required: "Please write something about the Event *",
							})}
							error={!!errors.eventText}
						/>
						{errors.eventText && <p className="text-red-500 text-sm">{errors.eventText.message}</p>}
					</div>
				</div>
				<div className="flex justify-center">
					<Button
						type="submit"
						variant="text"
						className="capitalize text-xl bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive py-2 text-white"
					>
						Send
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
