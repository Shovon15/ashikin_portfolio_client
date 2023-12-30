/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { del, get } from "../../../utils/fetchApi";
import { BsFiletypePdf } from "react-icons/bs";

import { Button, Typography } from "@material-tailwind/react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useQuery } from "@tanstack/react-query";
import ConfirmationModal from "../../../helper/ConfirmationModal";
import { FaTrashAlt } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../helper/ToastMessage";
import GoBackButton from "../../../components/Button/GoBackButton";
import PDFMaker from "../../../helper/PDFMaker";
import { PDFDownloadLink } from "@react-pdf/renderer";

const RegisteredEvent = () => {
	const [eventData, setEventData] = useState({});

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingRegisteredData, setDeletingRegisteredData] = useState(null);

	const { slug } = useParams();

	const {
		data: registerData = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["registerData"],
		queryFn: async () => {
			const res = await get(`events/register-event/${slug}`);
			let data = res.data.payload?.registeredEvent;
			setEventData(res.data.payload.eventData[0]);

			return data;
		},
	});

	const { register, eventType, title } = eventData;

	const TABLE_HEAD = ["No.", "Name", "Whatsapp", "Phone", "Email", "institute", "Account Number", "action"];

	const handleCloseDeleteModal = () => {
		setDeletingRegisteredData(null);
		setDeleteModalOpen(false);
	};

	const handleDeleteEvent = async ({ _id, title }) => {
		try {
			const response = await del(`/events/registered-event/${_id}/${slug}`);
			refetch();
			showSuccessToast(response.data.message);
		} catch (error) {
			console.error("Error deleting event:", error);
			showErrorToast(`Error deleting event of: ${title}`);
		} finally {
			handleCloseDeleteModal();
		}
	};

	return (
		<div>
			<GoBackButton />
			<div className="flex flex-col md:flex-row md:justify-between md:px-5">
				<HeaderText className="text-start py-2">{title}</HeaderText>
				<div>
					<Typography className="font-semibold text-color-text">
						Total registration: <span className="font-bold text-xl text-color-header">{register}</span>{" "}
					</Typography>
					<Typography className="pb-5 font-semibold text-color-text">
						<span className="text-color-header font-bold capitalize">{eventType}</span> Event
					</Typography>
				</div>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right ">
					<thead className="text-xs text-color-text uppercase">
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
							registerData.length !== 0 &&
							registerData.map(
								(
									{ _id, firstName, lastName, whatsapp, phone, email, instituteName, accountNumber },
									index
								) => (
									<tr key={_id} className="even:bg-color-primary text-center">
										<td className="p-2 w-5">
											<Typography className="font-bold ">{String(index + 1) + "."}</Typography>
										</td>
										<td className="p-2 ">
											<Typography className="font-bold">{`${firstName} ${lastName}`}</Typography>
										</td>

										<td className="p-2 ">
											<Typography className="font-semibold">{whatsapp}</Typography>
										</td>
										<td className="p-2">
											<Typography className="font-semibold">{phone}</Typography>
										</td>
										<td className="p-2">
											<Typography className="font-bold">{email}</Typography>
										</td>
										<td className="p-2">
											<Typography className="font-bold">{instituteName}</Typography>
										</td>
										<td className="p-2">
											<Typography className="font-bold">{accountNumber}</Typography>
										</td>
										<td className="p-2 flex gap-2">
											<PDFDownloadLink
												document={
													<PDFMaker
														data={{
															title,
															eventType,
															firstName,
															lastName,
															whatsapp,
															phone,
															email,
															instituteName,
															accountNumber,
														}}
													/>
												}
												fileName={`${firstName}_${title}_register.pdf`}
												className=" px-3 py-2 bg-color-secondary rounded-full"
											>
												<BsFiletypePdf className="w-5 h-5" />
											</PDFDownloadLink>

											<Button
												variant="text"
												className="focus:ring-0  border-none rounded-full p-3"
												onClick={() => {
													setDeleteModalOpen(true);
													setDeletingRegisteredData({
														_id,
														title: `${firstName} ${lastName}`,
													});
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
				<ConfirmationModal
					message={`Warning: Deleting this Registered information is Permanent and Cannot be Undone.`}
					isOpen={isDeleteModalOpen}
					onClose={handleCloseDeleteModal}
					content={deletingRegisteredData}
					successAction={handleDeleteEvent}
					setDeleteModalOpen={setDeleteModalOpen}
				/>
			</div>

			<div></div>
		</div>
	);
};

export default RegisteredEvent;
