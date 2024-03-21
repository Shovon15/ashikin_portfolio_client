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

const ContactUsManager = () => {
	// -------view Modal------------------
	const [isViewModalOpen, setViewModalOpen] = useState(false);
	const [viewPressData, setViewPressData] = useState(null);

	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingData, setDeletingData] = useState(null);

	const {
		data: contactData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["contactData"],
		queryFn: async () => {
			const res = await get("contact/all");
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
			const response = await del(`contact/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting social support:", error);
			showErrorToast(`Error deleting social support with Title: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handlePublished = async ({ _id, isPublished }) => {
		try {
			const updatedIsPublished = !isPublished;

			await put(`contact/${_id}`, { isPublished: updatedIsPublished });

			refetch();
			showSuccessToast(updatedIsPublished ? "Published" : "UnPublished");
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		}
	};

	const TABLE_HEAD = ["No.", "Title", "Description", "Cover", "status", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Contact Manage</HeaderText>

			{contactData.length > 0 ? (
				<>
					<div className="flex justify-center md:justify-end py-3">
						<Link to="/dashboard/contact/create-contact">
							<IconButton>Create Contact</IconButton>
						</Link>
					</div>
					<div>
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right">
								<thead className="uppercase">
									<tr>
										{TABLE_HEAD.map((head) => (
											<th
												key={head}
												className="border-b  border-color-border bg-color-secondary p-4"
											>
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
										contactData.map(({ _id, title, description, isPublished, image }, index) => (
											<tr key={_id} className="even:bg-color-secondary text-center">
												<td className="p-2">
													<p className="font-bold">{String(index + 1) + "."}</p>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{title}</p>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{description}</p>
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
													<div className="flex justify-center items-center">
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
													</div>
												</td>
												<td className="p-2">
													<div className="flex gap-3 justify-center items-center">
														<Button
															variant="outlined"
															// size="sm"
															onClick={() => {
																setViewModalOpen(true);
																setViewPressData({
																	title,
																	content: description,
																	cover: image,
																});
															}}
															className="focus:ring-0 border-none rounded-full p-3 text-color-primary"
														>
															<VscScreenFull className="w-5 h-5 " />
														</Button>
														<Link to={`update-contact/${_id}`}>
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
																setDeletingData({ _id, title });
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
							message={`Warning: Deleting this Contact data is permanent and cannot be undone.`}
							isOpen={isDeleteModalOpen}
							onClose={handleCloseDeleteModal}
							content={deletingData}
							successAction={handleDelete}
							setDeleteModalOpen={setDeleteModalOpen}
						/>
					</div>
				</>
			) : (
				<div className="flex flex-col gap-3 justify-center items-center min-h-screen">
					<p className="text-xl text-color-primary">No content found please create contact data to start</p>
					<Link to="/dashboard/contact/create-contact">
						<IconButton>Create Contact</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default ContactUsManager;
