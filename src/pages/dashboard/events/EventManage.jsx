/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import EventCardAdmin from "../../../components/card/admin/event/EventCardAdmin";
import { DataContext } from "../../../context/DataContext";
import { FiPlus } from "react-icons/fi";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import ViewModal from "../../../helper/ViewModal";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../components/shared/ToastMessage";
import axios from "axios";

const EventManage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { fetchEventData, receiveEvent } = useContext(DataContext);
	// -------view Modal------------------
	const [isViewModalOpen, setViewModalOpen] = useState(false);
	const [viewEventData, setViewEventData] = useState(null);
	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingEventData, setDeletingEventData] = useState(null);
	// console.log(deletingEventData);
	const fetchData = async () => {
		setIsLoading(true);
		await fetchEventData();
		setIsLoading(false);
	};

	const handleCloseViewModal = () => setViewModalOpen(false);
	const handleCloseDeleteModal = () => {
		setDeletingEventData(null);
		setDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id, title }) => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/events/${_id}`);

			if (response.status === 200) {
				handleCloseDeleteModal();
				fetchData();
				showSuccessToast(`Successfully deleted ${title}`);
			} else {
				console.error(`Unexpected response status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error deleting event:", error);

			showErrorToast(`Error deleting event with Title: ${title}`);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const TABLE_HEAD = ["No.", "Title", "Cover Image", "Schedule", "Type", "Created At", "Updated At", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="min-h-screen ">
			<HeaderText>Manage Events</HeaderText>
			<div className="flex justify-between items-center p-5">
				<Typography variant="h6" className="text-textPrimary font-bold text-3xl ">
					My Events
				</Typography>
				<Link to="/dashboard/events/write-event">
					<Button className="bg-cyan-800 capitalize text-md flex items-center gap-2">
						<FiPlus className="w-6 h-6" /> new event
					</Button>
				</Link>
			</div>
			<div>
				<div className="overflow-x-auto">
					<Card className="rounded-none overflow-x-scroll h-full w-full">
						<table className="w-full min-w-max table-auto text-left">
							<thead>
								<tr>
									{TABLE_HEAD.map((head) => (
										<th key={head} className="border-b  border-blue-gray-100 bg-blue-gray-50 p-4">
											<Typography
												variant="small"
												color="blue-gray"
												className="font-bold opacity-70 text-center"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{receiveEvent.map(
									(
										{ _id, title, cover, eventType, content, createdAt, updatedAt, dateTime },
										index
									) => (
										<tr key={_id} className="even:bg-blue-gray-50/50 text-center">
											<td className="p-2 w-5">
												<Typography variant="small" color="blue-gray" className="font-bold ">
													{index + 1 + "."}
												</Typography>
											</td>
											<td className="p-2 w-80 ">
												<Typography variant="small" color="blue-gray" className="font-bold">
													{title}
												</Typography>
											</td>
											<td className="p-2 ">
												<img
													src={`http://localhost:5000` + cover.replace("public", "")}
													alt="card-image"
													className=" object-contain h-full"
													width="100"
													height="60"
												/>
											</td>
											<td className="p-2">
												<Typography variant="small" color="blue-gray" className="font-bold">
													{new Date(dateTime).toLocaleString("en-US", {
														weekday: "short",
														year: "numeric",
														month: "short",
														day: "numeric",
														hour: "numeric",
														minute: "numeric",
													})}
												</Typography>
											</td>
											<td className="p-2">
												<Typography
													variant="h6"
													className={`${
														eventType === "free" ? "text-green-500" : "text-yellow-800"
													} font-bold`}
												>
													{eventType.charAt(0).toUpperCase() + eventType.slice(1)}
												</Typography>
											</td>
											<td className="p-2 ">
												<Typography variant="h6" className="">
													upadated at
												</Typography>
											</td>
											<td className="p-2 ">
												<Typography variant="h6" className="">
													creaeted at
												</Typography>
											</td>

											<td className="p-2 flex gap-3 justify-center">
												<Button
													variant="outlined"
													// size="sm"
													onClick={() => {
														setViewModalOpen(true);
														setViewEventData({
															title,
															dateTime,
															eventType,
															content,
															cover,
														});
													}}
													className="focus:ring-0 border-none rounded-full p-3"
												>
													<HiOutlineViewfinderCircle className="w-5 h-5 " />
												</Button>
												<Button
													variant="outlined"
													size="sm"
													//   onClick={() => handleMakeVerified(buyer._id)}
													className="focus:ring-0 border-none rounded-full p-3"
												>
													<BiSolidEdit className="w-5 h-5 " />
												</Button>

												<button
													className="focus:ring-0  border-none rounded-full p-3"
													onClick={() => {
														setDeleteModalOpen(true);
														setDeletingEventData({ _id, title });
													}}
												>
													<FaTrashAlt className="w-5 h-5 text-red-500" />
												</button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</Card>
				</div>
				<ViewModal isOpen={isViewModalOpen} onClose={handleCloseViewModal} content={viewEventData} />
				<ConfirmationModal
					isOpen={isDeleteModalOpen}
					onClose={handleCloseDeleteModal}
					content={deletingEventData}
					successAction={handleDeleteEvent}
					setDeleteModalOpen
				/>
			</div>
		</div>
	);
};

export default EventManage;
