// import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

import EventCard from "../../../components/card/event/EventCard";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const EventSection = () => {
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [tabValue, setTabValue] = useState("all");
	const [activeTab, setActiveTab] = useState("all");

	const { data: eventData = [], isLoading } = useQuery({
		queryKey: ["eventData"],
		queryFn: async () => {
			const res = await get("events/published");
			let data = await res.data.payload?.data;
			return data;
		},
	});

	const tabButtondata = [
		{
			label: "All Programs",
			value: "all",
		},
		{
			label: "Free Programs",
			value: "free",
		},

		{
			label: "Premium Programs",
			value: "premium",
		},
	];

	useEffect(() => {
		if (eventData && eventData.length > 0) {
			let filteredEvents;

			if (tabValue === "all") {
				const freeEvents = eventData.filter((event) => event.eventType === "free");
				// Check if there are more than 2 free events
				if (freeEvents.length > 2) {
					// Slice the array to include only the first 2 elements
					filteredEvents = [...freeEvents.slice(0, 2)];

					// Find the premium event
					const premiumEvent = eventData.find((event) => event.eventType === "premium");

					// Include the premium event in the filteredEvents array
					if (premiumEvent) {
						filteredEvents.push(premiumEvent);
					}
				} else {
					// Include all free events and the premium event (if any)
					filteredEvents = [...freeEvents];

					const premiumEvent = eventData.find((event) => event.eventType === "premium");
					if (premiumEvent) {
						filteredEvents.push(premiumEvent);
					}
				}
			} else if (tabValue === "free") {
				filteredEvents = eventData.filter((event) => event.eventType === "free");
			} else if (tabValue === "premium") {
				filteredEvents = eventData.filter((event) => event.eventType === "premium");
			}

			setFilteredEvents(filteredEvents);
		}
	}, [tabValue, eventData]);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	return (
		<>
			<HeaderText className="py-5">Upcoming Programs</HeaderText>
			{eventData.length > 0 && (
				<div className="px-5 md:px-10 pb-5">
					<div>
						<div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center">
							{/* Render tab headers dynamically */}
							{tabButtondata.map(({ label, value }) => (
								<div
									key={value}
									onClick={() => {
										setTabValue(value);
										setActiveTab(value);
									}}
									className={` border border-color-border w-56 center px-3 py-2 cursor-pointer animation-button ${
										activeTab === value
											? "text-color-text bg-color-button hover:bg-color-buttonHover py-2  capitalize text-lg"
											: "text-color-text hover:ring-1 hover:ring-color-buttonRing py-2  capitalize text-lg px-2"
									}`}
								>
									{label}
								</div>
							))}
						</div>
						<div className="py-5">
							{/* Render tab content based on the active tab */}
							{activeTab && (
								<div className="flex flex-col md:flex-row flex-grow gap-5 justify-center p-1">
									{!isLoading && filteredEvents.length > 0 ? (
										filteredEvents.map((event, index) => (
											<div key={index} value={tabValue} className="p-0">
												<EventCard eventData={event} />
											</div>
										))
									) : (
										<div className="w-full h-44 max-w-[25rem]  flex justify-center items-center">
											<p className="font-semibold text-xl text-color-text">Coming soon</p>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
					<div className="text-center py-5">
						<Link to="/programs">
							<PrimaryButton className="px-10">View More</PrimaryButton>
						</Link>
					</div>
				</div>
				// <div className="p-5 ">
				// 	<HeaderText className="py-5">Upcoming Programs</HeaderText>
				// 	<div className="">
				// 		<Tabs id="custom-animation" value="all">
				// 			<TabsHeader
				// 				className="w-full md:w-[40rem]  mx-auto flex gap-2 flex-col md:flex-row
				// 		  bg-inherit items-center mb-5 py-3 px-5 animation-body"
				// 				// data-aos="zoom-in"
				// 				indicatorProps={{
				// 					className: "shadow-none bg-transparent",
				// 				}}
				// 			>
				// 				{tabButtondata.map(({ label, value }) => (
				// 					<Tab
				// 						key={value}
				// 						value={value}
				// 						onClick={() => {
				// 							setTabValue(value);
				// 							setActiveTab(value);
				// 						}}
				// 						className={
				// 							activeTab === value
				// 								? "text-color-text bg-color-button hover:bg-color-buttonHover py-2.5  capitalize text-lg"
				// 								: "text-color-text hover:ring-1 hover:ring-color-buttonRing py-2  capitalize text-lg px-2"
				// 						}
				// 					>
				// 						{label}
				// 					</Tab>
				// 				))}
				// 			</TabsHeader>
				// 			<TabsBody
				// 				animate={{
				// 					initial: { y: 250 },
				// 					mount: { y: 0 },
				// 					unmount: { y: 250 },
				// 				}}
				// 			>
				// 				<div className="flex flex-col md:flex-row flex-grow  gap-3 md:gap-5 justify-center p-1">
				// 					{!isLoading && filteredEvents.length > 0 ? (
				// 						filteredEvents.map((event, index) => (
				// 							<TabPanel key={index} value={tabValue} className="p-0">
				// 								<EventCard eventData={event} />
				// 							</TabPanel>
				// 						))
				// 					) : (
				// 						<div className="w-full h-44 max-w-[25rem]  flex justify-center items-center">
				// 							<p className="font-semibold text-xl text-color-text">Coming soon</p>
				// 						</div>
				// 					)}
				// 				</div>
				// 			</TabsBody>
				// 		</Tabs>
				// 		<div
				// 			className="text-center my-5"
				// 			//  data-aos="fade-up" data-aos-anchor-placement="top-bottom"
				// 		>
				// 			<Link to="/programs">
				// 				<PrimaryButton className="px-10 mt-5">View More</PrimaryButton>
				// 			</Link>
				// 		</div>
				// 	</div>
				// </div>
			)}
		</>
	);
};

export default EventSection;
