import { Link } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import IconButton from "../../../components/Button/IconButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useState } from "react";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { del, get, put } from "../../../utils/fetchApi";
import { Button, Typography } from "@material-tailwind/react";
import { BiSolidEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const SocialManage = () => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deletingSocialData, setDeletingSocialData] = useState(null);

	const {
		data: socialData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["socialData"],
		queryFn: async () => {
			const res = await get("social/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	const handleCloseDeleteModal = () => {
		setDeletingSocialData(null);
		setIsDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id, title }) => {
		try {
			const response = await del(`social/delete-social/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting social link:", error);
			showErrorToast(`Error deleting social link with Title: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const handlePublished = async ({ id, isPublished }) => {
		try {
			const updatedIsPublished = !isPublished;
			await put(`social/update-social/${id}`, { isPublished: updatedIsPublished });
			refetch();
			showSuccessToast(updatedIsPublished ? "Published" : "Unpublished");
		} catch (error) {
			showErrorToast(error.response?.data?.message);
		}
	};

	const TABLE_HEAD = ["No.", "Social Name", "Logo", "Description", "social Link", "status", "Action"];
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Manage Social</HeaderText>
			<div className="flex justify-end py-5">
				<Link to="create-social">
					<IconButton>Add social link</IconButton>
				</Link>
			</div>

			{socialData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-text">
						You have not created any social link yet.
						<br />
						Please add an social link to get started!
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
							<tbody className="text-color-text">
								{!isLoading &&
									socialData.length !== 0 &&
									socialData.map(
										({ _id, name, description, socialLink, isPublished, logo }, index) => (
											<tr key={_id} className="even:bg-color-secondary text-center">
												<td className="p-2 ">
													<p className="font-bold">{String(index + 1) + "."}</p>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{name}</p>
												</td>
												<td className="p-2 center">
													<img
														src={logo}
														alt="card-image"
														className=" object-contain h-full"
														width="50"
														height="50"
													/>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{description}</p>
												</td>
												<td className="p-2 ">
													<p className="font-bold">{socialLink}</p>
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
												<td className="p-2 flex gap-3 justify-center items-center ">
													<Link to={`update-social/${_id}`}>
														<Button
															variant="outlined"
															size="sm"
															className="focus:ring-0 border-none rounded-full p-3"
														>
															<BiSolidEdit className="w-5 h-5 text-color-text dark:text-white" />
														</Button>
													</Link>

													<Button
														variant="text"
														className="focus:ring-0  border-none rounded-full p-3"
														onClick={() => {
															setIsDeleteModalOpen(true);
															setDeletingSocialData({ _id, title: name });
														}}
													>
														<FaTrashAlt className="w-5 h-5 text-red-500" />
													</Button>
												</td>
											</tr>
										)
									)}
							</tbody>
						</table>
					</div>
					<ConfirmationModal
						message={`Warning: Deleting this Social link data is permanent and cannot be undone.`}
						isOpen={isDeleteModalOpen}
						onClose={handleCloseDeleteModal}
						content={deletingSocialData}
						successAction={handleDeleteEvent}
						setDeleteModalOpen={setIsDeleteModalOpen}
					/>
				</div>
			)}
		</div>
	);
};

export default SocialManage;
