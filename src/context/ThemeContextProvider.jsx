/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.theme || "system");
	const [themeMenu, setThemeMenu] = useState(false);

	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	function setDarkTheme() {
		document.documentElement.classList.add("dark");
		localStorage.theme = "dark";
		setTheme("dark");
	}

	function setLightTheme() {
		document.documentElement.classList.remove("dark");
		localStorage.theme = "light";
		setTheme("light");
	}

	function setSystemTheme() {
		setTheme("system");
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	function onThemeSwitcherItemClick(theme) {
		if (theme === "system") {
			localStorage.removeItem("theme");
			setSystemTheme();
		} else if (theme === "dark") {
			setDarkTheme();
		} else {
			setLightTheme();
		}
	}

	const dashboardInfo = {
		theme,
		onThemeSwitcherItemClick,
		themeMenu,
		setThemeMenu,
	};
	return <ThemeContext.Provider value={dashboardInfo}>{children}</ThemeContext.Provider>;
};
