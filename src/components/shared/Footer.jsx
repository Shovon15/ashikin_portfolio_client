import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const LINKS = [
	{
		title: "Product",
		items: ["Overview", "Features", "Solutions", "Tutorials"],
	},
	{
		title: "Company",
		items: ["About us", "Careers", "Press", "News"],
	},
	{
		title: "Resource",
		items: ["Blog", "Newsletter", "Events", "Help center"],
	},
];

const currentYear = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="relative w-full bg-gray-400 py-10">
			<div className="mx-auto w-full max-w-7xl px-8">
				<div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
					<Link to="/login">
						<Typography variant="h5" className="mb-6">
							Ashikin Alam
						</Typography>
					</Link>
					<div className="grid grid-cols-3 justify-between gap-4">
						{LINKS.map(({ title, items }) => (
							<ul key={title}>
								<Typography variant="small" color="blue-gray" className="mb-3 font-medium opacity-40">
									{title}
								</Typography>
								{items.map((link) => (
									<li key={link}>
										<Typography
											as="a"
											href="#"
											color="gray"
											className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
										>
											{link}
										</Typography>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
