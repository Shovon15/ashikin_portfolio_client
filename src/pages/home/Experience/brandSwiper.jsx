/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "./brandSwiper.css";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const BrandSwiper = ({ data }) => {
	console.log(data, "data");
	return (
		<div className="bg-red-500">
			{data && (
				<Swiper
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={"auto"}
					loop={data.length > 0}
					speed={5000}
					autoplay={{ delay: 0, disableOnInteraction: false }}
					modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
					className="h-12 w-full mx-auto"
				>
					{data.map(({ brandLogo, _id }) => (
						<SwiperSlide key={_id}>
							<img src={brandLogo} alt="brand" />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};

export default BrandSwiper;

// <div className="py-5 container">
// 			<Swiper
// 				// effect={"coverflow"}
// 				grabCursor={true}
// 				centeredSlides={true}
// 				// loop={review.length > 2}
// 				speed={1500}
// 				autoplay={{ delay: 3000, disableOnInteraction: false }}
// 				slidesPerView={"auto"}
// 				// coverflowEffect={{
// 				// 	rotate: 0,
// 				// 	stretch: 0,
// 				// 	depth: 100,
// 				// 	modifier: 2.5,
// 				// }}
// 				// pagination={{ el: ".swiper-pagination", clickable: true }}
// 				// navigation={{
// 				// 	nextEl: ".swiper-button-next",
// 				// 	prevEl: ".swiper-button-prev",
// 				// 	clickable: true,
// 				// }}
// 				// modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
// 				className="swiper_container"
// 			>
// 				{/* {brandData.map(({ brandLogo, _id }) => (
// 					<SwiperSlide key={_id}>
// 						<img src={brandLogo} alt="brand" />
// 					</SwiperSlide>
// 				))} */}

// 				{/* <div className="slider-controler pt-12">
// 							<div className="swiper-button-prev slider-arrow hidden lg:block !shadow-lg rounded-full ">
// 								<IoIosArrowBack className="w-4 h-4 text-color-text hover:text-color-header" />
// 							</div>
// 							<div className="swiper-button-next  slider-arrow hidden lg:block !shadow-lg rounded-full">
// 								<IoIosArrowForward className="w-5 h-5  text-color-text hover:text-color-header " />
// 							</div>
// 							<div className="swiper-pagination"></div>
// 						</div> */}
// 			</Swiper>
// 		</div>
