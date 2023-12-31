import HeaderText from "../../../components/shared/textHeader/HeaderText";
// import { useScroll, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { get } from "../../../utils/fetchApi";
import BlogCardSkeletion from "../../../components/card/blog/BlogCardSkeletion";
import BlogCard from "../../../components/card/blog/BlogCard";
import PageHelmet from "../../../helper/PageHelmet";

const BlogPage = () => {
	const [blogData, setBlogData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const res = await get("blogs/published");
			setIsLoading(false);
			setBlogData(res.data.payload.data);
		};
		fetchData();
	}, []);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-4 py-5 pt-[150px]">
				<BlogCardSkeletion />
				<BlogCardSkeletion />
				<BlogCardSkeletion />
				<BlogCardSkeletion />
			</div>
		);
	}
	// -------------------------------------------

	// const { scrollYProgress } = useScroll({
	// 	target: "",
	// 	offset: ["0 1", "1.33 1"],
	// });

	// const controls = useAnimation();
	// const [isVisible, setIsVisible] = useState(false);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const scrollY = window.scrollY;
	// 		const elementOffset = window.innerHeight / 2; // Adjust as needed

	// 		if (scrollY > elementOffset) {
	// 			setIsVisible(true);
	// 		}
	// 	};

	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);

	// useEffect(() => {
	// 	if (isVisible) {
	// 		controls.start({
	// 			opacity: 1,
	// 			scale: 1,
	// 			transition: {
	// 				duration: 0.5,
	// 			},
	// 		});
	// 	}
	// }, [controls, isVisible]);
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
				<HeaderText className="pl-5 md:pl-10 text-start text-4xl md:text-5xl">Blog</HeaderText>
				<div className="p-5">
					{blogData.length > 0 && (
						<div className="flex flex-wrap gap-4 justify-center py-5">
							{blogData.map((item) => (
								<div key={item._id}>
									<BlogCard item={item} />
								</div>
							))}
						</div>
					)}
				</div>

				{/* <motion.div
					style={{ scale: scrollYProgress, opacity: scrollYProgress }}
					// ref={ref}
					className="flex flex-col gap-10 center"
				>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>

					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={controls} className="py-[100px]">
					<h1>Your Animated Heading</h1>
				</motion.div> */}
			</div>
		</>
	);
};

export default BlogPage;
