import { get } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import EventCard from "../../../components/card/event/EventCard";

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
		return <LoadingSpinner />;
	}
	return (
		<div className="max-w-[1560px] mx-auto pt-5 md:pt-10">
			<HeaderText className="pl-5 md:pl-10 text-start text-5xl">Events</HeaderText>

			<div className="flex flex-wrap flex-grow gap-4 p-5 md:p-10">
				{!isLoading &&
					eventData.length !== 0 &&
					eventData.map((event) => <EventCard key={event._id} eventData={event} />)}
			</div>
		</div>
	);
};

export default EventsPage;
