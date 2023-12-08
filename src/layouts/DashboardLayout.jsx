import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import DashboardNav from "../pages/dashboard/dashboardHeader/DashboardNav";
import Sidebar from "../pages/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	const { activeMenu } = useContext(DashboardContext);
	// const activeMenu = true;
	return (
		<div className="flex">
			{activeMenu ? (
				<div className="w-72 fixed top-16 md:top-0 z-999 sidebar dark:bg-secondary-dark-bg bg-white transition-all duration-300 ease-in-out min-h-screen">
					<Sidebar />
				</div>
			) : (
				<div className="w-0 dark:bg-secondary-dark-bg transition-all duration-300 ease-in-out">
					<Sidebar />
				</div>
			)}
			<div
				className={
					activeMenu
						? "min-h-screen md:ml-72 w-full transition-all duration-300 ease-in-out "
						: " w-full min-h-screen "
				}
			>
				<div className="w-full fixed top-0 z-10">
					<DashboardNav />
				</div>
				<div className="mt-10 p-5 md:p-10">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
