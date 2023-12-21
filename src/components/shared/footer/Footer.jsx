import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/Logo-New.png";

const Footer = () => {
	return (
		<footer className="w-full bg-gradient-to-r from-blue-gray-800 to-blue-gray-300 p-8">
			<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-inherit text-center md:justify-between">
				<img src={logo} alt="logo" className="w-44" />
				<ul className="flex flex-wrap items-center gap-y-2 gap-x-8 cursor-pointer">
					<li>
						<Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-blue-gray-100">
							About Us
						</Typography>
					</li>
					<li>
						<Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-blue-gray-100">
							License
						</Typography>
					</li>
					<li>
						<Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-blue-gray-100">
							Contribute
						</Typography>
					</li>
					<li>
						<Typography className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-blue-gray-100">
							Contact Us
						</Typography>
					</li>
					<Link to="/login">
						<li>
							<Typography className="font-normal transition-colors hover:text-blue-500 text-blue-gray-100 focus:text-blue-500">
								Admin
							</Typography>
						</li>
					</Link>
				</ul>
			</div>
			<hr className="my-8 border-blue-gray-50" />
			<Typography color="blue-gray" className="text-center font-normal">
				&copy; Copyright
			</Typography>
		</footer>
	);
};

export default Footer;
