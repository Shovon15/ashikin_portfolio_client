import { Helmet } from "react-helmet-async";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useScroll, motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BlogPage = () => {
	// const ref = useRef(null);

	const { scrollYProgress } = useScroll({
		target: "",
		offset: ["0 1", "1.33 1"],
	});

	const controls = useAnimation();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const elementOffset = window.innerHeight / 2; // Adjust as needed

			if (scrollY > elementOffset) {
				setIsVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isVisible) {
			controls.start({
				opacity: 1,
				scale: 1,
				transition: {
					duration: 0.5,
				},
			});
		}
	}, [controls, isVisible]);
	return (
		<>
			<Helmet>
				<title>Ashikin Alam | Blogs</title>
				<meta name="description" content="Ashikin Alam personal portfolio blog page" />
				<link rel="canonical" href="/blogs" />
			</Helmet>
			<div className="min-h-screen text-center">
				<HeaderText>Blog Page</HeaderText>

				<motion.div
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
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
					<p>Lorem ipsum dolor sit amet.</p>
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={controls}>
					<h1>Your Animated Heading</h1>
				</motion.div>
			</div>
		</>
	);
};

export default BlogPage;
