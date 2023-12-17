/* eslint-disable react/prop-types */

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { showErrorToast, showSuccessToast } from "../shared/ToastMessage";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ConfirmationModal = ({ isOpen, onClose, content, successAction, setIsLogOutModalOpen }) => {
	let logoutRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (logoutRef.current && !logoutRef.current.contains(e.target)) {
				setIsLogOutModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<Dialog
			size="md"
			open={isOpen}
			onClose={onClose}
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
			ref={logoutRef}
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

const LogoutButton = () => {
	const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
	const { fetchData } = useContext(AuthContext);

	const navigate = useNavigate();

	const cancleLogoutModal = () => setIsLogOutModalOpen(false);

	const handleLogoutEvent = () => {
		try {
			Cookies.remove("token");
			fetchData();

			setIsLogOutModalOpen(false);
			showSuccessToast("Logout");
			navigate("/login");
		} catch (error) {
			console.error("Error during logout:", error);
			showErrorToast(error);
		}
	};

	return (
		<div>
			<div className="my-5 w-full">
				<Button
					onClick={() => setIsLogOutModalOpen(true)}
					variant="text"
					className="w-full px-[4rem] py-2 bg-red-500 hover:bg-red-800 active:bg-red-600 capitalize text-lg text-white"
				>
					Logout
				</Button>
				<ConfirmationModal
					isOpen={isLogOutModalOpen}
					onClose={cancleLogoutModal}
					successAction={handleLogoutEvent}
					setIsLogOutModalOpen={setIsLogOutModalOpen}
				/>
			</div>
		</div>
	);
};

export default LogoutButton;
