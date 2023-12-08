import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import img from "../assets/image/mountain_PNG18.png";
import Banner from "../pages/home/banner/Banner";
export default function MultiLayer() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<div ref={ref} className="w-full h-[25rem] overflow-hidden relative grid place-items-center">
			<motion.div style={{ y: textY }} className="font-bold text-white text-7xl md:text-9xl relative z-10">
				<Banner/>
			</motion.div>

			{/* <motion.div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `${img}`,
					backgroundPosition: "bottom",
					backgroundSize: "cover",
					y: backgroundY,
				}}
			/>
			<div
				className="absolute inset-0 z-20"
				style={{
					backgroundImage: `url(/image-bottom.png)`,
					backgroundPosition: "bottom",
					backgroundSize: "cover",
				}}
			/> */}
		</div>
	);
}
