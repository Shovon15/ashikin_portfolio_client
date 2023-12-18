/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Navbar, IconButton, Tooltip, Drawer } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo/Logo-New.png";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export function Header() {
	const [openNav, setOpenNav] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

	const toggleDrawer = () => setOpenNav(!openNav);

	let drawerRef = useRef();

	useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
		window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
		document.addEventListener("scroll", () => setOpenNav(false));

		const handler = (e) => {
			if (drawerRef.current && !drawerRef.current.contains(e.target)) {
				setOpenNav(false);
			}
		};
		document.addEventListener("mousedown", handler);

		return () => {
			window.removeEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
			window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
			document.removeEventListener("scroll", () => setOpenNav(false));
			document.removeEventListener("mousedown", handler);
		};
	}, []);

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

	const activeClass = "!text-textPrimary font-bold !border-blue-500";
	const navListClass =
		"text-textSecondary hover:text-textPrimary text-md  font-semibold ease-in-out duration-100 cursor-pointer px-3 py-3 md:py-2 border-b rounded-none border-gray-500 lg:border-none  lg:bg-inherit  rounded-md md:bg-inherit w-full capitalize flex gap-3";

	const navList = (
		<div className="flex flex-col lg:flex-row gap-5 lg:items-center px-3 lg:px-0 w-full">
			<ul className="mb-4 mt-4 w-full flex flex-col gap-1 lg:gap-5 lg:mb-0 lg:mt-0 lg:flex-row items-start lg:items-center ">
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
			<div className="flex justify-center items-center gap-3 py-5">
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
		</div>
	);

	return (
		<>
			<Navbar
				className={`h-24 max-w-full sticky top-0 z-30 !bg-white rounded-none px-0 md:px-10 transform transition duration-500 ease-in-out ${
					scrollPosition > 0 ? "-translate-y-6 shadow-xl pt-6" : "shadow-none"
				}`}
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
						{!openNav && (
							<IconButton
								variant="text"
								className="ml-auto h-6 w-6 text-gray-700   hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</IconButton>
						)}
					</div>
				</div>
			</Navbar>

			<Drawer ref={drawerRef} open={openNav} onClose={toggleDrawer} className="p-4 min-h-screen ">
				<div className=" flex items-end justify-end">
					<IconButton variant="text" color="blue-gray" onClick={() => setOpenNav(false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-5 w-5"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</IconButton>
				</div>
				<div className="lg:hidden">{navList}</div>
			</Drawer>
		</>
	);
}

export default Header;
