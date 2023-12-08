import { Button, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import EventCard from "../../../components/card/EventCard";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const EventSection = () => {
	const [events, setEvents] = useState([]);
	const [tabValue, setTabValue] = useState("all");
	const [isLoading, setIsLoading] = useState(true);
	const { receiveEvent, fetchEventData } = useContext(DataContext);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await fetchEventData();
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const tabButtondata = [
		{
			label: "All Events",
			value: "all",
		},
		{
			label: "Free Events",
			value: "free",
		},

		{
			label: "Premium Events",
			value: "premium",
		},
	];

	useEffect(() => {
		if (receiveEvent && receiveEvent.length > 0) {
			let filteredEvents;

			if (tabValue === "all") {
				const freeEvents = receiveEvent.filter((event) => event.eventType === "free").slice(0, 2);
				const premiumEvent = receiveEvent.find((event) => event.eventType === "premium");

				filteredEvents = [...freeEvents, premiumEvent];
			} else if (tabValue === "free") {
				filteredEvents = receiveEvent.filter((event) => event.eventType === "free");
			} else if (tabValue === "premium") {
				filteredEvents = receiveEvent.filter((event) => event.eventType === "premium");
			}

			setEvents(filteredEvents);
		}
	}, [tabValue, receiveEvent]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="">
			<div className=" mx-auto max-w-[1300px]">
				<Typography
					variant="h2"
					color="blue-gray"
					className="flex justify-center font-bold mb-3 text-3xl dark:text-darkTextPrimary"
				>
					Upcoming Events
				</Typography>

				<Tabs id="custom-animation" value="all">
					<TabsHeader
						className="w-full md:w-[26rem] md:max-w-96 mx-auto flex flex-col md:flex-row
						 dark:bg-blue-gray-200 dark:border dark:border-blue-500 mb-5"
						indicatorProps={{
							className: "bg-blue-500 shadow-md !text-white",
						}}
					>
						{tabButtondata.map(({ label, value }) => (
							<Tab key={value} value={value} onClick={() => setTabValue(value)}>
								{label}
							</Tab>
						))}
					</TabsHeader>
					<TabsBody
						animate={{
							initial: { y: 250 },
							mount: { y: 0 },
							unmount: { y: 250 },
						}}
					>
						<div className="flex flex-col md:flex-row flex-grow  gap-3 md:gap-5 justify-center p-1">
							{events.length > 0 &&
								events.map((event) => (
									<TabPanel key={event._id} value={tabValue} className="p-0">
										<EventCard data={event} />
									</TabPanel>
								))}
						</div>
					</TabsBody>
				</Tabs>
				<div className="text-center my-5">
					<Link to="/events">
						<Button variant="outlined" className="dark:text-darkTextPrimary dark:border-white">
							View all
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventSection;
