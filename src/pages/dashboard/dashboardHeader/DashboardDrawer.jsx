import { Button, Drawer, IconButton, List, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import LogoutButton from "../../../components/Button/LogoutButton";
import { Link, NavLink } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";


const DashboardDrawer = () => {
	const { isDrawerOpen, toggleDrawer } = useContext(DashboardContext);

	const links = [
		{
			name: "dashboard",
			link: "/dashboard",
			icon: <RxDashboard className="w-5 h-5" />,
		},
		{
			name: "events",
			link: "/dashboard/events",
			icon: <BsCalendar2Event className="w-5 h-5" />,
		},
		{
			name: "blogs",
			link: "/dashboard/blogs",
			icon: <MdOutlineMessage className="w-5 h-5" />,
		},

		{
			name: "invitations",
			link: "/dashboard/invitations",
			icon: <SlEnvolopeLetter className="w-5 h-5" />,
		},
	];

	const activeClass =
		"!bg-gradient-to-r from-cyan-500 to-blue-700  hover:!bg-buttonHover activee:!bg-buttonActive text-white dark:text-gray-300 font-bold";
	const SidebarClass =
		"flex gap-3 items-center dark:text-white bg-gray-100 dark:bg-[#13254f] py-3 px-5 hover:bg-gray-300 rounded-md active:bg-gray-400";

	return (
		<>
			<Drawer open={isDrawerOpen} onClose={toggleDrawer} className="p-4 min-h-screen dark:bg-bgSecondary">
				<div className="mb-6 flex items-center justify-between">
					<Typography variant="h5" color="blue-gray">
						Dashboard
					</Typography>
					<IconButton variant="text" color="blue-gray" onClick={toggleDrawer}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-5 w-5"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</IconButton>
				</div>

				<div>
					<List className="p-0">
						{links.map(({ name, link, icon }) => (
							<NavLink
								key={name}
								to={link}
								end
								className={({ isActive }) =>
									isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`
								}
								onClick={toggleDrawer}
							>
								{icon}
								{name.charAt(0).toUpperCase()}
								{name.slice(1)}
							</NavLink>
						))}
					</List>
				</div>
				<div className="flex gap-3 py-5 w-full">
					<Link to="/" className="w-1/2">
						<Button
							onClick={toggleDrawer}
							className="bg-gradient-to-r from-cyan-500 to-blue-700 capitalize text-lg py-2 px-9"
						>
							Home
						</Button>
					</Link>
					<div className="w-1/2">
						<LogoutButton />
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default DashboardDrawer;
