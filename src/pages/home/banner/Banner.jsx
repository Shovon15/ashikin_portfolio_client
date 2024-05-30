// import { Typography } from "@material-tailwind/react";

import { get } from "../../../utils/fetchApi";
import BannerSkeleton from "./bannerSkeleton.jsx";
import BannerSLider from "./bannerSlider.jsx";
// import BannerSwipper from "./bannerSwipper";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import {img} from "../../../assets/image/"

// eslint-disable-next-line react/prop-types
const Banner = ({ setBannerImage }) => {
	const {
		data: bannerData = [],
		// refetch,
		isLoading,
	} = useQuery({
		queryKey: ["bannerData"],
		queryFn: async () => {
			const res = await get("banner");
			const data = res?.data?.payload.data;

			return data;
		},
	});
	
	useEffect(() => {
        if (bannerData.length > 0) {
            const seoImage = bannerData[0]?.imageList[0];
            setBannerImage(seoImage);
        }
    }, [bannerData, setBannerImage]);

	if (isLoading) {
		return (
			<BannerSkeleton/>
		);
	}

	return (
		<div className="bg-color-custom">
			{bannerData.length > 0 && (
				<div className="max-w-[1560px] mx-auto flex flex-col lg:flex-row">
					<div className="p-5 md:p-10 w-full lg:w-5/12 flex flex-col justify-center md:justify-center min-h-[300px] md:min-h-auto">
						<p className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-headerPrimary">
							{bannerData[0]?.bannerHeader}
						</p>
						<p className="text-2xl text-color-primary pt-5">{bannerData[0]?.bannerText}</p>
					</div>
					<div className="w-full block lg:w-7/12  rounded-xl">
						<BannerSLider data= {bannerData[0]?.imageList} />
					</div>
				</div>
			)}
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
		// 				<Typography className="text-md text-color-primary pt-5">{bannerData?.bannerText}</Typography>
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
