import { Button, Typography } from "@material-tailwind/react";
// import imgBg from "../../../../public/images/bg.jpg";
import img from "../../../../public/images/smiling-young-man.jpg";
import ashikinImg from "../../../assets/image/Img-1.png";
import "./banner.css";
import ParticalBg from "./ParticalBg";
const Banner = () => {
	// const containerStyle = {
	// 	position: "relative",
	// 	width: "60%",
	// 	height: "500px", // Adjust the height as needed
	// };

	// const gradientOverlayStyle = {
	// 	position: "absolute",
	// 	top: 0,
	// 	right: 0,
	// 	width: "60%",
	// 	height: "100%",
	// 	background: "linear-gradient(to right, transparent, #3366cc)", // Adjust the gradient color
	// 	pointerEvents: "none", // Allows clicks to go through the overlay to the image
	// };

	// const imageStyle = {
	// 	width: "100%",
	// 	height: "100%",
	// 	paddingLeft: "150px", // Adjust the padding as needed
	// };

	return (
		<div className="relative">
			<ParticalBg />
			<div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col-reverse gap-0 md:flex-row  w-full h-full">
				<div className="flex flex-col justify-center items-center w-full  md:w-1/2 py-5 px-5 md:px-10">
					<div className="text-start ">
						<Typography className="text-3xl md:text-4xl text-white  dark:text-darkTextPrimary font-extrabold py-2">
							Ex-Banker, Internet Entrepreneur and Personal Growth Catalyst.
						</Typography>
						<Typography className="text-lg text-justify text-white dark:text-darkTextPrimary py-2 hidden md:block">
							Join our vibrant community! Sign up for our monthly newsletter featuring valuable personal
							growth tips and noteworthy content from books and the web. Be part of a friendly community
							of avid readers.
						</Typography>
						<div className="text-center md:text-start ">
							<Button className="bg-buttonPrimary hover:bg-buttonHover active:bg-buttonActive my-2 w-full md:w-44">
								Contact me
							</Button>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 flex justify-center items-center">
					<img className="w-72 rounded-xl" src={ashikinImg} alt="..." />
				</div>
			</div>
		</div>
	);
};

export default Banner;

{
	/* <div className=" border border-red-500 max-w-[1560px] mx-auto flex flex-col md:flex-row">
			<div className="w-full md:w-1/2 p-5 border border-green-500">
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est rem repellendus voluptatem, labore
					animi ex! Sint iste aliquam provident quisquam incidunt quam eius est! Esse necessitatibus inventore
					voluptatibus dolor quasi.
				</p>
			</div>
			 <div className="w-full md:w-1/2 relative">
				<div className="absolute top-[50px] ">
					<img src="../../../../public/images/banner-img.jpg" className="w-96 h-80 border border-red-500" />
				</div>
				<img src={img} className="pl-[150px]" />
			</div> 
			<div style={containerStyle} className="w-full md:w-1/2">
				<div style={gradientOverlayStyle}></div>
				<img src={imgBg} style={imageStyle} alt="Image with Gradient Overlay" />
				<img src={img} className="absolute top-[100px] left-5 w-80 h-80" />
			</div>
			 <section>
				<div className="container">
					<div className="left"></div>
					<div className="right">
						<div className="content">
							<h1>This is a heading</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia assumenda dolore
								reprehenderit ullam blanditiis ex sapiente pariatur tempore incidunt facilis?
							</p>
							<a href="#" className="btn">
								Click Me
							</a>
						</div>
					</div>
				</div>
			</section>  */
}
