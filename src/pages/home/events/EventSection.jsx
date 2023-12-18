import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import EventCard from "../../../components/card/admin/event/EventCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

import Aos from "aos";

import PrimaryButton from "../../../components/Button/PrimaryButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const EventSection = () => {
	const [events, setEvents] = useState([]);
	const [tabValue, setTabValue] = useState("all");
	const [activeTab, setActiveTab] = useState("all");

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

	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{eventData.length > 0 && (
				<div className="p-5 mx-auto max-w-[1300px]">
					<HeaderText className="py-5">Upcoming Events</HeaderText>
					<div className="">
						<Tabs id="custom-animation" value="all">
							<TabsHeader
								className="w-full md:w-[40rem]  mx-auto flex gap-2 flex-col md:flex-row
						  bg-inherit items-center mb-5 py-3 px-5"
								data-aos="fade-up"
								indicatorProps={{
									className: "shadow-none bg-transparent",
								}}
							>
								{tabButtondata.map(({ label, value }) => (
									<Tab
										key={value}
										value={value}
										onClick={() => {
											setTabValue(value);
											setActiveTab(value);
										}}
										className={
											activeTab === value
												? "text-white bg-gradient-to-r from-cyan-500 to-blue-700 py-2.5 rounded-lg capitalize text-lg"
												: "text-textSecondary hover:ring-1 hover:ring-blue-600 py-2 rounded-lg capitalize text-lg px-2"
										}
									>
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
								// data-aos="flip-left"
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
								<PrimaryButton className="px-10 mt-5">View More</PrimaryButton>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EventSection;
