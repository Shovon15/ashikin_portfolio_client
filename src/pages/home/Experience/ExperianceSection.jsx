import Aos from "aos";
import { useEffect } from "react";
import icon from "../../../assets/icon/clock (1).png";

const ExperianceSection = () => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	return (
		<div
			data-aos="zoom-in-down"
			className="h-[45rem] md:h-80 bg-gradient-to-r from-blue-300 to-blue-800 p-5 md:px-[5rem] flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 py-10 my-5 md:my-10 "
		>
			<div data-aos="fade-up" className="flex flex-col text-center">
				<img data-aos="fade-up" src={icon} alt="..." className="w-16 h-16 mx-auto" />
				<p data-aos="zoom-in" className=" text-2xl md:text-4xl text-white font-bold py-4">
					Lorem ipsum dolor
				</p>
				<p data-aos="fade-up" className="text-3xl text-white font-semibold">
					5 years +
				</p>
			</div>
			<div data-aos="fade-up" className="flex flex-col text-center">
				<img data-aos="fade-up" src={icon} alt="..." className="w-16 h-16 mx-auto" />
				<p data-aos="zoom-in" className="text-4xl text-white font-bold py-4">
					Lorem ipsum
				</p>
				<p data-aos="fade-up" className="text-3xl text-white font-semibold">
					More than 5
				</p>
			</div>
			<div data-aos="fade-up" className="flex flex-col text-center">
				<img data-aos="fade-up" src={icon} alt="..." className="w-16 h-16 mx-auto" />
				<p data-aos="zoom-in" className="text-4xl text-white font-bold py-4">
					Lorem ipsum
				</p>
				<p data-aos="fade-up" className="text-3xl text-white font-semibold">
					10 years +
				</p>
			</div>
		</div>
	);
};

export default ExperianceSection;
