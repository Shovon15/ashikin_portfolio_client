/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
// import { DashboardContext } from "../../../context/DashboardContext";
import { get } from "../../../utils/fetchApi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = ({ setBannerImage }) => {
	// const { scrollPosition } = useContext(DashboardContext);
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
	}, [setBannerImage]);

	if (isLoading) {
		return (
			<div
				role="status"
				className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center h-[500px] p-10 bg-color-secondary"
			>
				<div className="w-full md:w-8/12 animate-pulse">
					<div className="h-4 bg-color-primary rounded-full mb-2.5  max-w-[580px]"></div>
					<div className="h-4 bg-color-primary rounded-full w-48 mb-8"></div>
					<div className="h-2 bg-color-primary rounded-full  max-w-[480px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full max-w-[440px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full max-w-[460px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full  max-w-[360px]"></div>
				</div>
				<div className="flex items-center justify-center w-72 md:w-3/12 h-96 bg-color-secondary rounded pt-10 mx-auto animate-pulse">
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
		<div className="min-h-screen md:min-h-[500px] md:h-[500px] flex justify-center items-center bg-color-secondary">
			<div className="max-w-[1560px] mx-auto flex flex-col md:flex-row">
				<div className="p-5 md:p-10 w-full md:w-5/12 flex flex-col justify-start md:justify-center ">
					<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
						{bannerData?.bannerHeader}
					</Typography>
					<Typography className="text-lg text-color-text pt-5">{bannerData?.bannerText}</Typography>
				</div>
				<div className="w-full md:w-7/12 max-w-[23rem] max-h[10rem] p-5 md:p-10 mx-auto">
					<LazyLoadImage
						effect="blur"
						src={bannerData?.portfolioImage}
						alt="portfolio-image"
						className="object-cover  rounded-lg"
					/>
				</div>
			</div>
		</div>
		//  {bannerData && (
		// 	<div className="relative">
		// 		<div className="relative w-[100%] h-[100vh] md:h-[95vh] overflow-hidden">
		// 			<LazyLoadImage
		// 				effect="blur"
		// 				src={bannerData?.backgroundImage}
		// 				alt="cover-image"
		// 				className="object-cover w-full h-full"
		// 				width="100%"
		// 				height="100%"
		// 				style={{
		// 					opacity: 0.4 - Math.min(scrollPosition / 1000, 1),
		// 				}}
		// 			/>
		// 		</div>
		// 		<div className="absolute top-28 md:top-20  left-0 right-0 mx-auto max-w-[1560px] flex flex-col md:flex-row min-h-[30rem] ">
		// 			<div className="p-5 md:p-10 w-full md:w-7/12 flex flex-col justify-start md:justify-center ">
		// 				<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
		// 					{bannerData?.bannerHeader}
		// 				</Typography>
		// 				<Typography className="text-md text-color-text pt-5">{bannerData?.bannerText}</Typography>
		// 			</div>
		// 			<div className="w-full md:w-5/12 max-w-[23rem] max-h[10rem] p-5 md:p-10 mx-auto">
		// 				<LazyLoadImage
		// 					effect="blur"
		// 					src={bannerData?.portfolioImage}
		// 					alt="portfolio-image"
		// 					className="object-cover  rounded-lg"
		// 				/>
		// 			</div>
		// 		</div>
		// 	</div>
		// )}
	);
};

export default Banner;
