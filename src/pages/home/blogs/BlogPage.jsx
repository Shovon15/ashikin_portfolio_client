import { Helmet } from "react-helmet-async";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const BlogPage = () => {
	return (
		<>
			<Helmet>
				<title>Ashikin Alam | Blogs</title>
				<meta name="description" content="Ashikin Alam personal portfolio blog page" />
				<link rel="canonical" href="/blogs" />
			</Helmet>
			<div className="h-screen text-center">
				<HeaderText>Blog Page</HeaderText>
			</div>
		</>
	);
};

export default BlogPage;
