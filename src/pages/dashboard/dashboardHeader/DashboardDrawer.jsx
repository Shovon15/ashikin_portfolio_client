import { Button, Drawer, IconButton, List, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Link, NavLink } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import LogoutButton from "../../../components/Button/LogoutButton";

const DashboardDrawer = () => {
	const { isDrawerOpen, toggleDrawer } = useContext(DashboardContext);

	const links = [
		{
			name: "dashboard",
			link: "/dashboard",
		},
		{
			name: "events",
			link: "/dashboard/events",
		},
		{
			name: "blogs",
			link: "/dashboard/blogs",
		},
		{
			name: "profile",
			link: "/dashboard/profile",
		},
	];

	const activeClass = "!bg-buttonPrimary text-white font-bold";
	const SidebarClass =
		"flex gap-3 items-center bg-gray-200 py-3 px-5 hover:bg-gray-300 rounded-md active:bg-gray-400 my-2";

	return (
		<>
			<Drawer open={isDrawerOpen} onClose={toggleDrawer} className="p-4 min-h-screen">
				<div className="mb-6 flex items-center justify-between">
					<Typography variant="h5" color="blue-gray">
						Material Tailwind
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
						{links.map((linkItem) => (
							<NavLink
								key={linkItem.name}
								to={linkItem.link}
								end
								className={({ isActive }) =>
									isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`
								}
								onClick={toggleDrawer}
							>
								<TfiWrite className="text-lg" />
								{linkItem.name}
							</NavLink>
						))}
					</List>
				</div>
				<LogoutButton />
				<Link to="/">
					<Button onClick={toggleDrawer} className="bg-buttonPrimary w-full">
						Home
					</Button>
				</Link>
			</Drawer>
		</>
	);
};

export default DashboardDrawer;
