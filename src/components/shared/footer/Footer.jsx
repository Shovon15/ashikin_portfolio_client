import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import SocialLogos from "./socialLogos";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";


const Footer = () => {

	const { eventData, serviceData } = useContext(DataContext);
	console.log(eventData)
	const currentYear = new Date().getFullYear();

	const capitalizeEachWord = (str) => {
		if (!str) return str;
		return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
	};

	return (
		<footer className="w-full bg-[#4C3D3D] p-8">
			<div className="flex w-full flex-wrap items-center justify-between gap-y-6 gap-x-12 bg-inherit text-center md:justify-between">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
					<div className="flex flex-col items-center">
						<div className="h-32">
							<Logo />
						</div>
						<SocialLogos />
					</div>

					<div>
						<Link to="/services">
							<p className="font-semibold text-xl text-color-secondary hover:text-color-header py-3">
								Our Services
							</p>
						</Link>
						{serviceData && serviceData.map(({ title }, i) => (
							<p key={i} className="text-start text-white text-opacity-80 text-lg p-2">{title}</p>

						))}
					</div>
					<div>
						<Link to="/programs">
							<p className="font-semibold text-xl text-color-secondary hover:text-color-header py-3">
								Our Programs
							</p>
						</Link>
						{eventData && eventData.map(({ title }, i) => (
							<p key={i} className="text-start text-white text-opacity-80 text-lg p-2"> {capitalizeEachWord(title)}</p>

						))}
					</div>
					<div className="h-full w-full flex items-center justify-center ">
						<Link to="/contact">
							<p className="font-semibold text-xl text-color-secondary hover:text-color-header py-3 ">
								Contact Us
							</p>
						</Link>
					</div>
					{/* {FooterLinks.map(({ name, link }) => (
						<div key={name}>
							<Link to={link}>
								<p className="font-semibold text-xl text-color-secondary hover:text-color-header py-3">
									{name}
								</p>
							</Link>
							<p>Lorem ipsum dolor sit.</p>
							<p>Lorem ipsum dolor sit.</p>
							<p>Lorem ipsum dolor sit.</p>
							<p>Lorem ipsum dolor sit.</p>
							<p>Lorem ipsum dolor sit.</p>
						</div>
					))} */}
				</div>
			</div>
			<hr className="my-8 border-color-border" />
			<Typography className="text-center font-normal text-color-primary">
				{currentYear} &copy; Copyright Ashikin Alam. All Rights Reserved.
			</Typography>
		</footer>
	);
};

export default Footer;
