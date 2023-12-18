import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Aos from "aos";
import { useEffect, useState } from "react";
import { post } from "../../../utils/fetchApi";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm();

	const handleInvitation = async (data) => {
		const invitationData = {
			name: data.name,
			phone: data.phone,
			organizationName: data.organization,
			location: data.location,
			audienceNumber: data.audienceNumber,
			eventText: data.eventText,
		};
		// console.log(invitationData, "invitationData");

		try {
			setIsLoading(true);
			const response = await post("invitation/write-invitation", invitationData);
			reset();
			showSuccessToast(response.data?.message);
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	return (
		<div className="p-5 md:p-10">
			<form onSubmit={handleSubmit(handleInvitation)}>
				<div className="flex flex-col lg:flex-row gap-5">
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							type="text"
							variant="standard"
							color="blue"
							label="Name"
							{...register("name", {
								required: "Required *",
							})}
							error={!!errors.name}
						/>
						{errors.name && <p className="text-red-500 text-sm ">{errors.name.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							type="text"
							variant="standard"
							color="blue"
							label="Phone"
							{...register("phone", {
								required: "Required *",
							})}
							error={!!errors.phone}
						/>
						{errors.phone && <p className="text-red-500 text-sm ">{errors.phone.message}</p>}
					</div>
				</div>
				<div data-aos="fade-up" className="flex flex-col gap-5 py-5">
					<div className="flex flex-col gap-1 w-full">
						<Input
							type="text"
							color="blue"
							variant="standard"
							label="Organization name"
							{...register("organization", {
								required: "Required *",
							})}
							error={!!errors.organization}
						/>
						{errors.organization && <p className="text-red-500 text-sm ">{errors.organization.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							type="text"
							color="blue"
							variant="standard"
							label="Location of the Event"
							{...register("location", {
								required: "Required *",
							})}
							error={!!errors.location}
						/>
						{errors.location && <p className="text-red-500 text-sm ">{errors.location.message}</p>}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Input
							type="text"
							color="blue"
							variant="standard"
							label="Number of Audience"
							{...register("audienceNumber", {
								required: "Required *",
							})}
							error={!!errors.audienceNumber}
						/>
						{errors.audienceNumber && (
							<p className="text-red-500 text-sm ">{errors.audienceNumber.message}</p>
						)}
					</div>
					<div data-aos="fade-up" className="flex flex-col gap-1 w-full">
						<Textarea
							type="text"
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
				<div className="flex justify-center mt-5">
					<Button
						type="submit"
						data-aos="fade-up"
						className=" bg-gradient-to-r from-cyan-500 to-blue-700  py-3 capitalize text-md shadow-xl focus:shadow-xl active:shadow-2xl px-14"
						disabled={isLoading}
					>
						{isLoading ? <Spinner color="gray" className="mx-auto h-5 w-5" /> : "send"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
