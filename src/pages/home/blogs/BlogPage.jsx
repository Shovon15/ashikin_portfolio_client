import { Helmet } from "react-helmet-async";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useScroll, motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LoadingSkeleton from "../../../components/card/LoadingSkeleton";

const BlogPage = () => {
	// const ref = useRef(null);

	// State to keep track of the active tab
	const [activeTab, setActiveTab] = useState("All");

	// Tab headers
	const tabHeaders = ["All", "Free", "Premium"];

	// Function to handle tab click
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		// You can perform additional actions when a tab is clicked
	};
	// -------------------------------------------

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
				</motion.div>

				<motion.div initial={{ opacity: 0, scale: 0.5 }} animate={controls} className="py-[100px]">
					<h1>Your Animated Heading</h1>
				</motion.div>
				<p className="text-color-header font-bold text-4xl capitalize text-center animation-header">
					This is a geader
				</p>

				{/* <div className="w-[800px] mx-auto animation">
					<img src="https://picsum.photos/1000/500" alt="..." />
				</div> */}
				<div className="border-2 border-red-500">
					<div>
						<div className="flex gap-5 justify-center">
							{/* Render tab headers dynamically */}
							{tabHeaders.map((tab) => (
								<div
									key={tab}
									onClick={() => handleTabClick(tab)}
									className={`tab-header border border-color-border px-3 py-2 cursor-pointer ${
										activeTab === tab ? "active" : ""
									}`}
								>
									{tab}
								</div>
							))}
						</div>
						<div className="h-80 bg-green-500">
							{/* Render tab content based on the active tab */}
							{activeTab === "All" && (
								<div className="flex gap-4 ">
									<div className="w-96 h-96 bg-red-500 rounded-md animation-event-card "></div>
									<LoadingSkeleton />
									<LoadingSkeleton />
								</div>
							)}
							{activeTab === "Free" && <div>Content for Free</div>}
							{activeTab === "Premium" && <div>Content for Premium</div>}
						</div>
					</div>
				</div>

				<div className="h-[3400px]"></div>
			</div>
		</>
	);
};

export default BlogPage;
