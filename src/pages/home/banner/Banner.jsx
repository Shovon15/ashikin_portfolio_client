import img from "../../../assets/image/banner-demo-img.jpg";
import imgBg from "../../../assets/image/bg.jpg";
import imgBg2 from "../../../assets/image/creative-people-working-office.jpg";
import { useEffect } from "react";
import Aos from "aos";

const Banner = () => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	const Data = [
		{
			header: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est rem repellendus voluptatem, labore animi ex! Sint iste aliquam provident quisquam incidunt quam eius est! Esse necessitatibus inventore voluptatibus dolor quasi",
			bgImage: imgBg,
			secondaryImage: img,
		},
	];

	return (
		<div className="flex flex-col lg:flex-row bg-color-primary">
			<div className="w-full lg:w-5/12 p-5 md:p-10  flex flex-col gap-5 justify-center items-center">
				<p data-aos="fade-up" className="font-bold text-3xl md:text-4xl lg:text-5xl text-color-header ">
					{Data[0]?.header}
				</p>
				<p data-aos="fade-up" className="text-color-text text-justify text-md lg:text-xl">
					{Data[0]?.text}
				</p>
			</div>

			<div className="w-full lg:w-7/12 md:pl-[18rem] lg:pl-0 relative">
				<div className="pl-[100px] lg:pl-[170px] h-[200px] md:h-[300px] lg:h-[500px]">
					<div
						style={{
							backgroundImage: `url(${Data[0]?.bgImage})`,
							backgroundSize: "cover",

							backgroundRepeat: "no-repeat",
							width: "100%",
							height: "100%",
							opacity: ".4",
						}}
					></div>
				</div>
				<div
					className="absolute top-[20px] md:top-[40px] lg:top-[70px] left-[4rem] md:left-[20rem] lg:left-0 w-[7rem] h-[10rem] md:w-[12rem] md:h-[16rem] lg:w-[19rem] lg:h-[25rem]"
					data-aos="fade-up"
					data-aos-anchor-placement="center-bottom"
				>
					<div
						style={{
							backgroundImage: `url(${Data[0]?.secondaryImage})`,
							backgroundSize: "cover",

							backgroundRepeat: "no-repeat",
							width: "100%",
							height: "100%",
						}}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
