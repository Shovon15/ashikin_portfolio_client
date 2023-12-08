import { useContext } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Logo-New.png";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { ThemeContext } from "../../context/ThemeContextProvider";

export function Header() {
	const { theme, onThemeSwitcherItemClick, scrollPosition, openNav, setOpenNav, menuRef, themeMenu, setThemeMenu } =
		useContext(ThemeContext);

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
							<p key={option.text} className="text-blue-500">
								{option.icon}
							</p>
						)
				)}
			</>
		);
	};

	const navListData = [
		{
			id: 1,
			name: "home",
			link: "",
		},
		{
			id: 2,
			name: "Free Training",
			link: "training",
		},
		{
			id: 3,
			name: "Program",
			link: "program",
		},
		{
			id: 4,
			name: "Artical",
			link: "artical",
		},
	];
	const navList = (
		<ul className="mb-4 mt-4 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row items-start lg:items-center ">
			{navListData.map(({ id, name, link }) => (
				<NavLink
					key={id}
					to={`/${link}`}
					className="text-black text-md hover:text-blue-500 dark:text-white dark:hover:text-blue-500 font-bold duration-500 cursor-pointer px-3 py-2"
				>
					{name}
				</NavLink>
			))}
		</ul>
	);

	return (
		<Navbar
			className={`sticky inset-0 z-30 h-max max-w-full bg-white  dark:bg-[#0F172A] rounded-none  px-4 md:px-10 py-3  nav ${
				scrollPosition > 580
					? "border-t-0 border-l-0 border-r-0 border-b border-b-gray-400 shadow-lg dark:border-b-blue-500"
					: "border-none shadow-none"
			}`}
			ref={menuRef}
		>
			<div className="flex items-center justify-between text-blue-gray-900">
				<Link to="/" className="cursor-pointer px-2">
					<img className="w-44" src={logo} alt="..." />
				</Link>
				<div className="flex items-center gap-2">
					<div className="mr-10 hidden lg:block">{navList}</div>
					<div>
						<button
							className="bg-gray-200 dark:bg-darkPrimary dark:border dark:border-blue-500 hover:bg-gray-300 p-2 rounded-md text-black
                 dark:text-white dark:hover:text-white "
							onClick={() => setThemeMenu(!themeMenu)}
						>
							<ThemeIcon />
						</button>
						<div
							className={`${
								themeMenu
									? "bg-gray-100 border-2 z-30 border-gray-200 dark:border-blue-500 dark:bg-slate-400 opacity-1 "
									: "hidden opacity-0"
							}flex fixed  rounded-md -mt-2 right-1 md:top-16 md:right-8 duration-300 ease-in-out  flex-col gap-0.5 justify-center p-1`}
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
										className={`px-4 py-2 rounded-md  hover:bg-gray-300  flex justify-between gap-2
                                 ${theme === text ? "text-sky-500 bg-gray-300" : "text-black"}`}
									>
										{text}
										{icon}
									</button>
								);
							})}
						</div>
					</div>

					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</IconButton>
				</div>
			</div>
			<Collapse className="flex flex-col text-black text-start" open={openNav}>
				{navList}
			</Collapse>
		</Navbar>
	);
}

export default Header;
