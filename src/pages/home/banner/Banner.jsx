import { Typography } from "@material-tailwind/react";
import Aos from "aos";
import { useEffect, useState } from "react";

const Banner = () => {
	// useEffect(() => {
	// 	Aos.init({ duration: 1000 });
	// }, []);

	const Data = [
		{
			header: "Lorem ipsum dolor sit amet, consectur adipisicing elit",
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est rem repellendus voluptatem, labore animi ex! Sint iste aliquam provident quisquam incidunt quam eius est! Esse necessitatibus inventore voluptatibus dolor quasi",
			bgImage: "https://i.ibb.co/8b8SC3S/banner-img.jpg",
			secondaryImage: "https://i.ibb.co/JrtBPQK/banner-demo-img.jpg",
		},
		// https://i.ibb.co/nM9kKjn/banner-img-bg.jpg
		//https://i.ibb.co/41kYcMH/review-3.jpg
		// https://i.ibb.co/JrtBPQK/banner-demo-img.jpg
	];
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		setScrollPosition(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const backgroundImageStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundImage: `url('https://i.ibb.co/8b8SC3S/banner-img.jpg')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		opacity: 0.4 - Math.min(scrollPosition / 700, 1), // Adjust the divisor as needed
	};

	return (
		<>
			<div className="relative h-[45rem] md:h-[30rem] flex justify-center items-start md:items-center">
				<div style={backgroundImageStyle}></div>
				<div className="flex flex-col md:flex-row gap-0 md:gap-5 z-10 items-start md:items-center border-border-red-500">
					<div className="p-5 md:p-10 w-full md:w-1/2">
						<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
							{Data[0].header}
						</Typography>
						<Typography className="text-md text-color-text pt-5">{Data[0].text}</Typography>
					</div>
					<div className="w-full md:w-1/2 p-5 md:p-10 max-h-[40rem] max-w-[20rem] mx-auto ">
						<img src={Data[0].secondaryImage} className="object-cover  rounded-lg" alt="secondary-image" />
					</div>
				</div>
			</div>
		</>
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
