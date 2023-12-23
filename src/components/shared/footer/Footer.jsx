import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import logo from "../../../assets/logo/Logo-New.png";

const Footer = () => {
	const Data = [
		{
			name: "About",
			link: "/",
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
				<ul className="flex flex-wrap items-center gap-y-2 gap-x-8 cursor-pointer">
					{Data.map(({ name, link }) => (
						<li key={name}>
							<Link to={link}>
								<Typography className="font-normal text-color-text hover:text-color-header">
									{name}
								</Typography>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<hr className="my-8 border-blue-gray-50" />
			<Typography className="text-center font-normal text-color-text">
				{currentYear} &copy; Copyright Ashikin alam
			</Typography>
		</footer>
	);
};

export default Footer;
