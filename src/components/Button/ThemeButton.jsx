import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContextProvider";

const ThemeButton = () => {
	const { theme, themeMenu, setThemeMenu, onThemeSwitcherItemClick } = useContext(ThemeContext);
	const iconOptions = [
		{
			icon: <IoSunnyOutline className="w-6 h-6" />,
			text: "light",
		},
		{
			icon: <IoMoonOutline className="w-6 h-6" />,
			text: "dark",
		},
		{
			icon: <HiOutlineComputerDesktop className="w-6 h-6" />,
			text: "system",
		},
	];
	const ThemeIcon = () => {
		return (
			<>
				{iconOptions.map(
					(option) =>
						theme === option.text && (
							<p key={option.text} className="text-textPrimary">
								{option.icon}
							</p>
						)
				)}
			</>
		);
	};

	// ---------for click outside nav close--------------------
	let themeRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (themeRef.current && !themeRef.current.contains(e.target)) {
				setThemeMenu(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});
	return (
		<div ref={themeRef}>
			<button
			
				className="bg-inherit  dark:border dark:border-blue-500 hover:bg-gray-300 p-2 rounded-md text-black
             dark:text-white dark:hover:text-white "
				onClick={() => setThemeMenu(!themeMenu)}
			>
				<ThemeIcon />
			</button>
			<div
				className={`${
					themeMenu
						? "bg-gray-100 border-2 z-30 border-gray-200 dark:border-blue-500  dark:bg-[#0d204d] opacity-1 "
						: "hidden opacity-0"
				}flex fixed  rounded-md right-10 mt-0.5 md:top-16 md:right-8 duration-300 ease-in-out  flex-col gap-0.5 justify-center p-1`}
			>
				{iconOptions.map((option, i) => {
					const { icon, text } = option;
					return (
						<button
							key={i}
							onClick={() => {
								onThemeSwitcherItemClick(text);
								setThemeMenu(false);
							}}
							id="theme-switcher"
							className={`px-4 py-2 rounded-md  hover:bg-gray-300 dark:hover:text-blue-800 flex justify-between gap-2
            						 ${theme === text ? "text-textPrimary bg-gray-300"  : "text-black dark:text-white"}`}
						>
							{text}
							{icon}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ThemeButton;
