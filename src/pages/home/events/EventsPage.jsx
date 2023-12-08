import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { Typography } from "@material-tailwind/react";
import EventCard from "../../../components/card/EventCard";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const EventsPage = () => {
	const { receiveEvent, fetchEventData } = useContext(DataContext);
	console.log(receiveEvent);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await fetchEventData();
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="p-5 md:p-10">
			<Typography variant="h2" className="text-center">
				Events
			</Typography>

			<div className="flex flex-wrap flex-grow gap-4">
				{!isLoading &&
					receiveEvent.length !== 0 &&
					receiveEvent.map((event) => <EventCard key={event._id} data={event} />)}
			</div>
		</div>
	);
};

export default EventsPage;
