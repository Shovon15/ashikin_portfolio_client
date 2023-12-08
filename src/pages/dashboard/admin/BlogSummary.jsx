import { CardBody, Typography } from "@material-tailwind/react";
import blogImg from "../../../assets/image/blog.jpg";
export function BlogSummary() {
	return (
		<div className="mt-6 rounded-md shadow-xl border border-primary dark:border-borderDark cursor-pointer hover:shadow-xxl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 dark:bg-darkSecondary">
			<CardBody className="flex items-center">
				<div>
					<img className="w-44 " src={blogImg} />
				</div>
				<div className="w-56 flex flex-col items-center">
					<Typography variant="h5" className="mb-2 text-textPrimary text-4xl dark:text-darkTextPrimary">
						5
					</Typography>
					<Typography variant="h5" className="mb-2 text-textPrimary text-4xl dark:text-darkTextPrimary">
						Blogs
					</Typography>
				</div>
			</CardBody>
		</div>
	);
}

export default BlogSummary;
