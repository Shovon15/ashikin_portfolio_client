/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";
import { BiSolidEdit } from "react-icons/bi";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";

import HeaderText from "../../../components/shared/textHeader/HeaderText";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import ViewModal from "../../../helper/ViewModal";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../components/shared/ToastMessage";
import { del, get, put } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";

const EventManage = () => {
	// -------view Modal------------------
	const [isViewModalOpen, setViewModalOpen] = useState(false);
	const [viewEventData, setViewEventData] = useState(null);

	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingEventData, setDeletingEventData] = useState(null);

	const [sortOrder, setSortOrder] = useState(true);

	const {
		data: eventData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			const res = await get("events");
			let data = await res?.data?.payload?.data;
			data = data.sort((a, b) => {
				const dateA = new Date(a.createdAt);
				const dateB = new Date(b.createdAt);

				return sortOrder ? dateB - dateA : dateA - dateB;
			});
			return data;
		},
	});
	// console.log(eventData, "eventData");

	useEffect(() => {
		refetch();
	}, [sortOrder, refetch]);

	const handleCloseViewModal = () => setViewModalOpen(false);
	const handleCloseDeleteModal = () => {
		setDeletingEventData(null);
		setDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id, title }) => {
		try {
			const response = await del(`events/${_id}`, _id);
			if (response.status === 200) {
				handleCloseDeleteModal();
				refetch();
				showSuccessToast(`Successfully deleted ${title}`);
			} else {
				console.error(`Unexpected response status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error deleting event:", error);
			showErrorToast(`Error deleting event with Title: ${title}`);
		}
	};

	const handlePublished = async ({ id, isPublished, eventType }) => {
		try {
			const updatedIsPublished = !isPublished;

			const response = await put(`events/${id}`, { isPublished: updatedIsPublished, eventType });

			if (response.status === 200) {
				refetch();
				showSuccessToast(updatedIsPublished ? "Published" : "Unpublished");
			} else {
				console.error(`Unexpected response status: ${response.message}`);
				showErrorToast(response.message);
			}
		} catch (error) {
			// console.error(error.response?.data?.message);
			showErrorToast(error.response?.data?.message);
		}
	};

	const TABLE_HEAD = ["No.", "Title", "Cover", "Schedule", "Type", "status", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen ">
			<HeaderText>Manage Events</HeaderText>
			<div className="flex flex-col-reverse gap-5 md:flex-row md:gap-0 justify-between items-center pb-5 pr-10">
				<div className="flex gap-2 items-center">
					<p className="dark:text-white">Sort by created time order:</p>
					<Button
						onClick={() => setSortOrder(!sortOrder)}
						className="px-5 py-1 bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive"
					>
						{sortOrder ? (
							<TbSortAscendingNumbers className="w-7 h-7" />
						) : (
							<TbSortDescendingNumbers className="w-7 h-7" />
						)}
					</Button>
				</div>
				<Link to="/dashboard/events/write-event">
					<Button className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive capitalize text-md flex items-center gap-2">
						<FiPlus className="w-6 h-6" /> new event
					</Button>
				</Link>
			</div>
			{eventData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-gray-600">
						You have not created any events yet.
						<br />
						Please add an event to get started!
					</p>
				</div>
			) : (
				<div>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-white">
							<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									{TABLE_HEAD.map((head) => (
										<th key={head} className="border-b  border-blue-gray-100 bg-blue-800 p-4">
											<Typography
												variant="small"
												className="font-bold text-white opacity-70 text-center"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="dark:bg-darkPrimary ">
								{eventData.map(
									({ _id, title, cover, eventType, content, isPublished, dateTime }, index) => (
										<tr key={_id} className="even:bg-gray-200 even:dark:bg-gray-800 text-center ">
											<td className="p-2 w-5">
												<Typography variant="small" className="font-bold ">
													{index + 1 + "."}
												</Typography>
											</td>
											<td className="p-2 ">
												<Typography variant="small" className="font-bold">
													{title}
												</Typography>
											</td>
											<td className="p-2 w-32">
												<img
													src={cover}
													alt="card-image"
													className=" object-contain h-full"
													width="100"
													height="60"
												/>
											</td>
											<td className="p-2 w-32">
												<Typography variant="small" className="font-bold">
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
											<td className="p-2 w-24">
												<Typography
													variant="h6"
													className={`${
														eventType === "free" ? "text-green-500" : "text-yellow-800"
													} font-bold`}
												>
													{eventType.charAt(0).toUpperCase() + eventType.slice(1)}
												</Typography>
											</td>
											<td className="p-2 w-32">
												<p>
													{isPublished ? (
														<Button
															onClick={() =>
																handlePublished({
																	id: _id,
																	isPublished,
																	eventType,
																})
															}
															className="bg-green-500 capitalize text-sm text-white py-1 px-2"
														>
															Published
														</Button>
													) : (
														<Button
															onClick={() =>
																handlePublished({
																	id: _id,
																	isPublished,
																	eventType,
																})
															}
															className="bg-red-300 capitalize text-sm text-white py-1 px-2"
														>
															Unpublished
														</Button>
													)}
												</p>
											</td>
											<td className="p-2 flex gap-3 justify-center items-center w-44">
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
													className="focus:ring-0 border-none rounded-full p-3 text-textPrimary"
												>
													<VscScreenFull className="w-5 h-5 " />
												</Button>
												<Link to={`update-event/${_id}`}>
													<Button
														variant="outlined"
														size="sm"
														className="focus:ring-0 border-none rounded-full p-3"
													>
														<BiSolidEdit className="w-5 h-5 text-textPrimary dark:text-white" />
													</Button>
												</Link>

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
			)}
		</div>
	);
};

export default EventManage;
