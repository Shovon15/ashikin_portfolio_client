import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { List } from "@material-tailwind/react";
import LogoutButton from "../../../components/Button/LogoutButton";

import { RxDashboard } from "react-icons/rx";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import PrimaryButton from "../../../components/Button/PrimaryButton";

export function AdminSidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);

	const activeClass = "!bg-color-button  text-color-header font-bold";
	const SidebarClass =
		"flex gap-3 items-center bg-color-secondary text-color-text py-3 px-5 active:!bg-color-button hover:!bg-color-buttonHover";

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

	return (
		<div
			className={`${
				isSidebarOpen ? "w-0 lg:w-72 z-30 min-h-screen hidden lg:block lg:fixed left-0 top-16" : "w-0 hidden"
			} p-4 shadow-xl  bg-color-primary transition-all duration-300 ease-in-out `}
		>
			<div className="mb-2 flex justify-end items-center text-color-header ">
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
				{links.map(({ name, link, icon }) => (
					<NavLink
						key={name}
						to={link}
						end
						className={({ isActive }) => (isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`)}
					>
						{icon}
						{name.charAt(0).toUpperCase()}
						{name.slice(1)}
					</NavLink>
				))}
			</List>
			<div className="flex gap-3 py-5 w-full">
				<Link to="/" className="w-1/2">
					<PrimaryButton className="px-10 py-2.5">Home</PrimaryButton>
				</Link>
				<div className="w-1/2">
					<LogoutButton />
				</div>
			</div>
		</div>
	);
}
export default AdminSidebar;
