/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { DataContext } from "../../../context/DataContext";

import { RxDoubleArrowUp } from "react-icons/rx";
import { BsClock } from "react-icons/bs";
import { BsCalendar2Check } from "react-icons/bs";
import GoBackButton from "../../../components/Button/GoBackButton";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import ButtonOutline from "../../../components/Button/ButtonOutline";
import bgImg from "../../../assets/image/abstract-offer.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PiShareFat } from "react-icons/pi";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import PageHelmet from "../../../helper/PageHelmet";

const EventViewPage = () => {
	const { fetchEventBySlug } = useContext(DataContext);
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);
	const [eventsData, setEventsData] = useState({});
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const events = await fetchEventBySlug(slug);
			setEventsData(events);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	console.log(eventsData, "eventsData");
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

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	// const shareUrl = "https://ashikin-alam.netlify.app/program/this-is-the-program-title";
	console.log(shareUrl, "shareUrl");

	const quote = typeof document !== "undefined" ? document.title : "Check out this awesome content!";

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<PageHelmet
				title={title}
				description={title}
				name="ashikin alam"
				image={cover}
				link={shareUrl}
				type="webapp"
			/>

			<div className="bg-color-primary relative min-h-screen">
				<div className="absolute top-0 left-0 flex justify-between w-full pointer-events-none">
					<div>
						<img src={bgImg} alt="bg-shape" className="w-[25rem] h-[600px] -mt-20 transform scale-x-[-1]" />
					</div>
					<div>
						<img src={bgImg} alt="bg-shape" className="w-[25rem] h-[600px] -mt-20  ml-auto" />
					</div>
				</div>
				<div className="page-container z-10">
					<div className=" ml-5">
						<GoBackButton />
					</div>
					<div className="max-w-[800px] mx-auto">
						<div className="flex justify-end relative">
							<IconButton
								variant="text"
								className="rounded-full bg-color-secondary shadow-xl"
								onClick={() => setIsOpen(!isOpen)}
							>
								<PiShareFat className="w-5 h-5 text-color-text" />
							</IconButton>
							{isOpen && (
								<div className="absolute right-0 mt-10 w-44 bg-green-600 rounded-lg overflow-hidden shadow-lg">
									<ul className="py-2 px-4 space-y-2">
										<li className="text-white">Facebook</li>
										<li className="text-white">YouTube</li>
										<li className="text-white">WhatsApp</li>
									</ul>
								</div>
							)}
						</div>
						<div className="flex justify-center text-color-text">
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
						<p className="text-center text-color-header font-bold text-4xl py-5 ">{title}</p>

						<div className="flex justify-center">
							<Link to={`/program/register/${slug}`}>
								<ButtonOutline>Register now</ButtonOutline>
							</Link>
						</div>
						<div className="flex justify-center p-5 ">
							<LazyLoadImage
								effect="blur"
								src={cover}
								alt="cover-image"
								className=" object-cover rounded-xl mx-auto"
								width="90%"
								height="90%"
							/>
						</div>
						<div className="flex flex-col justify-center pt-5 pb-10 px-5 lg:px-10 ">
							<Typography variant="h3" className="py-2 text-color-header">
								Time Schedule
							</Typography>
							<div className="flex flex-col  gap-2 text-color-text">
								<Typography variant="h6" className="flex gap-2 items-center">
									<BsCalendar2Check className="w-4 h-4" />
									{formattedDate}
								</Typography>
								<Typography variant="h6" className="flex gap-2 items-center">
									<BsClock className="w-4 h-4" />
									{formattedTime}
								</Typography>
							</div>
							<Typography variant="h3" className="pt-5 text-color-header">
								About The Programm
							</Typography>
							<div
								dangerouslySetInnerHTML={{
									__html: shouldShowButton && !showMore ? `${content.slice(0, 600)} ...` : content,
								}}
								className="pb-2 transition text-color-text "
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
							<div className="py-5 flex justify-center">
								<Link to={`/program/register/${slug}`}>
									<PrimaryButton>Register Now</PrimaryButton>
								</Link>
							</div>

							<div className="">
								<FacebookShareButton url={shareUrl} quote={title}>
									<FacebookIcon size={32} round />
									<span>Share on Facebook</span>
								</FacebookShareButton>

								<TwitterShareButton url={shareUrl} quote={title}>
									<TwitterIcon size={32} round />
								</TwitterShareButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventViewPage;
