import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import logo from "../../../assets/logo/Logo-New.png";

const Footer = () => {
	const Data = [
		{
			name: "About",
			link: "/about",
		},
		{
			name: "License",
			link: "/",
		},
		{
			name: "Contact",
			link: "/",
		},
		{
			name: "Admin",
			link: "/dashboard",
		},
	];

	const currentYear = new Date().getFullYear();
	return (
		<footer className="w-full bg-color-secondary p-8">
			<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-inherit text-center md:justify-between">
				<Typography variant="h4" className="text-color-header">
					ASHIKIN ALAM
				</Typography>
				{/* <img src={logo} alt="logo" className="w-44" /> */}
				<div className="flex gap-6">
					{Data.map(({ name, link }) => (
						<Link to={link} key={name}>
							<Typography className="font-normal text-color-text hover:text-color-header">
								{name}
							</Typography>
						</Link>
					))}
				</div>
			</div>
			<hr className="my-8 border-color-border" />
			<Typography className="text-center font-normal text-color-text">
				{currentYear} &copy; Copyright Ashikin alam
			</Typography>
		</footer>
	);
};

export default Footer;
