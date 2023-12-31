/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
// import logo from "../../../assets/logo/Logo-New.png";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";

export function Header() {
	const [openNav, setOpenNav] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

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

	const navLinks = [
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
			link: "programs",
		},
		{
			id: 4,
			name: "blog",
			link: "blogs",
		},
	];

	const menuVars = {
		initial: {
			scaleY: 0,
		},
		animate: {
			scaleY: 1,
			transition: {
				duration: 0.5,
				ease: [0.12, 0, 0.39, 0],
			},
		},
		exit: {
			scaleY: 0,
			transition: {
				delay: 0.5,
				duration: 0.5,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};
	const containerVars = {
		initial: {
			transition: {
				staggerChildren: 0.09,
				staggerDirection: -1,
			},
		},
		open: {
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.09,
				staggerDirection: 1,
			},
		},
	};

	return (
		<>
			<nav
				className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
					scrollPosition > 0 ? "bg-color-secondary p-5 shadow-xl" : "p-10 bg-none"
				}`}
			>
				<div className="flex justify-between items-center py-0 md:px-5 lg:px-10">
					<div className="flex items-center ">
						<Link to="/" className="cursor-pointer px-0">
							{/* <img
								src={logo}
								alt="..."
								className={` transform transition w-44 md:w-56 duration-500 pl-0 py-3 ${
									scrollPosition > 0 ? "scale-90" : "scale-110"
								}`}
							/> */}
							<Typography
								variant="h4"
								className={` transform transition w-44 md:w-56 duration-500 text-color-text origin-left pl-0 py-0 ${
									scrollPosition > 0 ? "scale-90" : "scale-110"
								}`}
							>
								ASHIKIN ALAM
							</Typography>
						</Link>
					</div>
					<div className="lg:flex gap-20">
						{/* ------------navlist lg----------- */}
						<div className="hidden lg:flex gap-10">
							{navLinks.map(({ name, link }) => (
								<ul key={name} className="flex flex-row gap-2 items-center">
									<NavLink
										to={link}
										className={({ isActive }) => (isActive ? "active" : "inactive hover:active")}
									>
										<Typography variant="h5" className="font-semibold capitalize">
											{name}
										</Typography>
									</NavLink>
								</ul>
							))}
						</div>
						{/* ----------toggle button lg---------- */}
						<div>
							{!openNav ? (
								<button
									className="lg:hidden w-10 h-10 text-color-header rounded-full center"
									onClick={() => setOpenNav(true)}
								>
									<FaBars className="w-6 h-6 " />
								</button>
							) : (
								<div className="w-10 h-10 rounded-full"></div>
							)}
							<div className="hidden lg:flex justify-center items-center gap-3 my-auto">
								<Tooltip
									content="facebook"
									placement="top"
									className="bg-color-secondary px-4 py-1 shadow-xl text-color-text"
									animate={{
										mount: { scale: 1, y: 0 },
										unmount: { scale: 0, y: 25 },
									}}
								>
									<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
										<FaFacebookF className="text-color-text hover:text-color-header cursor-pointer  w-5 h-5 hover:scale-110 m-auto" />
									</a>
								</Tooltip>
								<Tooltip
									content="youtube"
									placement="top"
									className="bg-color-secondary px-4 py-1 shadow-xltext-color-text"
									animate={{
										mount: { scale: 1, y: 0 },
										unmount: { scale: 0, y: 25 },
									}}
								>
									<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
										<FaYoutube className="text-color-text hover:text-color-header cursor-pointer hover:scale-110  w-5 h-5" />
									</a>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
				{/* -----------mobile nav --------- */}
				<AnimatePresence>
					{openNav && (
						<motion.div
							ref={drawerRef}
							variants={menuVars}
							initial="initial"
							animate="animate"
							exit="exit"
							className="fixed left-0 top-0 w-full h-[35rem] origin-top bg-color-primary text-black p-5 shadow-xl"
						>
							<div className="flex h-full flex-col">
								<div className="flex justify-between items-center">
									<Link to="/" className="cursor-pointer px-0">
										{/* <img
											src={logo}
											alt="..."
											className={` transform transition w-44 md:w-56 duration-500 pl-5 ${
												scrollPosition > 0 ? "scale-100" : "scale-125 "
											}`}
										/> */}
										<Typography variant="h4" className="text-color-text">
											ASHIKIN ALAM
										</Typography>
									</Link>
									<IconButton
										variant="text"
										className=" text-color-header rounded-full"
										ripple={false}
										onClick={() => setOpenNav(false)}
									>
										<FaXmark className="w-5 h-5" />
									</IconButton>
								</div>
								<motion.div
									variants={containerVars}
									initial="initial"
									animate="open"
									exit="initial"
									className="flex flex-col h-full justify-center items-center gap-3"
								>
									{navLinks.map(({ link, name, id }) => {
										return (
											<div key={id} className="overflow-hidden w-full">
												<NavLink
													to={link}
													className={({ isActive }) =>
														isActive ? "active" : "text-color-text hover:active"
													}
													onClick={() => setOpenNav(false)}
												>
													<MobileNavLink name={name} />
												</NavLink>
											</div>
										);
									})}
									<div className="overflow-hidden">
										<MobileSocialIcon />
									</div>
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
}

export default Header;
const mobileLinkVars = {
	initial: {
		y: "30vh",
		transition: {
			duration: 0.5,
			ease: [0.37, 0, 0.63, 1],
		},
	},
	open: {
		y: 0,
		transition: {
			ease: [0, 0.55, 0.45, 1],
			duration: 0.7,
		},
	},
};
const MobileNavLink = ({ name }) => {
	return (
		<motion.div variants={mobileLinkVars} className="flex justify-center py-2 border-b border-gray-500">
			<Typography variant="h4" className="capitalize font-bold">
				{name}
			</Typography>
		</motion.div>
	);
};
const mobileSocialLinkVars = {
	initial: {
		y: "10vh",
		transition: {
			duration: 0.5,
			ease: [0.37, 0, 0.63, 1],
		},
	},
	open: {
		y: 0,
		transition: {
			ease: [0, 0.55, 0.45, 1],
			duration: 0.7,
		},
	},
};

const MobileSocialIcon = () => {
	return (
		<motion.div variants={mobileSocialLinkVars} className="flex gap-2 mt-5">
			<IconButton variant="text" className="">
				<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
					<FaFacebookF className="text-color-text hover:text-color-header cursor-pointer hover:scale-110  w-7 h-7" />
				</a>
			</IconButton>
			<IconButton variant="text">
				<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
					<FaYoutube className="text-color-text hover:text-color-header cursor-pointer hover:scale-110  w-7 h-7" />
				</a>
			</IconButton>
		</motion.div>
	);
};
