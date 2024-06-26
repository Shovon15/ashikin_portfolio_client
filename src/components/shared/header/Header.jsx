import { useEffect, useRef, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import Logo from "../../Logo";
import { navLinks } from "../../../config/docs";

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
		<div
			className={`bg-color-primary sticky top-0 z-50 transition-all duration-300 ease-in-out  ${
				scrollPosition > 0 && "shadow-md"
			}`}
		>
			<nav
				className={`max-w-[1560px] mx-auto transition-all duration-300 ease-in-out py-2 flex justify-between px-5 md:px-10 
				 ${scrollPosition > 0 ? "h-20 border-b" : "h-28"}
				`}
			>
				<Link to="/" className="cursor-pointer px-0">
					<Logo />
				</Link>

				<div className="lg:flex">
					{/* ------------navlist lg----------- */}
					<div className="hidden lg:flex gap-10">
						{navLinks &&
							navLinks.map(({ name, link }) => (
								<ul key={name} className="flex flex-row gap-2 items-center">
									<NavLink
										to={link}
										className={({ isActive }) => (isActive ? "active" : "inactive hover:active")}
									>
										<p className="font-semibold capitalize text-xl">
											{name}
										</p>
									</NavLink>
								</ul>
							))}
					</div>
					{/* ----------toggle button lg---------- */}
					<div className="flex items-center h-full">
						{!openNav && (
							<button
								className="lg:hidden w-10 h-10 text-color-secondary rounded-full flex items-center justify-center"
								onClick={() => setOpenNav(true)}
							>
								<FaBars className="w-6 h-6 " />
							</button>
						)}
					</div>
				</div>

				<AnimatePresence>
					{openNav && (
						<motion.div
							ref={drawerRef}
							variants={menuVars}
							initial="initial"
							animate="animate"
							exit="exit"
							className="fixed left-0 top-0 w-full h-[35rem] origin-top bg-color-primary text-color-text port-lligat-sans-regular p-5 shadow-xl"
						>
							<div className="flex h-full flex-col">
								<div className="flex justify-between items-center">
									<Link to="/" className="cursor-pointer px-0 h-28">
										<Logo />
									</Link>
									<IconButton
										variant="text"
										className=" text-color-secondary rounded-full"
										ripple={false}
										onClick={() => setOpenNav(false)}
									>
										<FaXmark className="w-7 h-7" />
									</IconButton>
								</div>
								<motion.div
									variants={containerVars}
									initial="initial"
									animate="open"
									exit="initial"
									className="flex flex-col h-full justify-center items-center gap-3 pb-10"
								>
									{navLinks &&
										navLinks.map(({ link, name, id }) => {
											return (
												<div key={id} className="overflow-hidden w-full">
													<NavLink
														to={link}
														className={({ isActive }) =>
															isActive ? "active" : "text-color-primary hover:active"
														}
														onClick={() => setOpenNav(false)}
													>
														<MobileNavLink name={name} />
													</NavLink>
												</div>
											);
										})}
									{/* <div className="overflow-hidden">
										<MobileSocialIcon />
									</div> */}
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</div>
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
// eslint-disable-next-line react/prop-types
const MobileNavLink = ({ name }) => {
	return (
		<motion.div variants={mobileLinkVars} className="flex justify-center py-2 border-b border-gray-500">
			<p className="capitalize font-bold">
				{name}
			</p>
		</motion.div>
	);
};
// const mobileSocialLinkVars = {
// 	initial: {
// 		y: "10vh",
// 		transition: {
// 			duration: 0.5,
// 			ease: [0.37, 0, 0.63, 1],
// 		},
// 	},
// 	open: {
// 		y: 0,
// 		transition: {
// 			ease: [0, 0.55, 0.45, 1],
// 			duration: 0.7,
// 		},
// 	},
// };

// const MobileSocialIcon = () => {
// 	return (
// 		<motion.div variants={mobileSocialLinkVars} className="flex gap-2 mt-5">
// 			<IconButton variant="text" className="">
// 				<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
// 					<FaFacebookF className="text-color-primary hover:text-color-header cursor-pointer hover:scale-110  w-7 h-7" />
// 				</a>
// 			</IconButton>
// 			<IconButton variant="text">
// 				<a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
// 					<FaYoutube className="text-color-primary hover:text-color-header cursor-pointer hover:scale-110  w-7 h-7" />
// 				</a>
// 			</IconButton>
// 		</motion.div>
// 	);
// };
