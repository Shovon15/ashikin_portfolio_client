import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./reviewSwiper.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ReviewCard from "../../../components/card/review/ReviewCard";

import image1 from "../../../assets/image/review-1.jpeg";
import image2 from "../../../assets/image/review-2.jpeg";
import image3 from "../../../assets/image/review-3.jpeg";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const ReviewSwiper = () => {
	const data = [
		{
			id: 1,
			image: image3,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae porro veritatis! Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim explicabo pariatur et obcaecati, modisimilique illum perferendis.",
		},
		{
			id: 2,
			image: image2,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae  Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim explicabo pariatur et obcaecati, modisimilique illum perferendis, itaque, laudantium.",
		},
		{
			id: 3,
			image: image3,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae porro veritatis! Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim explicabo pariatur et obcaecati, modisimilique illum perferendis, itaque. ",
		},
		{
			id: 4,
			image: image1,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae porro veritatis! Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim explicabo pariatur et obcaecati, modisimilique illum perferendis, itaque.",
		},
		{
			id: 5,
			image: image2,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae porro veritatis! Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim explicabo pariatur et obcaecati, ",
		},
		{
			id: 6,
			image: image1,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eaque aut vel quaerat nisi numquam soluta vitae porro veritatis! Reprehenderit ut similique neque, magni consequatur maiores.Doloremque sint magni veniam! Incidunt officia alias enim.",
		},
	];

	// const swiperRef = useRef();
	return (
		<>
			<div className="py-5 px-2 container">
				<HeaderText className=" text-center ">Review</HeaderText>
				<Swiper
					effect={"coverflow"}
					grabCursor={true}
					centeredSlides={true}
					loop={true}
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
					{data.map((item) => (
						<SwiperSlide key={item.id}>
							<ReviewCard data={item} />
						</SwiperSlide>
					))}

					<div className="slider-controler pt-12">
						<div className="swiper-button-prev slider-arrow hidden md:block !shadow-lg">
							<IoIosArrowBack className="w-4 h-4 text-gray-400" />
						</div>
						<div className="swiper-button-next slider-arrow hidden md:block">
							<IoIosArrowForward className="w-5 h-5  text-gray-400 !shadow-lg rounded-full" />
						</div>
						<div className="swiper-pagination"></div>
					</div>
				</Swiper>
			</div>
		</>
	);
};

export default ReviewSwiper;
