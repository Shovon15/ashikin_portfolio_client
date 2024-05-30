/* eslint-disable no-unused-vars */
import HeaderText from "../../../components/shared/textHeader/HeaderText";
// import { useScroll, motion, useAnimation } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import BlogCardSkeletion from "../../../components/card/blog/BlogCardSkeletion";
import BlogCard from "../../../components/card/blog/BlogCard";
import PageHelmet from "../../../helper/PageHelmet";
import { DataContext } from "../../../context/DataContext";
import Pagination from "../../../components/pagination";
import { Button } from "@material-tailwind/react";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";


const BlogPage = () => {

	const { blogData, isBlogLoading, fetchBlogData } = useContext(DataContext);
	const [pageData, setPageData] = useState({});

	useEffect(() => {
		if (blogData) {
			setPageData(blogData.pagination);
		}
	}, [blogData]);

	const handlePageChange = (page) => {
		fetchBlogData(page)
	}

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const Loader = () => {
		return (
			<div className="flex flex-wrap gap-5 p-5 md:p-10">
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</div>
		);
	};

	return (
		<>
			<PageHelmet
				title="Ashikin Alam | Blogs"
				// description={title}
				name="ashikin alam"
				// image={cover}
				link={shareUrl}
				type="webapp"
			/>
			<div className="page-container">
				<div className="p-5">
					{isBlogLoading ? (
						<Loader />
					) : (blogData?.data?.length > 0 && (
						<div className="flex flex-wrap gap-4 justify-center py-5">
							{blogData?.data?.map((item) => (
								<div key={item._id}>
									<BlogCard item={item} />
								</div>
							))}
						</div>
					))}
					<Pagination
						paginationData={pageData}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
		</>
	);
};

export default BlogPage;
