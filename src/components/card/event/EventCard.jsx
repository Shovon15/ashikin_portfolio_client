/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "./eventCard.css";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";

export function EventCard({ eventData }) {
	// console.log(eventData, "eventData");
	const { _id, title, cover, dateTime, eventType } = eventData || {
		_id: "",
		title: "",
		cover: "",
		dateTime: "",
		eventType: "",
	};

	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	if (!eventData) {
		return <LoadingSpinner />;
	}

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
		<Card className="relative bg-white w-full h-auto max-w-[25rem]  mx-auto flex-grow cursor-pointer hover:ring-2 hover:ring-borderPrimary  ">
			<div
				className={`absolute top-3 right-5 z-10 px-2 text-white text-lg rounded-md ${
					eventType === "free" ? "bg-green-900" : "bg-orange-700"
				}`}
			>
				{eventType}
			</div>
			<CardHeader floated={false} color="blue-gray" className="relative h-56 m-0 rounded-b-none  bg-inherit">
				<img
					data-aos="flip-left"
					src={cover}
					alt="card-image"
					className=" object-fill h-full rounded-xl duration-300 hover:scale-110 rounded-b-none"
					width="400"
					height="200"
				/>
			</CardHeader>
			<CardBody className="flex flex-col items-center">
				<Typography
					data-aos="zoom-in"
					data-aos-anchor-placement="top-bottom"
					variant="h5"
					color="blue-gray"
					className="mb-2 font-bold  h-14 overflow-y-auto my-auto text-center"
				>
					{title}
				</Typography>

				<div data-aos="zoom-in" data-aos-anchor-placement="top-bottom" className="flex justify-center">
					<Typography variant="h6" className="text-textSecondary">
						{formattedDate}
					</Typography>
					<span className="px-2">|</span>
					<Typography variant="h6" className="text-textSecondary">
						{formattedTime}
					</Typography>
				</div>
			</CardBody>
			<CardFooter className="pt-0 mx-auto">
				{_id && (
					<Link to={`/events/${_id}`}>
						<Button
							data-aos-anchor-placement="top-bottom"
							className="bg-gradient-to-r from-cyan-500 to-blue-700  py-3 capitalize text-md shadow-xl focus:shadow-xl active:shadow-2xl px-10"
							data-aos="zoom-in"
						>
							Details
						</Button>
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}

export default EventCard;
