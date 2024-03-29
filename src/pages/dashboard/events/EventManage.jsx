/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import ViewModal from "../../../helper/ViewModal";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { del, get, put } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";
import { BiSolidEdit } from "react-icons/bi";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import IconButton from "../../../components/Button/IconButton";
import GoBackButton from "../../../components/Button/GoBackButton";

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
			const res = await get("events/all");
			let data = res.data.payload.data;
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

	const handleDeleteEvent = async ({ slug, title }) => {
		try {
			const response = await del(`events/${slug}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting event:", error);
			showErrorToast(`Error deleting event with Title: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handlePublished = async ({ slug, isPublished, eventType }) => {
		try {
			const updatedIsPublished = !isPublished;

			await put(`events/${slug}`, { isPublished: updatedIsPublished, eventType });

			refetch();
			showSuccessToast(updatedIsPublished ? "Published" : "Unpublished");
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		}
	};

	const TABLE_HEAD = ["No.", "Title", "Cover", "Schedule", "Register", "Type", "status", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen pb-10">
			<div>
				<GoBackButton />
			</div>
			<HeaderText className="pb-5">Manage Events</HeaderText>
			<div className="flex flex-col-reverse gap-5 md:flex-row md:gap-0 justify-between items-center pb-5 ">
				<div className="flex gap-2 items-center">
					<p className="text-color-primary">Sort by created time order:</p>
					<Button
						onClick={() => setSortOrder(!sortOrder)}
						className="px-5 py-1 bg-color-button active:bg-color-button hover:bg-color-buttonHover "
					>
						{sortOrder ? (
							<TbSortAscendingNumbers className="w-7 h-7" />
						) : (
							<TbSortDescendingNumbers className="w-7 h-7" />
						)}
					</Button>
				</div>
				<Link to="write-program">
					<IconButton>New Program</IconButton>
				</Link>
			</div>
			{eventData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-primary">
						You have not created any program yet.
						<br />
						Please add program to get started!
					</p>
				</div>
			) : (
				<div>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right">
							<thead className="uppercase">
								<tr>
									{TABLE_HEAD.map((head) => (
										<th key={head} className="border-b  border-color-border bg-color-secondary p-4">
											<Typography
												variant="small"
												className="font-bold text-color-header opacity-70 text-center"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="text-color-primary">
								{!isLoading &&
									eventData.length !== 0 &&
									eventData.map(
										(
											{ slug, title, cover, eventType, register, content, isPublished, dateTime },
											index
										) => (
											<tr key={slug} className="even:bg-color-secondary text-center">
												<td className="p-2">
													<p className="font-bold">{String(index + 1) + "."}</p>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{title}</p>
												</td>
												<td className="p-2">
													<img
														src={cover}
														alt="card-image"
														className=" object-contain h-full"
														width="100"
														height="60"
													/>
												</td>
												<td className="p-2 ">
													<p className="font-bold">
														{new Date(dateTime).toLocaleString("en-US", {
															weekday: "short",
															year: "numeric",
															month: "short",
															day: "numeric",
															hour: "numeric",
															minute: "numeric",
														})}
													</p>
												</td>
												<td className="p-2 ">
													<div>
														{register === 0 ? (
															<p>0</p>
														) : (
															<Link to={`/dashboard/programs/${slug}`}>
																<Button className="capitalize p-2  bg-color-button hover:bg-color-buttonHover text-color-primary">
																	{register} Registered
																</Button>
															</Link>
														)}
													</div>
												</td>
												<td className="p-2 ">
													<p
														className={`${
															eventType === "free" ? "text-green-500" : "text-blue-800"
														} font-bold`}
													>
														{String(eventType)?.charAt(0).toUpperCase() +
															String(eventType)?.slice(1)}
													</p>
												</td>
												<td className="p-2 ">
													<p>
														<Button
															onClick={() =>
																handlePublished({
																	slug,
																	isPublished,
																	eventType,
																})
															}
															className={`capitalize text-sm text-white py-1 px-2 ${
																isPublished ? "bg-green-500" : "bg-red-300"
															}`}
														>
															{isPublished ? "published" : "unpublished"}
														</Button>
													</p>
												</td>
												<td className="p-2">
													<div className="flex gap-3 justify-center items-center">
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
															className="focus:ring-0 border-none rounded-full p-3 text-color-primary"
														>
															<VscScreenFull className="w-5 h-5 " />
														</Button>
														<Link to={`update-program/${slug}`}>
															<Button
																variant="outlined"
																size="sm"
																className="focus:ring-0 border-none rounded-full p-3"
															>
																<BiSolidEdit className="w-5 h-5 text-color-primary dark:text-white" />
															</Button>
														</Link>

														<Button
															variant="text"
															className="focus:ring-0  border-none rounded-full p-3"
															onClick={() => {
																setDeleteModalOpen(true);
																setDeletingEventData({ slug, title });
															}}
														>
															<FaTrashAlt className="w-5 h-5 text-red-500" />
														</Button>
													</div>
												</td>
											</tr>
										)
									)}
							</tbody>
						</table>
					</div>

					<ViewModal
						isOpen={isViewModalOpen}
						onClose={handleCloseViewModal}
						content={viewEventData}
						setViewModalOpen={setViewModalOpen}
					/>
					<ConfirmationModal
						message={`Warning: Deleting this program is permanent and cannot be undone. Also, all registered data for this program will be deleted.`}
						isOpen={isDeleteModalOpen}
						onClose={handleCloseDeleteModal}
						content={deletingEventData}
						successAction={handleDeleteEvent}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				</div>
			)}
		</div>
	);
};

export default EventManage;
