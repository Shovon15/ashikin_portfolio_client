/* eslint-disable react/prop-types */

import { Button, Dialog, DialogBody, DialogFooter, IconButton, Typography } from "@material-tailwind/react";

const ViewModal = ({ isOpen, onClose, content }) => {
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
				className="h-[30rem] overflow-x-auto"
			>
				<DialogBody>
					<div className="flex justify-between gap-10">
						<div></div>
						<h1 className="text-xl font-semibold text-center">{content?.title}</h1>
						<IconButton size="sm" variant="text" onClick={onClose} className="bg-gray-300">
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

					<Typography
						variant="h6"
						className={`${
							content?.eventType === "free" ? "text-green-500" : "text-yellow-800"
						} font-bold text-center`}
					>
						{content?.eventType?.charAt(0).toUpperCase() + content?.eventType?.slice(1)}
					</Typography>
					<Typography variant="small" color="blue-gray" className="font-bold text-center py-2">
						{new Date(content?.dateTime).toLocaleString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						})}
					</Typography>
					<img
						src={`http://localhost:5000` + content?.cover?.replace("public", "")}
						alt="card-image"
						className=" object-contain h-full mx-auto"
						width="400"
						height="200"
					/>
					<div dangerouslySetInnerHTML={{ __html: content?.content }} className="mx-auto py-2" />
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
