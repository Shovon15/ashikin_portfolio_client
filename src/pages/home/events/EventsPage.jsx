import EventCard from "../../../components/card/EventCard";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { get } from "../../../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const EventsPage = () => {
	const {
		data: eventData = [],
		isLoading,
	} = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			const res = await get("events");
			const data = await res?.data?.payload?.data;

			return data;
		},
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="p-5 md:p-10">
			<HeaderText>Events</HeaderText>

			<div className="flex flex-wrap flex-grow gap-4">
				{!isLoading &&
					eventData.length !== 0 &&
					eventData.map((event) => <EventCard key={event._id} data={event} />)}
			</div>
		</div>
	);
};

export default EventsPage;