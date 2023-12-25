import { Link } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import { useQuery } from "@tanstack/react-query";
import { del, get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Typography } from "@material-tailwind/react";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const ReviewManage = () => {
	// ----------Delete Modal------------
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingReviewData, setDeletingReviewData] = useState(null);
	const {
		data: reviewData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["reviewData"],
		queryFn: async () => {
			const res = await get("reviews/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	const handleCloseDeleteModal = () => {
		setDeletingReviewData(null);
		setDeleteModalOpen(false);
	};

	// console.log(reviewData);

	const handleDeleteReview = async ({ _id, title }) => {
		try {
			const response = await del(`reviews/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting review:", error);
			showErrorToast(`Error deleting review with name: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const TABLE_HEAD = ["No.", "Name", "Designation", "Image", "comment", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Review Manage</HeaderText>
			<div className="flex justify-center md:justify-end py-5 md:py-10">
				<Link to="write-review">
					<IconButton>New review</IconButton>
				</Link>
			</div>
			{reviewData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-text">
						You have not created any review yet.
						<br />
						Please add review to get started!
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
									reviewData.length !== 0 &&
									reviewData.map(({ _id, name, designation, cover, reviewText }, index) => (
										<tr key={_id} className="even:bg-color-secondary text-center">
											<td className="p-2 ">
												<p className="font-bold">{String(index + 1) + "."}</p>
											</td>
											<td className="p-2 ">
												<p className="font-bold">{name}</p>
											</td>
											<td className="p-2 ">
												<p className="font-bold">{designation}</p>
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
												<p className="font-bold">{reviewText}</p>
											</td>

											<td className="p-2 flex gap-3 justify-center items-center ">
												<Link to={`update-review/${_id}`}>
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
														setDeleteModalOpen(true);
														setDeletingReviewData({ _id, title: name });
													}}
												>
													<FaTrashAlt className="w-5 h-5 text-red-500" />
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>

					<ConfirmationModal
						message={`Warning: Deleting this review is permanent and cannot be undone.`}
						isOpen={isDeleteModalOpen}
						onClose={handleCloseDeleteModal}
						content={deletingReviewData}
						successAction={handleDeleteReview}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				</div>
			)}
		</div>
	);
};

export default ReviewManage;
