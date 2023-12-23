import { Typography } from "@material-tailwind/react";
import { LuQuote } from "react-icons/lu";
import PropTypes from "prop-types";

const ReviewCard = ({ data }) => {
	const { image, text, name, title } = data;
	return (
		<div className="bg-color-primary p-2 md:p-5 shadow-xl h-[34rem] md:h-[25rem] rounded-3xl">
			<LuQuote className="w-7 md:w-10 h-7 md:h-10 rotate-180 text-gray-700" />
			<div className="h-[20rem] md:h-44 flex items-center text-justify px-5 py-2 text-sm md:text-md lg:text-lg text-color-text  overflow-y-auto">
				<p>{text}</p>
			</div>
			<LuQuote className="w-7 md:w-10 h-7 md:h-10 ml-auto  text-gray-700" />

			<div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
				<img src={image} alt="..." className="rounded-full w-12 h-12 md:w-20 md:h-20" />
				<div className="w-60 flex flex-col items-center">
					<Typography variant="h5" className="font-bold text-color-header capitalize">
						{name}
					</Typography>
					<Typography className="font-sm text-sm text-color-text capitalize">{title}</Typography>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;

ReviewCard.propTypes = {
	data: PropTypes.object,
};
