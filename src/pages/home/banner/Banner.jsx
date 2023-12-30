import { Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { get } from "../../../utils/fetchApi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = ({ setBannerImage }) => {
	const { scrollPosition } = useContext(DashboardContext);
	const [isLoading, setIsLoading] = useState(false);
	const [bannerData, setBannerData] = useState({
		bannerHeader: "",
		bannerText: "",
		backgroundImage: "",
		portfolioImage: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await get("banner");
			setBannerData(response.data.payload.data);
			setBannerImage(response.data.payload.data.backgroundImage);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div
				role="status"
				className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center h-[35rem] p-10 pt-[150px]"
			>
				<div className="w-full md:w-8/12">
					<div className="h-4 bg-color-secondary rounded-full mb-2.5  max-w-[580px]"></div>
					<div className="h-4 bg-color-secondary rounded-full w-48 mb-8"></div>
					<div className="h-2 bg-color-secondary rounded-full  max-w-[480px] mb-2.5"></div>
					<div className="h-2 bg-color-secondary rounded-full max-w-[440px] mb-2.5"></div>
					<div className="h-2 bg-color-secondary rounded-full max-w-[460px] mb-2.5"></div>
					<div className="h-2 bg-color-secondary rounded-full  max-w-[360px]"></div>
				</div>
				<div className="flex items-center justify-center w-72 md:w-3/12 h-96 bg-color-secondary rounded pt-10 mx-auto ">
					<svg
						className="w-10 h-10 text-[#264763] "
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
			</div>
		);
	}

	return (
		<div className="m-0 p-0">
			{bannerData && (
				<div className="relative">
					<div className="relative w-[100%] h-[100vh] md:h-[95vh] overflow-hidden">
						<LazyLoadImage
							effect="blur"
							src={bannerData?.backgroundImage}
							alt="cover-image"
							className="object-cover w-full h-full"
							width="100%"
							height="100%"
							style={{
								opacity: 0.4 - Math.min(scrollPosition / 1000, 1),
							}}
						/>
					</div>
					<div className="absolute top-20 left-0 right-0 mx-auto max-w-[1560px] flex flex-col md:flex-row">
						<div className="p-5 md:p-10 w-full md:w-7/12 flex flex-col justify-start md:justify-center">
							<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
								{bannerData?.bannerHeader}
							</Typography>
							<Typography className="text-md text-color-text pt-5">{bannerData?.bannerText}</Typography>
						</div>
						<div className="w-full md:w-5/12 max-w-[23rem] max-h[10rem] p-5 md:p-10 mx-auto ">
							<LazyLoadImage
								effect="blur"
								src={bannerData?.portfolioImage}
								alt="portfolio-image"
								className="object-cover  rounded-lg"
							/>
						</div>
					</div>
				</div>
			)}
			{/* {bannerData && (
				<div className="relative w-full h-full flex">
					<div
					// style={{
					// 	position: "absolute",
					// 	top: 0,
					// 	left: 0,
					// 	width: "100%",
					// 	height: "100%",
					// 	loading: "lazy",
					// 	backgroundImage: `url(${bannerData?.backgroundImage})`,
					// 	backgroundSize: "cover",
					// 	backgroundPosition: "center",
					// 	opacity: 0.4 - Math.min(scrollPosition / 700, 1),
					// }}
					>
						<LazyLoadImage
							effect="blur"
							src={bannerData?.backgroundImage}
							alt="cover-image"
							className="object-fill h-full rounded-t-xl "
							// width="400px"
							// height="200px"
							width="100%"
							height="95vh"
						/>
					</div>
					<div className="flex flex-col md:flex-row gap-0 md:gap-5 z-10">
						<div className="p-5 md:p-10 w-full md:w-7/12 flex flex-col justifystart md:justify-center">
							<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
								{bannerData?.bannerHeader}
							</Typography>
							<Typography className="text-md text-color-text pt-5">{bannerData?.bannerText}</Typography>
						</div>
						<div className="w-full md:w-5/12 p-5 md:p-10 max-h-[40rem] max-w-[20rem] flex flex-col justify-start md:justify-center mx-auto">
							<LazyLoadImage
								effect="blur"
								src={bannerData?.portfolioImage}
								alt="portfolio-image"
								className="object-cover  rounded-lg"
							/>
						</div>
					</div>
				</div>
			)} */}
		</div>
		// <div className="flex flex-col lg:flex-row bg-color-primary">
		// 	<div className="w-full lg:w-5/12 p-5 md:p-10  flex flex-col gap-5 justify-center items-center">
		// 		<p
		// 			//  data-aos="fade-up"
		// 			className="font-bold text-3xl md:text-4xl lg:text-5xl text-color-header "
		// 		>
		// 			{Data[0]?.header}
		// 		</p>
		// 		<Typography
		// 			variant="paragraph"
		// 			// data-aos="fade-up"
		// 			className="text-color-text text-justify "
		// 		>
		// 			{Data[0]?.text}
		// 		</Typography>
		// 	</div>

		// 	<div className="w-full lg:w-7/12 md:pl-[18rem] lg:pl-0 relative">
		// 		<div className="pl-[100px] lg:pl-[170px] h-[200px] md:h-[300px] lg:h-[500px]">
		// 			<div
		// 				style={{
		// 					backgroundImage: `url(${Data[0]?.bgImage})`,
		// 					backgroundSize: "cover",

		// 					backgroundRepeat: "no-repeat",
		// 					width: "100%",
		// 					height: "100%",
		// 					opacity: ".4",
		// 				}}
		// 			></div>
		// 		</div>
		// 		<div
		// 			className="absolute top-[20px] md:top-[40px] lg:top-[70px] left-[4rem] md:left-[20rem] lg:left-0 w-[7rem] h-[10rem] md:w-[12rem] md:h-[16rem] lg:w-[19rem] lg:h-[25rem]"
		// 			// data-aos="fade-up"
		// 			// data-aos-anchor-placement="center-bottom"
		// 		>
		// 			<div
		// 				style={{
		// 					backgroundImage: `url(${Data[0]?.secondaryImage})`,
		// 					backgroundSize: "cover",

		// 					backgroundRepeat: "no-repeat",
		// 					width: "100%",
		// 					height: "100%",
		// 				}}
		// 			></div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Banner;
