/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { RiStarSFill } from "react-icons/ri";

const BlogCard = ({ item }) => {
	const { image, rating, title, desc } = item;

	// console.log({ image, rating, title, desc });
	return (
		<Card className=" w-full h-full cursor-pointer shadow-none border border-gray-500 hover:border-green-500">
			<CardHeader floated={false} color="blue-gray" className="relative h-56 rounded-b-none m-0">
				<img className="duration-300 hover:scale-110 object-fit " src={image} alt="card-image" />
			</CardHeader>
			<CardBody className="w-full  px-2 py-3 flex ">
				<div className="w-1/6 rounded-lg ">{/* <img src={logo} alt="" className="w-full" /> */}</div>
				<div className="w-4/6 px-2">
					<Typography variant="h5" color="blue-gray" className="">
						{title}
					</Typography>
					<Typography variant="paragraph" color="blue-gray" className="">
						{desc}
					</Typography>
				</div>
				<div className="w-1/6 flex gap-1 justify-center items-center bg-green-500 rounded-md h-6 text-white">
					<RiStarSFill className="w-5 h-5" />
					<p className="">{rating}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default BlogCard;
