/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(undefined);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	const dashboardInfo = {
		activeMenu,
		setActiveMenu,
		screenSize,
	};
	return <DashboardContext.Provider value={dashboardInfo}>{children}</DashboardContext.Provider>;
};
// export const useDashboardContext = () => useContext(DashboardContext);
