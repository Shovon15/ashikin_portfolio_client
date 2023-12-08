import { Button, Typography } from "@material-tailwind/react";
import BlogSwiper from "./BlogSwiper";

const BLogSection = () => {
	return (
		<div>
			<Typography variant="h2" color="blue-gray" className="flex justify-center font-bold mb-3 dark:text-white">
				Blogs
			</Typography>
			<BlogSwiper />
			<div className="text-center py-5">
				<Button className="text-white bg-cyan-600">View More</Button>
			</div>
		</div>
	);
};

export default BLogSection;
