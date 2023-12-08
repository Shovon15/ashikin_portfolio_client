/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Typography, Button, CardFooter } from "@material-tailwind/react";
import { CiCalendar } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { showErrorToast, showSuccessToast } from "../../../shared/ToastMessage";
import axios from "axios";
import { useState } from "react";
import ConfirmationModal from "../../../../helper/ConfirmationModal";
import { useContext } from "react";
import { DataContext } from "../../../../context/DataContext";

const EventCardAdmin = ({ data }) => {
	const [deletingEvent, setDeletingEvent] = useState(null);
	const { title, cover, content, createdAt } = data;
	const { fetchEventData } = useContext(DataContext);

	const closeModal = () => {
		setDeletingEvent(null);
	};

	const imagePath = cover.replace("public", "");

	// --------------------for process date-------------
	const originalDate = new Date(createdAt);

	const formattedDate = originalDate.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	const formatedTime = originalDate.toLocaleTimeString("en-US", {
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
	});
	// ----------------for process content text-----------------
	const maxLength = 300;
	const truncateText = (text, limit) => {
		return text.length > limit ? text.slice(0, limit) + "..." : text;
	};
	// Truncate the text
	const truncatedText = truncateText(content, maxLength);
	// ----------------------------------------

	const handleDeleteEvent = async ({ _id }) => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/events/${_id}`);

			if (response.status === 200) {
				closeModal();
				fetchEventData();
				showSuccessToast(`Successfully deleted event with ID: ${_id}`);
			} else {
				console.error(`Unexpected response status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error deleting event:", error);

			showErrorToast(`Error deleting event with ID: ${_id}`);
		}
	};

	return (
		<>
			<Card className="w-full h-[17rem]  flex-row justify-around">
				<CardHeader shadow={true} floated={false} className="m-0 w-2/7 shrink-0 rounded-r-none">
					<img
						src={`http://localhost:5000` + imagePath}
						alt="card-image"
						className=" object-contain h-full"
						width="400"
						height="200"
					/>
				</CardHeader>
				<CardBody className="w-4/7 py-3 overflow-hidden">
					<div className="flex gap-5 justify-end">
						<Typography variant="h6" color="gray" className=" uppercase">
							<CiClock2 className="w-5 h-5" /> {formatedTime}
						</Typography>
						<Typography variant="h6" color="gray" className=" uppercase">
							<CiCalendar className="w-5 h-5" /> {formattedDate}
						</Typography>
					</div>

					<Typography variant="h4" color="blue-gray" className="mb-2">
						{title}
					</Typography>
					<div dangerouslySetInnerHTML={{ __html: truncatedText }} />
				</CardBody>
				<CardFooter className="w-1/7 flex flex-col gap-5 justify-center">
					<div className="">
						<Button
							variant="text"
							className="bg-green-600 hover:bg-green-400 active:bg-green-700 text-white capitalize text-lg py-2 w-full"
						>
							view
						</Button>
					</div>
					<div className="">
						<Button
							variant="text"
							className="bg-green-600 hover:bg-green-400 active:bg-green-700 text-white capitalize text-lg py-2 w-full"
						>
							Update
						</Button>
					</div>
					<div className="">
						<div onClick={() => setDeletingEvent(data)}>
							<Button
								variant="text"
								className="w-full py-2 bg-red-500 hover:bg-red-800 active:bg-red-600 capitalize text-lg text-white"
							>
								Delete
							</Button>
						</div>
					</div>
				</CardFooter>
			</Card>
			{deletingEvent && (
				<ConfirmationModal
					message={deletingEvent.title}
					successAction={handleDeleteEvent}
					modalData={deletingEvent}
					closeModal={closeModal}
					handleOpen
					open
				></ConfirmationModal>
			)}
		</>
	);
};

export default EventCardAdmin;
