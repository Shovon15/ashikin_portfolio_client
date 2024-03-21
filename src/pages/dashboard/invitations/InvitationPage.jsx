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
import GoBackButton from "../../../components/Button/GoBackButton";

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
			const res = await get("invitation");
			let data = res.data.payload?.invitations;

			data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			return data;
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
			// console.error("Error deleting event:", error);
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
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Invitaitons</HeaderText>
			{invitationData.length === 0 ? (
				<div className="text-center py-8 px-5 lg:px-0">
					<p className="text-lg text-color-primary">
						You have not created any events yet.
						<br />
						Please add an event to get started!
					</p>
				</div>
			) : (
				<div className="mt-5">
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right">
							<thead className="uppercase">
								<tr>
									{TABLE_HEAD.map((head) => (
										<th key={head} className="border-b  border-color-border bg-color-secondary p-4">
											<p className="font-bold text-color-header opacity-70 text-center">{head}</p>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="text-color-primary">
								{!isLoading &&
									invitationData.length > 0 &&
									invitationData.map(({ _id, name, phone, organizationName, location }, index) => (
										<tr key={_id} className="even:bg-color-secondary text-center">
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
														className=" hover:bg-color-secondary shadow-xl capitalize text-md px-3 rounded-full"
													>
														<VscScreenFull className="w-5 h-5 text-color-primary" />
													</Button>
												</Link>
												<Button
													variant="text"
													className="focus:ring-0  border-none rounded-full p-3"
													onClick={() => {
														setDeleteModalOpen(true);
														setDeletingEventData({ _id, title: name });
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
						message={`Warning: Deleting this invitation is permanent and cannot be undone.`}
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
