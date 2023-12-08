import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { DataContext } from "../../../context/DataContext";

import { RxDoubleArrowUp } from "react-icons/rx";
import { BsClock } from "react-icons/bs";
import { BsCalendar2Check } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const EventViewPage = () => {
	const { fetchEventById, receiveEventById } = useContext(DataContext);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await fetchEventById(id);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const { cover, content, dateTime, title, eventType } = receiveEventById || {
		cover: "",
		content: "",
		dateTime: "",
		title: "",
		eventType: "",
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	// ---------------image path----------------------
	const imagePath = cover.replace("public", "");
	const dateAndTime = new Date(dateTime);
	// -------------date-----------------------
	const formattedDate = dateAndTime.toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	// ------------------time--------------
	const formattedTime = dateAndTime.toLocaleTimeString("en-US", {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
	});
	// ----------content---------------
	const words = content.length;
	const shouldShowButton = words > 600;

	return (
		<>
			{!isLoading && (
				<>
					<div className="bg-blue-100 dark:bg-darkPrimary">
						<div className="max-w-[800px] mx-auto p-5 lg:py-10">
							<div className="flex justify-center">
								<Typography variant="h6" className=" dark:text-gray-300">
									{formattedDate}
								</Typography>
								<span className="px-2 text-gray-600">|</span>
								<Typography variant="h6" className=" dark:text-gray-300">
									{formattedTime}
								</Typography>
							</div>
							<p className="text-center font-bold text-4xl py-5 dark:text-white">{title}</p>
							<p className="text-center p-2 text-xl  dark:text-white">{eventType}</p>
							<div className="flex justify-center">
								<Link to={`/events/register/${id}`}>
									<Button className="bg-blue-500 dark:text-white">Register now</Button>
								</Link>
							</div>
							<div className="flex justify-center py-5 -mb-[14rem]">
								<img
									src={`http://localhost:5000` + imagePath}
									alt="card-image"
									className=" object-cover h-full rounded-xl"
								/>
							</div>
						</div>
					</div>
					<div className="max-w-[800px] mx-auto mt-[10rem] flex flex-col justify-center pt-5 pb-10 px-5 lg:px-10 dark:text-white">
						<Typography variant="h3" className="py-2 text-gray-500">
							Time & Location
						</Typography>
						<div className="flex flex-col  gap-2">
							<Typography variant="h6" className=" dark:text-gray-300 flex gap-2 items-center">
								<BsCalendar2Check className="w-4 h-4" />
								{formattedDate}
							</Typography>
							<Typography variant="h6" className="dark:text-gray-300 flex gap-2 items-center">
								<BsClock className="w-4 h-4" />
								{formattedTime}
							</Typography>
							<Typography variant="h6" className="dark:text-gray-300 flex gap-2 items-center">
								<IoLocationOutline className="w-5 h-5" />
								location
							</Typography>
						</div>
						<Typography variant="h3" className="py-2 text-gray-500">
							About The event
						</Typography>
						<div
							dangerouslySetInnerHTML={{
								__html: shouldShowButton && !showMore ? `${content.slice(0, 600)} ...` : content,
							}}
							className="pb-2 transition "
						/>
						{shouldShowButton && !showMore && (
							<div className="flex justify-end mx-10">
								<Button
									variant="text"
									onClick={() => setShowMore(true)}
									className="w-32 p-1 text-red-500 flex justify-center items-center gap-2"
								>
									Read More
									<RxDoubleArrowUp className="rotate-180 w-4 h-4" />
								</Button>
							</div>
						)}
						{showMore && (
							<div className="flex justify-end mx-10">
								<Button
									variant="text"
									onClick={() => setShowMore(false)}
									className="w-32 p-1 text-red-500 flex justify-center items-center gap-2"
								>
									Read Less
									<RxDoubleArrowUp className=" w-4 h-4" />
								</Button>
							</div>
						)}
						<div className="py-5 flex justify-center">
							<Link to={`/events/register/${id}`}>
								<Button className="bg-blue-500 dark:text-white">Register now</Button>
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default EventViewPage;
