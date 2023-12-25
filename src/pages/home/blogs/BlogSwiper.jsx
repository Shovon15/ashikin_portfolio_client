import { useRef } from "react";
import { Button } from "@material-tailwind/react";
import { IoMdArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../../../components/card/blog/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BlogSwiper = () => {
	const { data: blogData = [], isLoading } = useQuery({
		queryKey: ["serviceData"],
		queryFn: async () => {
			const res = await get("blogs/published");
			let data = await res.data.payload?.data;
			return data;
		},
	});

	// console.log(blogData, "blogData");

	const swiperRef = useRef();

	if (isLoading) {
		<LoadingSpinner />;
	}

	return (
		<>
			<div className="hidden md:flex justify-end gap-5 pr-10 ">
				<Button
					onClick={() => swiperRef.current.slidePrev()}
					className="bg-color-secondary hover:text-color-header rounded-full shadow-xl p-2 "
				>
					<IoMdArrowBack className="w-6 h-6" />
				</Button>
				<Button
					onClick={() => swiperRef.current.slideNext()}
					className="bg-color-secondary hover:text-color-header rounded-full shadow-xl p-2 "
				>
					<IoMdArrowBack className="w-6 h-6 rotate-180" />
				</Button>
			</div>
			<Swiper
				// slidesPerView={4}
				spaceBetween={5}
				slidesPerGroupSkip={0}
				speed={1500}
				// pagination={{ clickable: true }}
				breakpoints={{
					0: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
					350: {
						slidesPerView: 1,
						slidesPerGroup: 1,
					},
					500: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					768: {
						slidesPerView: 2,
						slidesPerGroup: 3,
					},
					1024: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
					1200: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
				}}
				// modules={[Pagination]}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				// onSwiper={(swiper) => console.log(swiper, "swiper")}
				className=""
			>
				{blogData &&
					blogData.map((item) => (
						<SwiperSlide key={item._id} className="p-1 h-full rounded-lg ">
							<BlogCard item={item} />
						</SwiperSlide>
					))}
			</Swiper>
		</>
	);
};

export default BlogSwiper;
