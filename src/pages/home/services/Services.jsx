import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import AOS from "aos";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { Helmet } from "react-helmet-async";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const Services = () => {
	const [hoveredItem, setHoveredItem] = useState(null);
	const [serviceData, setServiceData] = useState([]);
	const [isLaoding, setIsLoading] = useState(false);

	// const { data: serviceData = [], isLoading } = useQuery({
	// 	queryKey: ["serviceData"],
	// 	queryFn: async () => {
	// 		const res = await get("services/published");
	// 		let data = await res.data.payload?.data;
	// 		return data;
	// 	},
	// });

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const res = await get("services/published");
			setServiceData(res.data.payload.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLaoding) {
		<LoadingSpinner />;
	}
	const handleScroll = (id) => {
		console.log(id, "id");
		const element = document.getElementById(id);

		if (element) {
			const offset = 70;

			const topPos = element.getBoundingClientRect().top + window.scrollY - offset;

			window.scrollTo({
				top: topPos,
				behavior: "smooth",
			});
		}
	};

	const gradientColors = ["linear-gradient( rgba(6, 51, 89, .5), rgba(6, 51, 89, 0.9))"];
	// useEffect(() => {
	// 	AOS.init({ duration: 1000 });
	// }, []);

	return (
		<>
			<Helmet>
				<title>Ashikin Alam | Services</title>
				<meta name="description" content="Ashikin Alam personal portfolio services page" />
				<link rel="canonical" href="/services" />
			</Helmet>
			<div className="max-w-[1560px] mx-auto pt-5 md:pt-10">
				<HeaderText className="text-start pl-5 md:pl-14">Services Page</HeaderText>

				{/* -----------------service cards------------------ */}
				<div className="flex flex-wrap gap-10 md:gap-5 justify-center items-center p-5 md:p-10">
					{serviceData.length === 0 ? (
						<div className="min-h-screen center text-color-text text-2xl">Coming Soon</div>
					) : (
						serviceData.map((item, i) => (
							<div
								key={i}
								onClick={() => handleScroll(i + 1)}
								onMouseEnter={() => setHoveredItem(i)}
								onMouseLeave={() => setHoveredItem(null)}
								style={{
									backgroundImage:
										hoveredItem === i
											? `url(${item.cover})`
											: `${gradientColors[i % gradientColors.length]}, url(${item.cover})`,
									backgroundSize: "cover",
									filter: hoveredItem !== i ? "blur(50%)" : "none",
									backgroundPosition: "center",
								}}
								className="h-96 w-[20rem] md:w-[14.5rem] bg-color-primary p-2 flex flex-col justify-end  font-semibold cursor-pointer hover:scale-110 hover:text-textPrimary transition duration-500 ease-in-out pb-5"
								// data-aos="flip-left"
							>
								<p className="text-xl py-2 text-color-header">{item.heading}</p>
								<p className="text-color-text">{item.title}</p>
							</div>
						))
					)}
				</div>
				{serviceData.length > 0 &&
					serviceData.map(({ heading, title, cover, description }, index) => (
						<div
							key={heading}
							id={index + 1}
							className={`flex ${
								index % 2 === 0
									? "flex-col-reverse lg:flex-row"
									: "flex-col-reverse lg:flex-row-reverse"
							} p-5 md:p-10 gap-10`}
						>
							<div className="w-full lg:w-1/2 p-5 md:p-10 text-start flex flex-col gap-5 items-start">
								<p
									className="text-3xl md:text-4xl font-bold text-color-header"
									// data-aos="fade-up"
								>
									{heading}
								</p>

								<p
									className="text-2xl font-bold text-color-text"
									// data-aos="fade-up"
								>
									{title}
								</p>
								{description.map((item, index) => (
									<p
										key={index}
										className="flex gap-3 font-semibold text-color-text text-justify"
										// data-aos="fade-up"
									>
										<i>
											<IoMdCheckmark className="w-5 h-5 text-color-text " />
										</i>
										{item}
									</p>
								))}
								<div
								// data-aos="fade-up"
								>
									<PrimaryButton>{heading}</PrimaryButton>
								</div>
							</div>
							<div className="w-full lg:w-1/2 m-auto">
								<div
									className="bg-color-secondary hover:bg-color-primary h-44 md:h-96 w-full rounded-xl px-[3rem] md:px-[5rem] pt-[2rem] md:pt-[4rem]"
									// data-aos="zoom-in"
								>
									<img src={cover} alt="..." className="overflow-hidden w-full h-full" />
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Services;
