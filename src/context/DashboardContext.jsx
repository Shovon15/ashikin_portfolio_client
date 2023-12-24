/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
	const [screenSize, setScreenSize] = useState(undefined);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [scrollPosition, setScrollPosition] = useState(0);

	// --------drawer--------------
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

	useEffect(() => {
		window.addEventListener("resize", () => setScreenSize(window.innerWidth));

		window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));

		return () => {
			window.removeEventListener("resize", () => setScreenSize(window.innerWidth));
			window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
		};
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
		scrollPosition,
	};
	return <DashboardContext.Provider value={dashboardInfo}>{children}</DashboardContext.Provider>;
};
