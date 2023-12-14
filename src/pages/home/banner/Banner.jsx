import { Button, Typography } from "@material-tailwind/react";
import img from "../../../assets/image/Img-1.png";
import ParticalBg from "./ParticalBg";

const Banner = () => {
	return (
		<div className="relative">
			<ParticalBg />
			<div className="max-w-[1360px] absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col-reverse gap-0 md:flex-row  w-full h-full">
				<div className="flex flex-col justify-center items-center w-full  md:w-1/2 py-5 px-5 md:px-10">
					<div className="text-start ">
						<Typography className="text-3xl md:text-4xl text-white dark:text-darkTextPrimary font-extrabold py-2">
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
					<img className="w-72 rounded-xl" src={img} alt="..." />
				</div>
			</div>
		</div>
	);
};

export default Banner;
