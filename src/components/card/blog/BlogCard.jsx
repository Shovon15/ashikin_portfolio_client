/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import ButtonOutline from "../../Button/ButtonOutline";

const BlogCard = ({ item }) => {
	const { cover, title } = item;

	return (
		<Card className=" w-full h-full cursor-pointer shadow-none border hover:border-color-border ">
			<CardHeader floated={false} color="blue-gray" className="relative h-56 rounded-b-none m-0">
				<img className="duration-300 hover:scale-110 object-fit " src={cover} alt="card-image" />
			</CardHeader>
			<CardBody className="w-full  px-2 py-3 flex ">
				<div className="w-4/6 px-2">
					<Typography variant="h5" className="text-color-text">
						{title}
					</Typography>
				</div>
				<div>
					<ButtonOutline>Details</ButtonOutline>
				</div>
			</CardBody>
		</Card>
	);
};

export default BlogCard;
