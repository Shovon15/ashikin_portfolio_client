import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import { FooterLinks } from "../../../config/docs";
// import logo from "../../../assets/logo/Logo-New.png";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="w-full bg-[#4C3D3D] p-8">
			<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-inherit text-center md:justify-between">
				<div className="h-28">
					<Logo />
				</div>
				<div className="flex gap-6">
					{FooterLinks.map(({ name, link }) => (
						<Link to={link} key={name}>
							<p className="font-semibold text-xl text-color-primary hover:text-color-header">
								{name}
							</p>
						</Link>
					))}
				</div>
			</div>
			<hr className="my-8 border-color-border" />
			<Typography className="text-center font-normal text-color-primary">
				{currentYear} &copy; Copyright Ashikin alam
			</Typography>
		</footer>
	);
};

export default Footer;
