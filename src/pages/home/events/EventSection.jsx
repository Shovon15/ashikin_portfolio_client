import { Button, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import EventCard from "../../../components/card/EventCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const EventSection = () => {
	const [events, setEvents] = useState([]);
	const [tabValue, setTabValue] = useState("all");

	const { data: eventData = [], isLoading } = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			const res = await get("events");
			let data = await res?.data?.payload?.data;

			data = data.filter((item) => item.isPublished);

			return data;
		},
	});
	// console.log(eventData, "eventData");

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
		if (eventData && eventData.length > 0) {
			let filteredEvents;

			if (tabValue === "all") {
				const freeEvents = eventData.filter((event) => event.eventType === "free").slice(0, 2);
				const premiumEvent = eventData.find((event) => event.eventType === "premium");

				filteredEvents = [...freeEvents, premiumEvent];
			} else if (tabValue === "free") {
				filteredEvents = eventData.filter((event) => event.eventType === "free");
			} else if (tabValue === "premium") {
				filteredEvents = eventData.filter((event) => event.eventType === "premium");
			}

			setEvents(filteredEvents);
		}
	}, [tabValue, eventData]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="p-0 lg:p-5">
			<div className=" mx-auto max-w-[1300px]">
				<HeaderText>Upcoming Events</HeaderText>

				<Tabs id="custom-animation" value="all">
					<TabsHeader
						className="w-full md:w-[26rem] md:max-w-96 mx-auto  flex flex-col md:flex-row
						  bg-[#0F172A] dark:border dark:border-blue-500 mb-5"
						indicatorProps={{
							className: "bg-buttonPrimary  shadow-md ",
						}}
					>
						{tabButtondata.map(({ label, value }) => (
							<Tab key={value} value={value} onClick={() => setTabValue(value)} className="text-white">
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
						<Button variant="outlined" className=" border-borderPrimary text-textPrimary px-12">
							View More
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventSection;
