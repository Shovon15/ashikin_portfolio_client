/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { DataContext } from "../../../context/DataContext";

import { RxDoubleArrowUp } from "react-icons/rx";
import { BsClock } from "react-icons/bs";
import { BsCalendar2Check } from "react-icons/bs";
import GoBackButton from "../../../components/Button/GoBackButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import ButtonOutline from "../../../components/Button/ButtonOutline";

const EventViewPage = () => {
	const { fetchEventById } = useContext(DataContext);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);
	const [eventsData, setEventsData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const events = await fetchEventById(id);
			setEventsData(events);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const { cover, content, dateTime, title, eventType } = eventsData || {
		cover: "",
		content: "",
		dateTime: "",
		title: "",
		eventType: "",
	};

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
	const words = content?.length;
	const shouldShowButton = words > 600;

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<div className="bg-color-secondary relative">
				<div className=" absolute top-5 left-5">
					<GoBackButton />
				</div>
				<div className="max-w-[800px] mx-auto p-5 lg:py-10 pt-16 md:pt-0">
					<div
						className="flex justify-center text-color-text"
						//  data-aos="zoom-in"
					>
						<Typography variant="h6" className=" ">
							{formattedDate}
						</Typography>
						<span className="px-2 text-gray-600">|</span>
						<Typography variant="h6" className=" ">
							{formattedTime}
						</Typography>
					</div>
					<div className="flex justify-center">
						<Typography variant="h6" className="text-color-header capitalize">
							{eventType} Program
						</Typography>
					</div>
					<p
						// data-aos="zoom-in"
						className="text-center text-color-header font-bold text-4xl py-5 "
					>
						{title}
					</p>

					<div
						className="flex justify-center"
						// data-aos="zoom-in"
					>
						<Link to={`/program/register/${id}`}>
							<ButtonOutline>Register now</ButtonOutline>
						</Link>
					</div>
					<div className="flex justify-center py-5 -mb-[14rem]">
						<img
							src={cover}
							alt="card-image"
							className=" object-cover h-full rounded-xl md:max-w-[500px]"
						/>
					</div>
				</div>
			</div>
			<div className="max-w-[800px] mx-auto mt-[10rem] flex flex-col justify-center pt-5 pb-10 px-5 lg:px-10 ">
				<Typography
					variant="h3"
					className="py-2 text-color-header"
					//  data-aos="zoom-in"
				>
					Time Schedule
				</Typography>
				<div
					className="flex flex-col  gap-2 text-color-text"
					// data-aos="zoom-in"
				>
					<Typography variant="h6" className="flex gap-2 items-center">
						<BsCalendar2Check className="w-4 h-4" />
						{formattedDate}
					</Typography>
					<Typography variant="h6" className="flex gap-2 items-center">
						<BsClock className="w-4 h-4" />
						{formattedTime}
					</Typography>
				</div>
				<Typography
					variant="h3"
					className="pt-5 text-color-header"
					//  data-aos="zoom-in"
				>
					About The Programm
				</Typography>
				<div
					dangerouslySetInnerHTML={{
						__html: shouldShowButton && !showMore ? `${content.slice(0, 600)} ...` : content,
					}}
					className="pb-2 transition text-color-text "
					// data-aos="fade-up"
				/>
				{shouldShowButton && !showMore && (
					<div className="flex justify-end mx-10">
						<Button
							variant="text"
							onClick={() => setShowMore(true)}
							className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
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
							className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
						>
							Read Less
							<RxDoubleArrowUp className=" w-4 h-4" />
						</Button>
					</div>
				)}
				<div
					className="py-5 flex justify-center"
					// data-aos="zoom-in"
				>
					<Link to={`/program/register/${id}`}>
						<PrimaryButton>Register Now</PrimaryButton>
					</Link>
				</div>
			</div>
		</>
	);
};

export default EventViewPage;
