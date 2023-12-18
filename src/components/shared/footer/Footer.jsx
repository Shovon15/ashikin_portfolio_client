import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full bg-white p-8">
			<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
				<p className="font-bold text-xl">Ashikin Alam</p>
				<ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
					<li>
						<Typography
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							About Us
						</Typography>
					</li>
					<li>
						<Typography
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							License
						</Typography>
					</li>
					<li>
						<Typography
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contribute
						</Typography>
					</li>
					<li>
						<Typography
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contact Us
						</Typography>
					</li>
					<Link to="/login">
						<li>
							<Typography
								color="blue-gray"
								className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
							>
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
