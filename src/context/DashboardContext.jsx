/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
	const [screenSize, setScreenSize] = useState(undefined);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// --------drawer--------------
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener("resize", handleResize);

		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 960) {
			setIsSidebarOpen(false);
		} else {
			setIsSidebarOpen(true);
		}
	}, [screenSize]);

	const dashboardInfo = {
		isSidebarOpen,
		setIsSidebarOpen,
		isDrawerOpen,
		toggleDrawer,
	};
	return <DashboardContext.Provider value={dashboardInfo}>{children}</DashboardContext.Provider>;
};
