import speakerImg from "../../../assets/image/speaker.jpg";
import ContactForm from "./ContactForm";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useEffect } from "react";
import Aos from "aos";

const ContactSection = () => {
	// useEffect(() => {
	// 	Aos.init({ duration: 1000 });
	// }, []);
	return (
		<div className="flex flex-col md:flex-row p-5 lg:p-10">
			<div className="w-full md:w-1/2">
				<HeaderText>
					Invite Ashikin alam
					<br /> as a Speaker
				</HeaderText>
				<ContactForm />
			</div>
			<div className="w-full md:w-1/2 hidden md:flex justify-center ">
				<img
					// data-aos="flip-down"
					src={speakerImg}
					alt="..."
				/>
			</div>
		</div>
	);
};

export default ContactSection;
