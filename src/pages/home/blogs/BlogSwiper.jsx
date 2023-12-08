import { Button } from "@material-tailwind/react";

import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { IoMdArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../../../components/card/BlogCard";

const BlogSwiper = () => {
	const data = [
		{
			id: 1,
			image: "https://i.ibb.co/rbsH3bH/impossible.jpg",
			// logo: BlogLogo,
			title: "Blog name 1",
			desc: "Lorem ipsum dolor sit",
			rating: "3.4",
		},
		{
			id: 2,
			image: "https://i.ibb.co/bPfGx5V/stacked-coins-with-dirt-plant.jpg",
			// logo: BlogLogo,
			title: "Blog name 2",
			desc: "Lorem ipsum dolor sit",
			rating: "4.2",
		},
		{
			id: 3,
			image: "https://i.ibb.co/g717Q2W/11879373-Success.jpg",
			// logo: BlogLogo,
			title: "Blog name 3",
			desc: "Lorem ipsum dolor sit",
			rating: "3.4",
		},
		{
			id: 4,
			image: "https://i.ibb.co/bPfGx5V/stacked-coins-with-dirt-plant.jpg",
			// logo: BlogLogo,
			title: "Blog name 4",
			desc: "Lorem ipsum dolor sit",
			rating: "3.5",
		},
		{
			id: 5,
			image: "https://i.ibb.co/rbsH3bH/impossible.jpg",
			// logo: BlogLogo,
			title: "Blog name 5",
			desc: "Lorem ipsum dolor sit",
			rating: "5.0",
		},
		{
			id: 6,
			image: "https://i.ibb.co/bPfGx5V/stacked-coins-with-dirt-plant.jpg",
			// logo: BlogLogo,
			title: "Blog name 6",
			desc: "Lorem ipsum dolor sit",
			rating: "5.0",
		},
		{
			id: 7,
			image: "https://i.ibb.co/3C99FbY/business-women-signature-document.jpg",
			// logo: BlogLogo,
			title: "Blog name 7",
			desc: "Lorem ipsum dolor sit",
			rating: "4.0",
		},
		{
			id: 8,
			image: "https://i.ibb.co/g717Q2W/11879373-Success.jpg",
			// logo: BlogLogo,
			title: "Blog name 8",
			desc: "Lorem ipsum dolor sit",
			rating: "3.5",
		},
		{
			id: 9,
			image: "https://i.ibb.co/3C99FbY/business-women-signature-document.jpg",
			// logo: BlogLogo,
			title: "Blog name 9",
			desc: "Lorem ipsum dolor sit",
			rating: "4.2",
		},
		{
			id: 10,
			image: "https://i.ibb.co/bPfGx5V/stacked-coins-with-dirt-plant.jpg",
			// logo: BlogLogo,
			title: "Blog name 10",
			desc: "Lorem ipsum dolor sit",
			rating: "3.5",
		},
		{
			id: 11,
			image: "https://i.ibb.co/rbsH3bH/impossible.jpg",
			// logo: BlogLogo,
			title: "Blog name 11",
			desc: "Lorem ipsum dolor sit",
			rating: "4.0",
		},
		{
			id: 12,
			image: "https://i.ibb.co/g717Q2W/11879373-Success.jpg",
			// logo: BlogLogo,
			title: "Blog name 12",
			desc: "Lorem ipsum dolor sit",
			rating: "4.2",
		},
	];

	const swiperRef = useRef();
	return (
		<>
			<div className="hidden md:flex justify-end gap-5 pr-10 ">
				<Button
					onClick={() => swiperRef.current.slidePrev()}
					className="bg-green-400 rounded-full shadow-xxl p-2 "
				>
					<IoMdArrowBack className="w-6 h-6" />
				</Button>
				<Button
					onClick={() => swiperRef.current.slideNext()}
					className="bg-green-400 rounded-full shadow-xxl p-2 "
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
				{data.map((item) => (
					<SwiperSlide key={item.id} className="p-1 h-full rounded-lg ">
						<BlogCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default BlogSwiper;
