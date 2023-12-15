/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { MdOutlineEvent } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { CgErase } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { TfiPencilAlt } from "react-icons/tfi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { showErrorToast, showSuccessToast } from "../../../components/shared/ToastMessage";
import { DashboardContext } from "../../../context/DashboardContext";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import ConfirmationModal from "../../../helper/ConfirmationModal";

export function AdminSidebar() {
	const { user, setUser } = useContext(AuthContext);
	const { isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);

	const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleLogoutModal = () => {
		setIsLogOutModalOpen(true);
	};
	const cancleLogoutModal = () => setIsLogOutModalOpen(false);

	const handleLogoutEvent = () => {
		try {
			localStorage.removeItem("user");
			setUser(null);
			setIsLogOutModalOpen(false);
			showSuccessToast("Logout");
			navigate("/login");
		} catch (error) {
			console.error("Error during logout:", error);
			showErrorToast(error);
		}
	};
	const ConfirmationModal = ({ isOpen, onClose, content, successAction, setIsLogOutModalOpen }) => {
		// let logoutRef = useRef();

		// useEffect(() => {
		// 	let handler = (e) => {
		// 		if (logoutRef.current && !logoutRef.current.contains(e.target)) {
		// 			setIsLogOutModalOpen(false);
		// 		}
		// 	};
		// 	document.addEventListener("mousedown", handler);
		// 	return () => {
		// 		document.removeEventListener("mousedown", handler);
		// 	};
		// });

		return (
			<Dialog
				size="md"
				open={isOpen}
				onClose={onClose}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				// ref={logoutRef}
			>
				<DialogHeader className="text-textPrimary flex justify-center">Logout</DialogHeader>
				<DialogBody divider className="text-red-500 font-bold h-24 flex justify-center items-center">
					Do you really want to logout!
				</DialogBody>
				<DialogFooter>
					<Button variant="text" color="red" onClick={onClose} className="mr-1">
						<span>Cancel</span>
					</Button>
					<Button variant="gradient" color="green" onClick={() => successAction(content)}>
						<span>Logout</span>
					</Button>
				</DialogFooter>
			</Dialog>
		);
	};

	const activeClass =
		"!bg-buttonPrimary hover:!bg-buttonHover activee:!bg-buttonActive text-white dark:text-gray-300 font-bold";
	const SidebarClass =
		"flex gap-3 items-center dark:text-white bg-gray-200 dark:bg-[#13254f] py-3 px-5 hover:bg-gray-300 rounded-md active:bg-gray-400 my-2";

	const links = [
		{
			name: "dashboard",
			link: "/dashboard",
		},
		{
			name: "events",
			link: "/dashboard/events",
		},
		{
			name: "blogs",
			link: "/dashboard/blogs",
		},
		{
			name: "profile",
			link: "/dashboard/profile",
		},
	];

	return (
		<div
			className={`${
				isSidebarOpen ? "w-0 lg:w-72 z-30 min-h-screen hidden lg:block lg:fixed left-0 top-16" : "w-0 hidden"
			} p-4 shadow-xl dark:shadow-[#081126] bg-white dark:bg-bgSecondary transition-all duration-300 ease-in-out `}
		>
			<div className="mb-2 flex justify-end items-center text-gray-500 dark:text-white">
				<div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						className="h-6 w-6  cursor-pointer"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</div>
			<list className="p-0">
				{links.map((linkItem) => (
					<NavLink
						key={linkItem.name}
						to={linkItem.link}
						end
						className={({ isActive }) => (isActive ? `${activeClass} ${SidebarClass}` : `${SidebarClass}`)}
					>
						<TfiWrite className="text-lg" />
						{linkItem.name}
					</NavLink>
				))}
			</list>

			<div className="my-5 w-full">
				<Button
					onClick={handleLogoutModal}
					variant="text"
					className="w-full px-[4rem] py-2 bg-red-500 hover:bg-red-800 active:bg-red-600 capitalize text-lg text-white"
				>
					Logout
				</Button>
				<ConfirmationModal
					isOpen={isLogOutModalOpen}
					onClose={cancleLogoutModal}
					successAction={handleLogoutEvent}
					setIsLogOutModalOpen
				/>
			</div>
			<Link to="/">
				<Button className="bg-buttonPrimary w-full capitalize text-lg py-2">Home</Button>
			</Link>
		</div>
	);
}
export default AdminSidebar;
