import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import DashboardNav from "../pages/dashboard/dashboardHeader/DashboardNav";
import DashboardDrawer from "../pages/dashboard/dashboardHeader/DashboardDrawer";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/dashboard/sidebar/AdminSidebar";

const DashboardLayout = () => {
	const { isSidebarOpen } = useContext(DashboardContext);

	return (
		<div>
			<DashboardDrawer />
			<DashboardNav />
			<div className="flex">
				<AdminSidebar />
				<div
					className={`${
						isSidebarOpen ? "w-full lg:ml-72" : "w-full"
					} min-h-screen p-5 transition-all duration-300 ease-in-out dark:bg-bgSecondary`}
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
