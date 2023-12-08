import { useMemo, useState, useContext } from "react";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
// import { MdOutlineManageAccounts } from "react-icons/md";
// import { MdPostAdd } from "react-icons/md";
import { MdOutlineCancel, MdOutlineEvent } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { CgErase } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { TfiPencilAlt } from "react-icons/tfi";
//   import { DashboardContext } from "../../context/DashboardContext";

// import useUser from "../../hooks/useUser";

import { DashboardContext } from "../../../context/DashboardContext";
import { FiEdit, FiShoppingBag } from "react-icons/fi";
import { Card } from "@material-tailwind/react";

const Sidebar = () => {
	const { openSidebar, setOpenSidebar } = useContext(DashboardContext);

	// const { user } = useContext(AuthContext);
	// const [isUser] = useUser(user?.email);

	const [openClass, setOpenClass] = useState("w-12");

	const openCheck = useMemo(() => {
		if (openSidebar) setOpenClass("w-full ease-in-out duration-500 ");
		else setOpenClass("w-12 ease-in-out duration-500 ");
	}, [openSidebar]);

	// ---------for click outside nav close--------------------
	let menuRef = useRef();
	// useEffect(() => {
	// 	let handler = (e) => {
	// 		if (!menuRef.current.contains(e.target)) {
	// 			if (window.innerWidth <= 920) {
	// 				setOpenSidebar(false);
	// 			}
	// 			// console.log(menuRef.current);
	// 		}
	// 	};
	// 	document.addEventListener("mousedown", handler);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handler);
	// 	};
	// });
	const menus = [
		{
			title: "Dashboard",
			links: [
				{
					id: 4,
					name: "admin profile",
					link: "/dashboard/admin",
					icon: <TfiPencilAlt />,
				},
			],
		},
		{
			title: "Pages",
			links: [
				{
					id: 2,
					name: "Events",
					link: "/dashboard/events",
					icon: <TfiWrite />,
				},
				{
					id: 3,
					name: "Blogs",
					link: "/dashboard/blogs",
					icon: <TfiWrite />,
				},
			],
		},
	];
	const { activeMenu, setActiveMenu, screenSize } = useContext(DashboardContext);

	const handleCloseSideBar = () => {
		if (activeMenu !== undefined && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
	const normalLink =
		"flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-900 dark:text-gray-200 dark:hover:text-black hover:bg-gray-400  m-2 bg-gray-200";

	return (
		<Card className="pl-3 z-999 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-xl">
			{activeMenu && (
				<>
					<div className="flex justify-between items-center">
						<p className="font-bold text-xl p-4">Dashboardd</p>
						<button
							type="button"
							onClick={() => setActiveMenu(!activeMenu)}
							className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
						>
							<MdOutlineCancel className="w-5 h-5" />
						</button>
					</div>
					<div className="mt-10 ">
						{menus.map((item) => (
							<div key={item.title}>
								<p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
								{item.links.map((link) => (
									<NavLink
										to={`${link.link}`}
										key={link.name}
										onClick={handleCloseSideBar}
										style={({ isActive }) => ({
											backgroundColor: isActive ? "#2196F5" : "",
										})}
										className={({ isActive }) => (isActive ? activeLink : normalLink)}
									>
										{link.icon}
										<span className="capitalize ">{link.name}</span>
									</NavLink>
								))}
							</div>
						))}
					</div>
				</>
			)}
		</Card>
	);
};

export default Sidebar;
