/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";
import { Button } from "@material-tailwind/react";

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

	const TABLE_HEAD = ["Name", "Organization Name", "Phone", "Location", "Number of Audience", "about event "];
	const displayProperties = ["name", "organizationName", "phone", "location", "audienceNumber", "eventText"];

	if (isLoading) {
		<LoadingSpinner />;
	}
	return (
		<div>
			<GoBackButton />
			<div className="flex justify-end pr-10">
				<Button className="bg-gradient-to-r from-cyan-500 to-blue-700 ">Print</Button>
			</div>
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
								<td className="p-2 w-96">
									<p className="font-semibold text-justify">{eventText}</p>
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
