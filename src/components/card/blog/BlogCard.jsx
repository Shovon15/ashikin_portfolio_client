/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import ButtonOutline from "../../Button/ButtonOutline";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
	const { _id, cover, title } = item;

	return (
		<Card className="bg-color-secondary w-full h-auto max-w-[19rem] hover:ring-1 hover:ring-color-buttonRing rounded-b-none animation-blog-card">
			<CardHeader floated={false} className="h-56 m-0 rounded-b-none shadow-none bg-inherit">
				<img
					// data-aos="flip-left"
					src={cover}
					alt="card-image"
					className="object-fill h-full rounded-xl duration-300 hover:scale-110 rounded-b-none"
					width="400"
					height="200"
				/>
			</CardHeader>
			<CardBody className="mx-auto p-4">
				<Typography
					// data-aos="zoom-in"
					// data-aos-anchor-placement="top-bottom"
					className="mb-2 font-bold text-color-header h-16 overflow-y-auto my-auto text-center text-xl  normal-case"
				>
					{title}
				</Typography>
			</CardBody>
			<CardFooter className="pt-0 mx-auto">
				{_id && (
					<Link to={`/blog/${_id}`}>
						<ButtonOutline className="px-8">Details</ButtonOutline>
					</Link>
				)}
			</CardFooter>
		</Card>
	);
};

export default BlogCard;
