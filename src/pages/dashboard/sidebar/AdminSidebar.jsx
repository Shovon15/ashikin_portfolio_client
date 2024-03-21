import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { List } from "@material-tailwind/react";
import { dashboardLinkItems } from "../../../config/docs";

export function AdminSidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);

	const activeClass = "!bg-color-button  text-color-header font-bold";
	const SidebarClass =
		"flex gap-3 items-center bg-color-secondary text-color-primary py-3 px-5 active:!bg-color-button hover:!bg-color-buttonHover";

	return (
		<div
			className={`${
				isSidebarOpen ? "w-0 lg:w-72 z-50 min-h-screen hidden lg:block lg:fixed left-0 top-16" : "w-0 hidden"
			} p-4 shadow-xl  bg-color-primary transition-all duration-300 ease-in-out`}
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
			<List className="p-0 overflow-y-auto h-[75vh]">
				{dashboardLinkItems &&
					dashboardLinkItems.map(({ name, link, icon }) => (
						<NavLink
							key={name}
							to={link}
							// end
							className={({ isActive }) =>
								isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`
							}
						>
							{icon}
							{name.charAt(0).toUpperCase()}
							{name.slice(1)}
						</NavLink>
					))}
			</List>
		</div>
	);
}
export default AdminSidebar;
