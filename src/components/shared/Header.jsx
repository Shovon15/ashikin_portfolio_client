import { useContext } from "react";
import { Navbar, IconButton, Collapse, Tooltip } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Logo-New.png";
import { ThemeContext } from "../../context/ThemeContextProvider";
import ThemeButton from "../Button/ThemeButton";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
// import "./header.css";

export function Header() {
	const { scrollPosition, openNav, setOpenNav, menuRef } = useContext(ThemeContext);

	const navListData = [
		{
			id: 1,
			name: "home",
			link: "",
		},
		{
			id: 2,
			name: "Services",
			link: "services",
		},
		{
			id: 3,
			name: "Programs",
			link: "events",
		},
		{
			id: 4,
			name: "blog",
			link: "blogs",
		},
	];

	const activeClass = "!text-textPrimary dark:text-textPrimary font-bold";
	const navListClass =
		"text-textSecondary hover:text-textPrimary text-md dark:text-white font-semibold ease-in-out duration-100 cursor-pointer px-3 py-3 md:py-2  bg-gray-200 dark:bg-[#1a3470] lg:bg-inherit dark:lg:bg-inherit rounded-md md:bg-inherit w-full capitalize ";

	const navList = (
		<div className="flex flex-col md:flex-row gap-5 md:items-center px-3 md:px-0">
			<ul className="mb-4 mt-4 w-full flex flex-col gap-2 lg:gap-5 lg:mb-0 lg:mt-0 lg:flex-row items-start lg:items-center ">
				{navListData.map(({ id, name, link }) => (
					<NavLink
						key={id}
						to={`/${link}`}
						end
						className={({ isActive }) => (isActive ? `${activeClass} ${navListClass}` : `${navListClass}`)}
						onClick={() => setOpenNav(false)}
					>
						{name}
					</NavLink>
				))}
			</ul>
			<div className="flex gap-3 pb-8 md:pb-0 pl-5 md:pl-0">
				<Tooltip
					content="facebook"
					placement="top"
					className="border border-blue-gray-50 bg-white px-4 py-1 shadow-xl shadow-black/10 text-gray-700"
					animate={{
						mount: { scale: 1, y: 0 },
						unmount: { scale: 0, y: 25 },
					}}
				>
					<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
						<FaFacebookF className="text-textSecondary hover:text-textPrimary cursor-pointer  w-5 h-5 hover:scale-110 " />
					</a>
				</Tooltip>
				<Tooltip
					content="youtube"
					placement="top"
					className="border border-blue-gray-50 bg-white px-4 py-1 shadow-xl shadow-black/10 text-gray-700"
					animate={{
						mount: { scale: 1, y: 0 },
						unmount: { scale: 0, y: 25 },
					}}
				>
					<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
						<FaYoutube className="text-textSecondary hover:text-textPrimary cursor-pointer hover:scale-110  w-5 h-5" />
					</a>
				</Tooltip>
			</div>
			<div className="pl-0 md:pl-10 hidden">
				<ThemeButton />
			</div>
		</div>
	);

	return (
		// <Navbar
		// 	className={`sticky inset-0 h-24 z-30 max-w-full bg-white dark:bg-[#0F172A] rounded-none px-4 md:px-10 shadow-xl transform transition duration-100 ${
		// 		scrollPosition > 0 ? "-translate-y-4" : ""
		// 	}`}
		// 	ref={menuRef}
		// >
		// 	<div className="flex items-center justify-between">
		// 		<Link to="/" className="cursor-pointer px-2">
		// 			<img src={logo} alt="..." className="w-36" />
		// 		</Link>
		// 		<div className="flex items-center gap-2">
		// 			<div className="mr-10 hidden lg:block">{navList}</div>
		// 			<ThemeButton />

		// 			<IconButton
		// 				variant="text"
		// 				className="ml-auto h-6 w-6 text-gray-700 dark:text-white  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
		// 				ripple={false}
		// 				onClick={() => setOpenNav(!openNav)}
		// 			>
		// 				{openNav ? (
		// 					<svg
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						className="h-6 w-6"
		// 						viewBox="0 0 24 24"
		// 						stroke="currentColor"
		// 						strokeWidth={2}
		// 					>
		// 						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		// 					</svg>
		// 				) : (
		// 					<svg
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						className="h-6 w-6"
		// 						fill="none"
		// 						stroke="currentColor"
		// 						strokeWidth={2}
		// 					>
		// 						<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
		// 					</svg>
		// 				)}
		// 			</IconButton>
		// 		</div>
		// 	</div>
		// 	<Collapse className="flex flex-col  text-start " open={openNav}>
		// 		{navList}
		// 	</Collapse>
		// </Navbar>

		<Navbar
			className={`h-24 max-w-full sticky top-0 z-30 !bg-white rounded-none px-0 md:px-10 transform transition duration-500 ease-in-out ${
				scrollPosition > 0 ? "-translate-y-6 shadow-xl pt-6" : "shadow-none"
			}`}
			ref={menuRef}
		>
			<div className="flex items-center justify-between pt-5 px-5 md:pt-3">
				<Link to="/" className="cursor-pointer px-0">
					<img
						src={logo}
						alt="..."
						className={` transform transition w-44 md:w-56 duration-500 pl-5 ${
							scrollPosition > 0 ? "scale-100" : "scale-125 "
						}`}
					/>
				</Link>
				<div className="flex items-center gap-2">
					<div className=" hidden lg:block">{navList}</div>

					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-gray-700 dark:text-white  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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

			<Collapse className="w-full bg-white" open={openNav}>
				{navList}
			</Collapse>
		</Navbar>
	);
}

export default Header;
