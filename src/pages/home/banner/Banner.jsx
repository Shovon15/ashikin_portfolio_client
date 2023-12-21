import img from "../../../assets/image/banner-demo-img.jpg";
import imgBg from "../../../assets/image/bg.jpg";
import { useEffect } from "react";
import Aos from "aos";

const Banner = () => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	return (
		<div className="flex flex-col md:flex-row">
			<div className="w-full md:w-5/12 p-5 md:p-10  flex flex-col gap-5 justify-center items-center">
				<p data-aos="fade-up" className="font-bold text-3xl md:text-5xl text-textPrimary ">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</p>
				<p data-aos="fade-up" className="text-textSecondary text-justify">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est rem repellendus voluptatem, labore
					animi ex! Sint iste aliquam provident quisquam incidunt quam eius est! Esse necessitatibus inventore
					voluptatibus dolor quasi.
				</p>
			</div>

			<div className="w-full md:w-7/12 relative">
				<img
					src={imgBg}
					alt="..."
					className="pl-[100px] md:pl-[120px] h-[350px] md:h-[550px]"
					data-aos="fade-right"
				/>
				<img
					src={img}
					className="absolute top-[90px] md:top-[100px] left-10 md:left-0 w-40 h-56 md:w-[18rem] md:h-96"
					data-aos="fade-up"
					data-aos-anchor-placement="center-bottom"
				/>
			</div>
		</div>
	);
};

export default Banner;
