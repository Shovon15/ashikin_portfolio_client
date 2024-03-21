import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { del, get, put } from "../../../utils/fetchApi";
import IconButton from "../../../components/Button/IconButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const ServicesManage = () => {
	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingEventData, setDeletingEventData] = useState(null);

	const {
		data: serviceData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["serviceData"],
		queryFn: async () => {
			const res = await get("services/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	const handleCloseDeleteModal = () => {
		setDeletingEventData(null);
		setDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id, title }) => {
		try {
			const response = await del(`services/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting service:", error);
			showErrorToast(`Error deleting service with Title: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handlePublished = async ({ id, isPublished }) => {
		try {
			const updatedIsPublished = !isPublished;

			await put(`services/update-service/${id}`, { isPublished: updatedIsPublished });

			refetch();
			showSuccessToast(updatedIsPublished ? "Published" : "Unpublished");
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		}
	};

	// console.log(serviceData, "serviceData");
	const TABLE_HEAD = ["No.", "Heading", "Title", "Cover", "status", "Action"];
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Manage Services</HeaderText>
			<div className="flex justify-end py-5">
				<Link to="write-service">
					<IconButton>Add service</IconButton>
				</Link>
			</div>

			{serviceData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-primary">
						You have not created any service yet.
						<br />
						Please add an service to get started!
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
									serviceData.length !== 0 &&
									serviceData.map(({ _id, heading, title, cover, isPublished }, index) => (
										<tr key={_id} className="even:bg-color-secondary text-center">
											<td className="p-2 ">
												<p className="font-bold">{String(index + 1) + "."}</p>
											</td>
											<td className="p-2 ">
												<p className="font-bold">{heading}</p>
											</td>
											<td className="p-2 ">
												<p className="font-bold">{title}</p>
											</td>
											<td className="p-2 center">
												<img
													src={cover}
													alt="card-image"
													className=" object-contain h-full"
													width="100"
													height="60"
												/>
											</td>

											<td className="p-2 ">
												<p>
													<Button
														onClick={() =>
															handlePublished({
																id: _id,
																isPublished,
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
													<Link to={`update-service/${_id}`}>
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
															setDeletingEventData({ _id, title: heading });
														}}
													>
														<FaTrashAlt className="w-5 h-5 text-red-500" />
													</Button>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>

					<ConfirmationModal
						message={`Warning: Deleting this service is permanent and cannot be undone.`}
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

export default ServicesManage;
