import { Typography } from "@material-tailwind/react";
import speakerImg from "../../../assets/image/speaker.jpg";
import ContactForm from "./ContactForm";
const ContactSection = () => {
	return (
		<div className="flex flex-col md:flex-row ">
			<div className="w-full md:w-1/2">
				<Typography
					variant="h2"
					color="blue-gray"
					className="text-center font-bold mb-3 dark:text-darkTextPrimary"
				>
					Invite Ashikin alam
					<br /> as a Speaker
				</Typography>
				<ContactForm />
			</div>
			<div className="w-full md:w-1/2 hidden md:flex justify-center ">
				<img src={speakerImg} alt="..." />
			</div>
		</div>
	);
};

export default ContactSection;
