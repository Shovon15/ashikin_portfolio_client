import { useQuery } from "@tanstack/react-query";
import { del, get } from "../../../utils/fetchApi";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { Button } from "@material-tailwind/react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VscScreenFull } from "react-icons/vsc";
import { useState } from "react";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";

const InvitationPage = () => {
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingEventData, setDeletingEventData] = useState(null);

	const {
		data: invitationData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			try {
				const res = await get("invitation");
				let data = res.data.payload?.invitations;

				data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

				return data;
			} catch (error) {
				console.error("Error fetching invitation data:", error);
				throw error;
			}
		},
	});
	// console.log(invitationData);

	const handleCloseDeleteModal = () => {
		setDeletingEventData(null);
		setDeleteModalOpen(false);
	};
	const handleDeleteEvent = async ({ _id, name }) => {
		try {
			const response = await del(`invitation/${_id}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting event:", error);
			showErrorToast(`Error deleting ${name} Invitaiton`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	const TABLE_HEAD = ["No.", "Name", "Organization Name", "phone", "location", "Action"];

	if (isLoading) {
		return <LoadingSpinner />;
	}
	// console.log(isLoading);
	return (
		<div>
			<HeaderText>Invitaitons</HeaderText>
			{invitationData.length === 0 ? (
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
											<p className="font-bold text-white opacity-70 text-center">{head}</p>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="dark:bg-darkPrimary ">
								{!isLoading &&
									invitationData.length > 0 &&
									invitationData.map(({ _id, name, phone, organizationName, location }, index) => (
										<tr
											key={_id}
											className="even:bg-gray-200 dark:even:bg-gray-800 text-center dark:bg-gray-500"
										>
											<td className="p-2 w-5">
												<p className="font-bold ">{invitationData.length - index + "."}</p>
											</td>
											<td className="p-2">
												<p className="font-semibold">{name}</p>
											</td>

											<td className="p-2 w-32">
												<p className="font-semibold">{organizationName}</p>
											</td>
											<td className="p-2 w-24">
												<p className="font-semibold">{phone}</p>
											</td>
											<td className="p-2 w-32">
												<p className="font-semibold">{location}</p>
											</td>
											<td className="p-2 flex gap-3 justify-center items-center ">
												<Link to={`/dashboard/invitations/${_id}`}>
													<Button
														variant="text"
														className="bg-gray-200 hover:bg-gray-300 shadow-xl capitalize text-md"
													>
														<VscScreenFull className="w-5 h-5 " />
													</Button>
												</Link>
												<Button
													variant="text"
													className="focus:ring-0  border-none rounded-full p-3"
													onClick={() => {
														setDeleteModalOpen(true);
														setDeletingEventData({ _id, name });
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

export default InvitationPage;
