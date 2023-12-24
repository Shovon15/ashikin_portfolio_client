import { Drawer, IconButton, List, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import LogoutButton from "../../../components/Button/LogoutButton";
import { Link, NavLink } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const DashboardDrawer = () => {
	const { isDrawerOpen, toggleDrawer } = useContext(DashboardContext);

	const links = [
		{
			name: "dashboard",
			link: "/dashboard/admin",
			icon: <RxDashboard className="w-5 h-5" />,
		},
		{
			name: "banner",
			link: "/dashboard/banner",
			icon: <BsCalendar2Event className="w-5 h-5" />,
		},
		{
			name: "services",
			link: "/dashboard/services",
			icon: <BsCalendar2Event className="w-5 h-5" />,
		},
		{
			name: "programs",
			link: "/dashboard/events",
			icon: <BsCalendar2Event className="w-5 h-5" />,
		},
		{
			name: "blogs",
			link: "/dashboard/blogs",
			icon: <MdOutlineMessage className="w-5 h-5" />,
		},
		{
			name: "reviews",
			link: "/dashboard/reviews",
			icon: <MdOutlineMessage className="w-5 h-5" />,
		},

		{
			name: "invitations",
			link: "/dashboard/invitations",
			icon: <SlEnvolopeLetter className="w-5 h-5" />,
		},
	];

	const activeClass = "!bg-color-button  text-color-header font-bold";
	const SidebarClass =
		"flex gap-3 items-center bg-color-secondary text-color-text py-3 px-5 active:!bg-color-button hover:!bg-color-buttonHover";

	return (
		<>
			<Drawer open={isDrawerOpen} onClose={toggleDrawer} className="p-4 min-h-screen bg-color-primary">
				<div className="mb-6 flex items-center justify-between">
					<Typography variant="h5" className="text-color-header">
						Dashboard
					</Typography>
					<IconButton variant="text" onClick={toggleDrawer} className="text-color-header">
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
								// end
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
						<PrimaryButton onClick={toggleDrawer} className="px-10 py-2.5">
							Home
						</PrimaryButton>
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
