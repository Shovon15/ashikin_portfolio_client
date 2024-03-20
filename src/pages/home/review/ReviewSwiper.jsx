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
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const ReviewSwiper = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [review, setReview] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const res = await get("reviews/all");
			setReview(res.data.payload.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	// const swiperRef = useRef();

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>
			{review.length > 0 && (
				<div className="py-5 container">
					<HeaderText className=" text-center ">Reviews</HeaderText>
					<Swiper
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						loop={review.length > 2}
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
						{review.map((item) => (
							<SwiperSlide key={item._id}>
								<ReviewCard data={item} />
							</SwiperSlide>
						))}

						<div className="slider-controler pt-12">
							<div className="swiper-button-prev slider-arrow hidden lg:block !shadow-lg rounded-full ">
								<IoIosArrowBack className="w-4 h-4 text-color-secondary hover:text-color-header" />
							</div>
							<div className="swiper-button-next  slider-arrow hidden lg:block !shadow-lg rounded-full">
								<IoIosArrowForward className="w-5 h-5  text-color-secondary hover:text-color-header " />
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
