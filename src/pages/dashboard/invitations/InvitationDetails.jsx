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

	const TABLE_HEAD = ["Name", "Organization", "Phone", "Location", "Number of Audience", "about event"];
	const displayProperties = ["name", "organizationName", "phone", "location", "audienceNumber", "eventText"];

	if (isLoading) {
		<LoadingSpinner />;
	}
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText className="py-5">Invitation Details</HeaderText>
			<div className="flex justify-center md:justify-end pr-0 md:pr-10 py-5">
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
					className=" px-6 py-2 border border-color-border hover:bg-color-button text-color-text"
				>
					<BsFiletypePdf className="w-5 h-5" />
				</PDFDownloadLink>
			</div>
			<div className="pb-10">
				<div className="border border-color-border flex">
					<div className="w-2/5">
						{TABLE_HEAD.map((head) => (
							<div
								key={head}
								className="border-b border-r last:border-none border-color-border bg-color-secondary p-4"
							>
								<p className="font-bold text-color-header text-center">{head}</p>
							</div>
						))}
					</div>
					<div className="w-3/5">
						<p className="border-b border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{name}
						</p>
						<p className="border-b border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{organizationName}
						</p>
						<p className="border-b border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{phone}
						</p>
						<p className="border-b border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{location}
						</p>
						<p className="border-b border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{audienceNumber}
						</p>
						<p className="border-l border-color-border bg-color-secondary p-4 font-bold text-color-text ">
							{eventText}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvitationDetails;
