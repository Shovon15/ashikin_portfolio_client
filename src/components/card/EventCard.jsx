/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function EventCard({ data }) {
	const { _id, title, cover, dateTime, eventType } = data;
	// console.log(data);

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

	return (
		<Card className="relative bg-white w-full h-auto max-w-[25rem]  mx-auto flex-grow cursor-pointer hover:ring-2 hover:ring-borderPrimary dark:hover:ring-borderDark dark:bg-[#071b4a]">
			<div
				className={`absolute top-3 right-5 z-10 px-2 text-white text-lg rounded-md ${
					eventType === "free" ? "bg-green-900" : "bg-orange-700"
				}`}
			>
				{eventType}
			</div>
			<CardHeader floated={false} color="blue-gray" className="relative h-56 m-0 rounded-b-none dark:shadow-none">
				<img
					src={cover}
					alt="card-image"
					className=" object-fill h-full rounded-xl duration-300 hover:scale-110 rounded-b-none"
					width="400"
					height="200"
				/>
			</CardHeader>
			<CardBody>
				<Typography variant="h5" color="blue-gray" className="mb-2 font-bold dark:text-white">
					{title}
				</Typography>

				<div className="flex justify-center">
					<Typography variant="h6" color="blue-gray">
						{formattedDate}
					</Typography>
					<span className="px-2">|</span>
					<Typography variant="h6" color="blue-gray">
						{formattedTime}
					</Typography>
				</div>
			</CardBody>
			<CardFooter className="pt-0 mx-auto">
				<Link to={`/events/${_id}`}>
					<Button className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive">Details</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default EventCard;
