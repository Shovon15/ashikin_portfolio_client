import { get } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import EventCard from "../../../components/card/event/EventCard";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";
import PageHelmet from "../../../helper/PageHelmet";

import React from "react";
import Pagination from "../../../components/pagination";

const EventsPage = () => {
	const [pageNumber, setPageNumber] = React.useState(1);
	const [pageData, setPageData] = React.useState({});

	console.log(pageNumber, "number");

	const { data: eventData = [], isLoading } = useQuery({
		queryKey: ["eventData", pageNumber],
		queryFn: async () => {
			const res = await get(`events/published?page=${pageNumber}`);
			const data = await res?.data?.payload;
			const eventData = data?.data;
			setPageData(data?.pagination);

			return eventData;
		},
	});

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const Loader = () => {
		return (
			<div className="flex flex-wrap gap-5 p-5 md:p-10">
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</div>

		)
	}
	return (
		<>
			<PageHelmet
				title="Ashikin Alam | programs"
				description="Embark on an inspiring journey with seminars, events, and motivational lectures. Elevate experiences, empower teams, ignite positive change."
				link={shareUrl}
				type="webapp"
			/>

			<div className="page-container">
				<HeaderText className="pl-5 md:pl-10 text-start text-4xl md:text-5xl">Programs</HeaderText>

				{
					isLoading ? (<Loader/>) :
						(
							<div className="flex flex-wrap flex-grow gap-4 p-5 md:p-10">
								{eventData.length !== 0 &&
									eventData.map((event) => <EventCard key={event._id} eventData={event} />)}
							</div>
						)
				}
				<Pagination paginationData={pageData} setPageNumber={setPageNumber} />

			</div>
		</>
	);
};

export default EventsPage;
