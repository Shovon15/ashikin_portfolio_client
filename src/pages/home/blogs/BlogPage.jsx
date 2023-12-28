import { Helmet } from "react-helmet-async";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useScroll, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { get } from "../../../utils/fetchApi";
import BlogCardSkeletion from "../../../components/card/blog/BlogCardSkeletion";
import BlogCard from "../../../components/card/blog/BlogCard";


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

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-4 py-5">
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
			<Helmet>
				<title>Ashikin Alam | Blogs</title>
				<meta name="description" content="Ashikin Alam personal portfolio blog page" />
				<link rel="canonical" href="/blogs" />
			</Helmet>
			<div className="max-w-[1560px] min-h-screen mx-auto pt-5 md:pt-10">
				<HeaderText className="pl-5 md:pl-10 text-start text-5xl">Blog</HeaderText>
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
