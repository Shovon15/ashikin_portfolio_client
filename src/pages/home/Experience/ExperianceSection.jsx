import Aos from "aos";
import { useEffect } from "react";
import whatsappOriginal from "../../../assets/icon/whatsapp-original.png";
import facebookOriginal from "../../../assets/icon/facebook-original.png";
import youtubeOriginal from "../../../assets/icon/youtube.png";
import { Typography } from "@material-tailwind/react";

const ExperianceSection = () => {
	// useEffect(() => {
	// 	Aos.init({ duration: 1000 });
	// }, []);

	const Data = [
		{
			icon: facebookOriginal,
			title: "Facebook",
			desc: "25.2k followers",
			link: "https://www.facebook.com",
		},
		{
			icon: youtubeOriginal,
			title: "Youtube",
			desc: "30.9k followers",
			link: "https://www.youtube.com",
		},

		{
			icon: whatsappOriginal,
			title: "Whatsapp",
			desc: "01700000000",
			link: "https://www.whatsapp.com",
		},
	];

	return (
		<div className=" relative p-0 md:p-10 bg-color-secondary">
			<div
				// data-aos="zoom-in"
				// data-aos-anchor-placement="top-bottom"
				className="absolute -mt-5 md:-mt-24 mx-[2rem] md:mx-[3rem] lg:mx-[10rem] shadow-xl bg-color-secondary rounded-xl "
			>
				<Typography
					variant="paragraph"
					className="text-color-text text-center p-5 md:py-10 md:px-[3rem] lg:px-[10rem] font-semibold"
				>
					Celebrated Leadership Icon and Trusted Advisor to Fortune 100 Companies, Sport Legends, Elite
					Performers and Titans of Industryo
				</Typography>
			</div>
			<div className="pt-[9rem] md:pt-[6rem]  py-10 flex flex-wrap gap-5 justify-center items-center md:justify-evenly">
				{Data.map(({ icon, title, desc, link }) => (
					<a
						key={title}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						// data-aos="zoom-in"
					>
						<div className="flex gap-3 bg-color-primary shadow-xl rounded-xl w-72 p-3 animation-body">
							<img src={icon} alt="icon" className="w-12 h-12" />
							<div>
								<Typography variant="h5" className="font-bold text-color-header">
									{title}
								</Typography>
								<Typography variant="paragraph" className="text-color-text">
									{desc}
								</Typography>
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default ExperianceSection;
