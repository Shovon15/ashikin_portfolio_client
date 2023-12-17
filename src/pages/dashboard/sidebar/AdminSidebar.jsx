import { TfiWrite } from "react-icons/tfi";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Button, List } from "@material-tailwind/react";

import LogoutButton from "../../../components/Button/LogoutButton";

export function AdminSidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);

	const activeClass =
		"!bg-buttonPrimary hover:!bg-buttonHover activee:!bg-buttonActive text-white dark:text-gray-300 font-bold";
	const SidebarClass =
		"flex gap-3 items-center dark:text-white bg-gray-200 dark:bg-[#13254f] py-3 px-5 hover:bg-gray-300 rounded-md active:bg-gray-400";

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

	return (
		<div
			className={`${
				isSidebarOpen ? "w-0 lg:w-72 z-30 min-h-screen hidden lg:block lg:fixed left-0 top-16" : "w-0 hidden"
			} p-4 shadow-xl dark:shadow-[#081126] bg-white dark:bg-bgSecondary transition-all duration-300 ease-in-out `}
		>
			<div className="mb-2 flex justify-end items-center text-gray-500 dark:text-white">
				<div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						className="h-6 w-6  cursor-pointer"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</div>
			<List className="p-0">
				{links.map((linkItem) => (
					<NavLink
						key={linkItem.name}
						to={linkItem.link}
						end
						className={({ isActive }) => (isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`)}
					>
						<TfiWrite className="text-lg" />
						{linkItem.name}
					</NavLink>
				))}
			</List>

			<div>
				<LogoutButton />
			</div>

			<Link to="/">
				<Button className="bg-buttonPrimary w-full capitalize text-lg py-2">Home</Button>
			</Link>
		</div>
	);
}
export default AdminSidebar;
