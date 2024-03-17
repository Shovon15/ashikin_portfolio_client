import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./bannerSwiper.css";
const BannerSwipper = ({ imageList }) => {
	return (
		<div>
			{imageList.length > 0 && (
				<Swiper
					grabCursor={true}
					centeredSlides={true}
					loop={imageList.length > 1}
					speed={1500}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					modules={[Autoplay]}
					slidesPerView={1}
					className="h-[450px] rounded-xl "
				>
					{imageList.map((imageUrl, index) => (
						<SwiperSlide key={index}>
							<div style={{ height: "450px" }}>
								<LazyLoadImage
									effect="blur"
									src={imageUrl}
									alt={`banner-img-${index}`}
									className="object-fill h-full"
									width="100%"
									height="100%"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};
BannerSwipper.propTypes = {
	imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default BannerSwipper;

// <div
// style={{
// 	height: "450px",
// 	// display: "flex",
// 	// justifyContent: "center",
// 	// alignItems: "center",
// 	// marginTop: "20px",
// }}
// >
// {/* <img
// 	src={bannerImage}
// 	alt="banner-img"
// 	style={{
// 		objectFit: "cover",
// 		height: "100%",
// 		width: "100%",
// 		borderRadius: "5px",
// 	}}
// /> */}
