/* eslint-disable react/prop-types */
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.theme || "system");
	const [scrollPosition, setScrollPosition] = useState(0);

	const [openNav, setOpenNav] = useState(false);
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

	useEffect(() => {
		window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
		return () => {
			window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
		};
	}, []);

	useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
		return () => {
			window.removeEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
		};
	}, []);

	// ---------for click outside nav close--------------------
	let menuRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpenNav(false);
				setThemeMenu(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	const dashboardInfo = {
		theme,
		onThemeSwitcherItemClick,
		scrollPosition,
		openNav,
		menuRef,
		themeMenu,
		setThemeMenu,
		setOpenNav,
	};
	return <ThemeContext.Provider value={dashboardInfo}>{children}</ThemeContext.Provider>;
};
