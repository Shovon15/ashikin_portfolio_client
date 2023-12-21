/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import { Button } from "@material-tailwind/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvitationPdfMaker from "../../../helper/InvitationPdfMaker";
import { BsFiletypePdf } from "react-icons/bs";

const InvitationDetails = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await get(`invitation/${id}`);
			setData(response.data.payload.invitations);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const { name, organizationName, phone, location, audienceNumber, eventText } = data || {
		name: "",
		organizationName: "",
		phone: "",
		location: "",
		audienceNumber: "",
		eventText: "",
	};

	// console.log(data);

	const TABLE_HEAD = ["Name", "Organization Name", "Phone", "Location", "Number of Audience", "about event", "pdf"];
	const displayProperties = ["name", "organizationName", "phone", "location", "audienceNumber", "eventText"];

	if (isLoading) {
		<LoadingSpinner />;
	}
	return (
		<div>
			<GoBackButton />

			<HeaderText className="py-5">Invitation Details</HeaderText>
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
					<tbody style={{ minHeight: "500px" }} className="dark:bg-darkPrimary border border-gray-500 ">
						{!isLoading && (
							<tr className="even:bg-gray-200 dark:even:bg-gray-800 text-center dark:bg-gray-500">
								<td className="p-2">
									<p className="font-semibold">{name}</p>
								</td>

								<td className="p-2 ">
									<p className="font-semibold">{organizationName}</p>
								</td>
								<td className="p-2 ">
									<p className="font-semibold">{phone}</p>
								</td>
								<td className="p-2 ">
									<p className="font-semibold">{location}</p>
								</td>
								<td className="p-2 ">
									<p className="font-semibold">{audienceNumber}</p>
								</td>
								<td className="p-2 ">
									<p className="font-semibold text-justify">{eventText}</p>
								</td>
								<td className="p-2 flex justify-center items-center">
									<PDFDownloadLink
										document={
											<InvitationPdfMaker
												data={{
													name,
													organizationName,
													phone,
													location,
													audienceNumber,
													eventText,
												}}
											/>
										}
										fileName={`${name}_invitation.pdf`}
										className=" px-3 py-2 hover:bg-blue-gray-50 rounded-full"
									>
										<BsFiletypePdf className="w-5 h-5" />
									</PDFDownloadLink>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default InvitationDetails;
