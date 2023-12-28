import { get } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import EventCard from "../../../components/card/event/EventCard";
import { Helmet } from "react-helmet-async";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";

const EventsPage = () => {
	const { data: eventData = [], isLoading } = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			const res = await get("events/all");
			const data = await res?.data?.payload?.data;

			return data;
		},
	});

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-5 p-5 md:p-10">
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</div>
		);
	}
	return (
		<>
			<Helmet>
				<title>Ashikin Alam | Programs</title>
				<meta name="description" content="Ashikin Alam personal portfolio event page" />
				<link rel="canonical" href="/programs" />
			</Helmet>

			<div className="max-w-[1560px] mx-auto pt-5 md:pt-10">
				<HeaderText className="pl-5 md:pl-10 text-start text-5xl">Programs</HeaderText>

				<div className="flex flex-wrap flex-grow gap-4 p-5 md:p-10">
					{eventData.length !== 0 &&
						eventData.map((event) => <EventCard key={event._id} eventData={event} />)}
				</div>
			</div>
		</>
	);
};

export default EventsPage;
