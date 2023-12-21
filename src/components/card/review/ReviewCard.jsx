import { Typography } from "@material-tailwind/react";
import { LuQuote } from "react-icons/lu";
const ReviewCard = ({ data }) => {
	const { id, image, text } = data;
	return (
		<div className=" bg-gradient-to-r from-cyan-500 to-blue-700 p-2 md:p-5 shadow-xl h-[34rem] md:h-[25rem] rounded-3xl">
			<LuQuote className="w-10 h-10 rotate-180 text-gray-400" />
			<div className="text-justify px-5 py-2 text-md md:text-lg text-gray-300">
				<p>{text}</p>
			</div>
			<LuQuote className="w-10 h-10 ml-auto  text-gray-500" />

			<div className="flex flex-col justify-center items-center">
				<img src={image} alt="..." className="rounded-full w-20 h-20" />
				<Typography variant="h6" color="blue-gray" className="font-bold">
					John Doe
				</Typography>
			</div>
		</div>
	);
};

export default ReviewCard;
