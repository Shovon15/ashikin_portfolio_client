/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ButtonOutline from "../../Button/ButtonOutline";

import { LazyLoadImage } from "react-lazy-load-image-component";

export function EventCard({ eventData }) {
	// console.log(eventData, "eventData");
	const { slug, title, cover, dateTime, eventType } = eventData || {
		title: "",
		cover: "",
		dateTime: "",
		eventType: "",
	};

	const dateAndTime = new Date(dateTime);

	const formattedDate = dateAndTime.toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	// Get time in the format: 12:00 PM
	const formattedTime = dateAndTime.toLocaleTimeString("en-US", {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
	});

	// if (!eventData) {
	// 	return <LoadingSkeleton />;
	// }

	return (
		<Card className="relative bg-[#274561] w-full h-auto max-w-[25rem]  mx-auto flex-grow hover:ring-1 hover:ring-color-buttonRing rounded-b-none animation-event-card">
			<div
				className={`absolute top-3 right-5 z-10 px-2 text-color-text text-lg rounded-md ${
					eventType === "free" ? "bg-green-900" : "bg-orange-700"
				}`}
			>
				{eventType}
			</div>
			<CardHeader floated={false} className="relative h-56 m-0 rounded-b-none shadow-none  bg-inherit">
				<div className="duration-300 hover:scale-110 rounded-b-none transition ease-in-out object-fill h-full">
					{/* <ImageComponent src={cover} /> */}
					<LazyLoadImage
						effect="blur"
						src={cover}
						alt="card-image"
						className="object-fill h-full rounded-t-xl "
						width="100%"
						height="100%"
					/>
				</div>
			</CardHeader>
			<CardBody className="flex flex-col items-center">
				<Typography
					variant="h5"
					className="mb-2 font-bold text-color-header h-14 overflow-y-auto my-auto text-center"
				>
					{title}
				</Typography>

				<div className="flex justify-center">
					<Typography variant="h6" className="text-color-text">
						{formattedDate}
					</Typography>
					<span className="px-2">|</span>
					<Typography variant="h6" className="text-color-text">
						{formattedTime}
					</Typography>
				</div>
			</CardBody>
			<CardFooter className="pt-0 mx-auto">
				{slug && (
					<Link to={`/program/${slug}`}>
						<ButtonOutline className="px-8">Details</ButtonOutline>
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}

export default EventCard;
