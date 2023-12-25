/* eslint-disable react/prop-types */

import { Button, Dialog, DialogBody, DialogFooter, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useRef } from "react";

const ViewModal = ({ isOpen, onClose, content, setViewModalOpen }) => {
	let viewRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (viewRef.current && !viewRef.current.contains(e.target)) {
				setViewModalOpen(false);
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
				size="lg"
				open={isOpen}
				onClose={onClose}
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0.9, y: -100 },
				}}
				ref={viewRef}
				className="h-[30rem] overflow-x-auto bg-color-secondary"
			>
				<DialogBody>
					<div className="flex justify-between gap-10">
						<div></div>
						<h1 className="text-2xl md:text-3xl font-bold text-center text-color-header py-5 capitalize">
							{content?.title}
						</h1>
						<IconButton
							size="sm"
							variant="text"
							onClick={onClose}
							className="bg-color-primary text-color-header"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								className="h-5 w-5"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</IconButton>
					</div>

					{content?.eventType && (
						<Typography
							variant="h6"
							className={`${
								content?.eventType === "free" ? "text-green-500" : "text-yellow-800"
							} font-bold text-center`}
						>
							{content?.eventType?.charAt(0).toUpperCase() + content?.eventType?.slice(1)}
						</Typography>
					)}
					{content?.dateTime && (
						<Typography variant="small" className="font-bold text-center  text-color-text py-2">
							{new Date(content?.dateTime).toLocaleString("en-US", {
								weekday: "short",
								year: "numeric",
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
						</Typography>
					)}
					{/* <img  alt="..."/> */}
					<img
						src={content?.cover}
						alt="card-image"
						className=" object-contain h-full mx-auto"
						width="400"
						height="200"
					/>
					<div
						dangerouslySetInnerHTML={{ __html: content?.content }}
						className="mx-auto py-2  text-color-text"
					/>
				</DialogBody>
				<DialogFooter>
					<Button color="red" onClick={onClose}>
						Cancel
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};
export default ViewModal;
