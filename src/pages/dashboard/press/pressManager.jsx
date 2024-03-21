import { Link } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { del, get, put } from "../../../utils/fetchApi";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import ViewModal from "../../../helper/ViewModal";
import { Button, Typography } from "@material-tailwind/react";

import { FaTrashAlt } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";
import { BiSolidEdit } from "react-icons/bi";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import { useState } from "react";

const PressManager = () => {
	// -------view Modal------------------
	const [isViewModalOpen, setViewModalOpen] = useState(false);
	const [viewPressData, setViewPressData] = useState(null);

	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingData, setDeletingData] = useState(null);

	const {
		data: pressData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["pressData"],
		queryFn: async () => {
			const res = await get("press/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	const handleCloseDeleteModal = () => {
		setDeletingData(null);
		setDeleteModalOpen(false);
	};

	const handleDelete = async ({ _id, title }) => {
		try {
			const response = await del(`press/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting event:", error);
			showErrorToast(`Error deleting event with Title: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handlePublished = async ({ _id, isPublished }) => {
		try {
			const updatedIsPublished = !isPublished;

			await put(`press/update-press/${_id}`, { isPublished: updatedIsPublished });

			refetch();
			showSuccessToast(updatedIsPublished ? "Published" : "UnPublished");
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		}
	};

	const TABLE_HEAD = ["No.", "Title", "Cover", "status", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Press Manage</HeaderText>
			<div className="flex justify-center md:justify-end py-3">
				<Link to="/dashboard/press/create-press">
					<IconButton>Create Press</IconButton>
				</Link>
			</div>
			{pressData.length > 0 ? (
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
									pressData.map(({ _id, heading, description, isPublished, image }, index) => (
										<tr key={_id} className="even:bg-color-secondary text-center">
											<td className="p-2">
												<p className="font-bold">{String(index + 1) + "."}</p>
											</td>
											<td className="p-2 ">
												<p className="font-bold">{heading}</p>
											</td>
											<td className="p-2">
												<img
													src={image}
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
																_id,
																isPublished,
															})
														}
														className={`capitalize text-sm text-white py-1 px-2 ${
															isPublished ? "bg-green-500" : "bg-red-300"
														}`}
													>
														{isPublished ? "published" : "unPublished"}
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
															setViewPressData({
																title: heading,
																content: description,
																cover: image,
															});
														}}
														className="focus:ring-0 border-none rounded-full p-3 text-color-primary"
													>
														<VscScreenFull className="w-5 h-5 " />
													</Button>
													<Link to={`update-press/${_id}`}>
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
															setDeletingData({ _id, title: heading });
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

					<ViewModal
						isOpen={isViewModalOpen}
						onClose={() => setViewModalOpen(false)}
						content={viewPressData}
						setViewModalOpen={setViewModalOpen}
					/>
					<ConfirmationModal
						message={`Warning: Deleting this press is permanent and cannot be undone.`}
						isOpen={isDeleteModalOpen}
						onClose={handleCloseDeleteModal}
						content={deletingData}
						successAction={handleDelete}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				</div>
			) : (
				<div className="flex flex-col gap-3 justify-center items-center min-h-80">
					<p className="text-xl text-color-primary">No content found please create press data</p>
					<Link to="/dashboard/press/create-press">
						<IconButton>Create Press</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default PressManager;
