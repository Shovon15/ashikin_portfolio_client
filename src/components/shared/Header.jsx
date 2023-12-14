import { useContext } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Logo-New.png";
import { ThemeContext } from "../../context/ThemeContextProvider";
import ThemeButton from "../Button/ThemeButton";

export function Header() {
	const { scrollPosition, openNav, setOpenNav, menuRef } = useContext(ThemeContext);

	const navListData = [
		{
			id: 1,
			name: "home",
			link: "",
		},
		// {
		// 	id: 2,
		// 	name: "Free Training",
		// 	link: "training",
		// },
		{
			id: 3,
			name: "Programs",
			link: "events",
		},
		{
			id: 4,
			name: "Artical",
			link: "artical",
		},
	];

	const activeClass = "text-textPrimary dark:text-textPrimary font-bold";
	const navListClass =
		"text-black text-md dark:text-white font-semibold ease-in-out duration-100 cursor-pointer px-3 py-3 md:py-2  bg-gray-200 dark:bg-[#1a3470] lg:bg-inherit dark:lg:bg-inherit rounded-md md:bg-inherit w-full capitalize";

	const navList = (
		<ul className="mb-4 mt-4 flex flex-col gap-2 lg:gap-5 lg:mb-0 lg:mt-0 lg:flex-row items-start lg:items-center ">
			{navListData.map(({ id, name, link }) => (
				<NavLink
					key={id}
					to={`/${link}`}
					end
					className={({ isActive }) => (isActive ? `${activeClass} ${navListClass}` : `${navListClass}`)}
					// onClick={() => setOpenNav(!openNav)}
				>
					{name}
				</NavLink>
			))}
		</ul>
	);

	return (
		<Navbar
			className={`sticky inset-0 z-30 h-max max-w-full bg-white dark:bg-[#0F172A] rounded-none px-4 md:px-10 
			py-3  ${
				scrollPosition > 100
					? "border-t-0 border-l-0 border-r-0 border-b border-b-gray-400 shadow-lg dark:border-b-blue-500"
					: "border-none shadow-none"
			}`}
			ref={menuRef}
		>
			<div className="flex items-center justify-between">
				<Link to="/" className="cursor-pointer px-2">
					<img className="w-44" src={logo} alt="..." />
				</Link>
				<div className="flex items-center gap-2">
					<div className="mr-10 hidden lg:block">{navList}</div>
					<ThemeButton />

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
			<Collapse className="flex flex-col  text-start " open={openNav}>
				{navList}
			</Collapse>
		</Navbar>
	);
}

export default Header;
