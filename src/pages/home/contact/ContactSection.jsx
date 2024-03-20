import speakerImg from "../../../assets/image/speaker.jpg";
import ContactForm from "./ContactForm";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const ContactSection = () => {
	return (
		<div className=" bg-color-custom">
			<div className="flex flex-col md:flex-row p-5 lg:p-10 max-w-[1560px] mx-auto">
				<div className="w-full md:w-1/2">
					<HeaderText className="text-color-headerPrimary">
						Invite Ashikin
						<br /> as a Speaker
					</HeaderText>
					<ContactForm />
				</div>
				<div className="w-full md:w-1/2 hidden md:flex justify-center ">
					<img src={speakerImg} alt="..." className="animation-image" />
				</div>
			</div>
		</div>
	);
};

export default ContactSection;
