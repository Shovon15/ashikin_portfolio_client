import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const BlogManage = () => {
	return (
		<div>
			<p className="text-center text-3xl font-bold">Blog Manage</p>
			<Link to="/dashboard/blogs/write-blog">
				<Button>Add Blog</Button>
			</Link>
		</div>
	);
};

export default BlogManage;
