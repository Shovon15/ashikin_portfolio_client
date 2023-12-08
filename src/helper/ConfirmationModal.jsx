/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useRef } from "react";

const ConfirmationModal = ({ isOpen, onClose, content, successAction, setDeleteModalOpen }) => {
	// const { windowWidth } = useContext(DashboardContext);
	// const { openNav } = useContext(ThemeContext);
	// console.log(openNav);
	// let size = "xl";
	// if (openNav) {
	// 	size = "md";
	// }

	let deleteRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (deleteRef.current && !deleteRef.current.contains(e.target)) {
				setDeleteModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<>
			<Dialog
				size="md"
				open={isOpen}
				onClose={onClose}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				ref={deleteRef}
			>
				<DialogHeader className="text-blue-500 mx-auto"> {content?.title}</DialogHeader>
				<DialogBody divider className="text-red-500 font-semibold h-24 flex items-center">
					Warning: Deleting this Event is Permanent and Cannot be Undone.
				</DialogBody>
				<DialogFooter>
					<Button variant="text" color="red" onClick={onClose} className="mr-1">
						<span>Cancel</span>
					</Button>
					<Button variant="gradient" color="green" onClick={() => successAction(content)}>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default ConfirmationModal;
