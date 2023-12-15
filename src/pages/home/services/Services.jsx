import { useEffect, useState } from "react";
import image from "../../../assets/image/services_image.jpg";
import image2 from "../../../assets/image/banner-img-bg.jpg";
import image3 from "../../../assets/image/creative-people-working-office.jpg";
import image4 from "../../../assets/image/executives-joking-laughing-office.jpg";
import image5 from "../../../assets/image/modern-equipped-computer-lab.jpg";

import { IoMdCheckmark } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@material-tailwind/react";
import PrimaryButton from "../../../components/Button/PrimaryButton";

const Services = () => {
	const [hoveredItem, setHoveredItem] = useState(null);

	const data = [
		{
			id: 1,
			image: image,
			heading: "1-1 Coaching Seasion",
			title: "Shine with Noor!",
		},
		{
			id: 2,
			image: image2,
			heading: "Group Coaching",
			title: "Team Light!",
		},
		{
			id: 3,
			image: image3,
			heading: "Corporate",
			title: "Solution!",
		},
		{
			id: 4,
			image: image4,
			heading: "Business/ Enterepreneur",
			title: "Consultation Solution!",
		},
		{
			id: 5,
			image: image5,
			heading: "Speaking",
			title: "Speaking Seasion!",
		},
	];

	const handleScroll = (id) => {
		const element = document.getElementById(id);

		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	};

	const gradientColors = [
		"linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(0,32,240,0.6110819327731092) 0%, rgba(5,67,135,1) 100%)",
		"linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(8,119,164,0.6558998599439776) 0%, rgba(5,67,135,1) 100%)",
		"linear-gradient(216deg, rgba(0,0,0,1) 0%, rgba(8,140,164,0.6558998599439776) 0%, rgba(5,67,135,1) 100%)",
		// "linear-gradient(rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0.5))",
		// "linear-gradient(rgba(0, 0, 255, 0.4), rgba(0, 0, 255, 0.5))",
		// "linear-gradient(rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0.5))",
		// "linear-gradient(rgba(0, 0, 255, 0.6), rgba(0, 0, 255, 0.5))",

		// Add more colors as needed
	];
	useEffect(() => {
		AOS.init({ duration: 1000 });
	}, []);

	return (
		<div className="max-w-[1560px] mx-auto pt-5 md:pt-10">
			<p
				className="text-start px-5 md:px-10 md:w-[30rem] font-bold text-3xl md:text-4xl lg:text-5xl text-textPrimary"
				data-aos="zoom-in-up"
			>
				Services Page
			</p>
			{/* -----------------service cards------------------ */}
			<div className="flex flex-wrap gap-10 md:gap-5 justify-center items-center p-5 md:p-10">
				{data.map((item, i) => (
					<div
						key={i}
						onClick={() => handleScroll(item.id)}
						onMouseEnter={() => setHoveredItem(i)}
						onMouseLeave={() => setHoveredItem(null)}
						style={{
							backgroundImage:
								hoveredItem === i
									? `url(${item.image})`
									: `${gradientColors[i % gradientColors.length]}, url(${item.image})`,
							backgroundSize: "cover",
							filter: hoveredItem !== i ? "blur(50%)" : "none",
							backgroundPosition: "center",
						}}
						className="h-96 w-[20rem] md:w-[14.5rem] bg-blue-500 p-2 flex flex-col justify-end text-white font-semibold cursor-pointer hover:scale-110 hover:text-textPrimary transition duration-500 ease-in-out pb-5"
						data-aos="flip-left"
					>
						<p className="text-xl py-2">{item.heading}</p>
						<p>{item.title}</p>
					</div>
				))}
			</div>
			{/* ----------1------------ */}
			<div id="1" className="flex flex-col-reverse md:flex-row p-5 md:p-10 gap-10">
				<div className="w-full md:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
					<p className="text-4xl md:text-5xl font-bold " data-aos="fade-up">
						1-1 Coaching Sessions
					</p>
					<p className="text-2xl font-bold text-textPrimary" data-aos="fade-up">
						Shine with Noor!
					</p>

					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio aperiam quisquam eaque nesciunt,
						aut porro.
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste repellat ipsa impedit
						dolorem reiciendis praesentium maiores ad? Provident delectus beatae incidunt nihil!
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aut neque, tempore perferendis
						amet inventore aspernatur at quidem ex, ut explicabo quibusdam? Impedit aperiam tenetur aut,
						error repudiandae placeat voluptatem?
					</p>
				</div>
				<div className="w-full md:w-1/2 m-auto">
					<div
						className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
						data-aos="zoom-in"
					>
						<img src={image} alt="..." className="overflow-hidden w-full h-full" />
					</div>
				</div>
			</div>
			{/* -----------Never worked with a Coach------------- */}
			<div className="flex flex-col justify-center items-center h-[25rem] md:h-[22rem] bg-gradient-to-r from-blue-300 to-blue-800 p-5 md:p-10">
				<p className="text-4xl md:text-6xl font-bold text-white py-5 text-center" data-aos="fade-up">
					Never worked with a Coach?
				</p>
				<p
					className="font-semibold text-xl text-gray-300 max-w-[55rem] mx-auto py-2 text-center"
					data-aos="fade-up"
				>
					Don’t worry, you can book a FREE virtual chemistry session. That way you can find out if it works
					for you right now, or not
				</p>
				<Button
					variant="text"
					className="bg-white capitalize text-lg text-blue-500 hover:bg-gray-300 active:bg-gray-400 py-3 my-5 shadow-xl"
					data-aos="fade-up"
				>
					1-1 coaching
				</Button>
			</div>
			{/* -------------2------------- */}
			<div id="2" className="flex flex-col-reverse md:flex-row-reverse p-5 md:p-10 gap-10">
				<div className="w-full md:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
					<p className="text-4xl md:text-5xl font-bold " data-aos="fade-up">
						Group Coaching Services:
					</p>
					<p className="text-2xl font-bold text-textPrimary" data-aos="fade-up">
						Team Light!
					</p>

					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Do you enjoy working in groups of like-minded people? So, you establish a network, have a
						support group while being coached? We’ve got the perfect solution for you!
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Our group coaching services allow for up to 5 members to join, groups are structured based on
						common ambitions and goals – so you know you’ll be walking into a room that understands where
						you’re coming from right from the get-go!
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aut neque, tempore perferendis
						amet inventore aspernatur at quidem ex, ut explicabo quibusdam? Impedit aperiam tenetur aut,
						error repudiandae placeat voluptatem?
					</p>
				</div>
				<div className="w-full md:w-1/2 m-auto">
					<div
						className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
						data-aos="zoom-in"
					>
						<img src={image2} alt="..." className="overflow-hidden w-full h-full" />
					</div>
				</div>
			</div>
			{/* ----------------number 2  interested button-----------*/}
			<div className="flex flex-col md:flex-row justify-center items-center h-[20rem] md:h-[15rem] bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 p-5 md:p-10">
				<p className="text-4xl md:text-6xl font-bold text-white py-5 text-center" data-aos="fade-up">
					Interested?
				</p>
				<p
					className="font-semibold text-xl text-gray-300 max-w-[55rem] mx-auto py-2 text-center"
					data-aos="fade-up"
				>
					Interested? Let us know! We’ll reach out and share the details with you!
				</p>
				<Button
					variant="text"
					className="bg-white capitalize text-lg text-blue-500 hover:bg-gray-300 active:bg-gray-400 py-3 my-5 shadow-xl"
					data-aos="fade-up"
				>
					Group Coaching
				</Button>
			</div>
			{/* ------------3------------- */}
			<div id="3" className="flex flex-col-reverse md:flex-row p-5 md:p-10 gap-10 ">
				<div className="w-full md:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
					<p className="text-4xl md:text-5xl font-bold " data-aos="fade-up">
						Corporates
					</p>
					<p className="text-2xl font-bold text-textPrimary" data-aos="fade-up">
						Team Light!
					</p>

					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Executive coaching is increasingly imperative for organizational leaders, the art of leading
						full teams and managing demanding responsibilities requires the Leader to be the right mind and
						heart set to serve their Team and organization to the best they can while achieving their own
						personal goals.
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Looking for Corporate Coaching solutions for your Executives or team members. Or customized
						training programs on technical (banking/financial) or leadership topics. We’re keen to work with
						you.
					</p>
					<div className="mx-auto md:mx-0">
						<PrimaryButton>Corporate services</PrimaryButton>
					</div>
				</div>

				<div className="w-full md:w-1/2 m-auto">
					<div
						className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
						data-aos="zoom-in"
					>
						<img src={image3} alt="..." className="overflow-hidden w-full h-full" />
					</div>
				</div>
			</div>
			{/* ------------------------4------------------ */}
			<div id="4" className="flex flex-col-reverse md:flex-row-reverse p-5 md:p-10 gap-10">
				<div className="w-full md:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
					<p className="text-4xl md:text-5xl font-bold break-words" data-aos="fade-up">
						Business / Entrepreneur Consultations
					</p>
					<p className="text-2xl font-bold text-textPrimary" data-aos="fade-up">
						Consultation Solution!
					</p>

					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Executive coaching is increasingly imperative for organizational leaders, the art of leading
						full teams and managing demanding responsibilities requires the Leader to be the right mind and
						heart set to serve their Team and organization to the best they can while achieving their own
						personal goals.
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Looking for Corporate Coaching solutions for your Executives or team members. Or customized
						training programs on technical (banking/financial) or leadership topics. We’re keen to work with
						you.
					</p>
					<div className="mx-auto md:mx-0">
						<PrimaryButton>Consultation services</PrimaryButton>
					</div>
				</div>

				<div className="w-full md:w-1/2 m-auto">
					<div
						className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
						data-aos="zoom-in"
					>
						<img src={image4} alt="..." className="overflow-hidden w-full h-full" />
					</div>
				</div>
			</div>
			{/* ------------------------5--------------------- */}
			<div id="5" className="flex flex-col-reverse md:flex-row p-5 md:p-10 gap-10">
				<div className="w-full md:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
					<p className="text-4xl md:text-5xl font-bold " data-aos="fade-up">
						Speaking
					</p>
					<p className="text-2xl font-bold text-textPrimary" data-aos="fade-up">
						Speaking Seasion!
					</p>

					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Noorhan has a passion for motivational and inspirational speaking. She’s been speaking for
						years, all over the world. From the USA, to India, Poland and of course her favorite MENA! With
						over 12+ years professional experience in Banking and Finance and over 6 years in Coaching,
						Training and mentoring Noorhan builds her content on the mix of both worlds. Seeing the world
						from both sides has allowed her to build a wealth of stories and experiences and truly inspire
						change to the audiences she speaks with.
					</p>
					<p className="flex gap-3 font-semibold text-textSecondary text-justify" data-aos="fade-up">
						<i>
							<IoMdCheckmark className="w-5 h-5 text-textPrimary " />
						</i>
						Looking for Corporate Coaching solutions for your Executives or team members. Or customized
						training programs on technical (banking/financial) or leadership topics. We’re keen to work with
						you.
					</p>
					<div className="mx-auto md:mx-0">
						<PrimaryButton>Speaking services</PrimaryButton>
					</div>
				</div>

				<div className="w-full md:w-1/2 m-auto">
					<div
						className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500  h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
						data-aos="zoom-in"
					>
						<img src={image5} alt="..." className="overflow-hidden w-full h-full" />
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center h-[22rem] md:h-[20rem] bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 p-5 md:p-10">
				<p className="text-4xl md:text-6xl font-bold text-white py-5 text-center" data-aos="fade-up">
					Sounds like something for you?
				</p>
				<p
					className="font-semibold text-xl text-gray-300 max-w-[55rem] mx-auto py-2 text-center"
					data-aos="fade-up"
				>
					Let us know by submitting the below form, and we’ll reach out to you with the full details.
				</p>
				<Button
					variant="text"
					className="bg-white capitalize text-lg text-blue-500 hover:bg-gray-300 active:bg-gray-400 py-3 my-5 shadow-xl"
					data-aos="fade-up"
				>
					Contact Us
				</Button>
			</div>
		</div>
	);
};

export default Services;
