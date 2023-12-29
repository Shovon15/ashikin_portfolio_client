import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./reviewSwiper.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ReviewCard from "../../../components/card/review/ReviewCard";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useEffect, useState } from "react";
import { get } from "../../../utils/fetchApi";

const ReviewSwiper = () => {
	const [review, setReview] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await get("reviews/all");
			setReview(res.data.payload.data);
		};
		fetchData();
	}, []);
	// console.log(review, "review");

	// const swiperRef = useRef();
	return (
		<>
			{review && (
				<div className="py-5 container">
					<HeaderText className=" text-center ">Reviews</HeaderText>
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						loop={true}
						speed={1500}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						slidesPerView={"auto"}
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 2.5,
						}}
						pagination={{ el: ".swiper-pagination", clickable: true }}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
							clickable: true,
						}}
						modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
						className="swiper_container"
					>
						{review.length > 0 &&
							review.map((item) => (
								<SwiperSlide key={item._id}>
									<ReviewCard data={item} />
								</SwiperSlide>
							))}

						<div className="slider-controler pt-12">
							<div className="swiper-button-prev slider-arrow hidden lg:block !shadow-lg rounded-full ">
								<IoIosArrowBack className="w-4 h-4 text-color-text hover:text-color-header" />
							</div>
							<div className="swiper-button-next  slider-arrow hidden lg:block !shadow-lg rounded-full">
								<IoIosArrowForward className="w-5 h-5  text-color-text hover:text-color-header " />
							</div>
							<div className="swiper-pagination"></div>
						</div>
					</Swiper>
				</div>
			)}
		</>
	);
};

export default ReviewSwiper;
