/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import ButtonOutline from "../../Button/ButtonOutline";
import { Link } from "react-router-dom";

import ImageComponent from "../../ImageComponent";

const BlogCard = ({ item }) => {
	const { slug, cover, title } = item;

	return (
		<Card className="bg-color-primary w-full h-auto max-w-[19rem] hover:ring-1 hover:ring-color-buttonRing rounded-b-none shadow-xl">
			<CardHeader floated={false} className="relative m-0 rounded-b-none shadow-none  bg-inherit">
				<div className="duration-300 hover:scale-110 rounded-b-none transition ease-in-out object-fill h-full">
					<ImageComponent src={cover} />
				</div>
			</CardHeader>
			<CardBody className="mx-auto p-4">
				<Typography
					variant="h6"
					className="mb-2 font-bold text-color-headerPrimary h-14 overflow-y-auto my-auto text-center"
				>
					{title}
				</Typography>
			</CardBody>
			<CardFooter className="pt-0 mx-auto">
				{slug && (
					<Link to={`/blog/${slug}`}>
						<ButtonOutline className="px-8">Details</ButtonOutline>
					</Link>
				)}
			</CardFooter>
		</Card>
	);
};

export default BlogCard;


//animation-blog-card