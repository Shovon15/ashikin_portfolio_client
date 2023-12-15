// import { useRef } from "react";
// import BundleEditor from "../../components/BundleEditor";
import MultiLayer from "../../components/MultiLayer";
import Banner from "./banner/Banner";
import { motion } from "framer-motion";
import EventSection from "./events/EventSection";
import BLogSection from "./blogs/BLogSection";
import FaqSection from "./about/FaqSection";
import ContactSection from "./contact/ContactSection";

const HomePage = () => {
	// const editorRef = useRef(null);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	return (
		<div>
			<Banner />
			<div className=" max-w-[1300px] mx-auto p-5">
				<EventSection />
				<BLogSection />
				{/* <MultiLayer /> */}
				{/*<div className="">
				<motion.div animate={{ y: -100, scale: 1 }} initial={{ scale: 0 }} className="bg-red-500 ">
					1
				</motion.div>
			</div> */}
				{/* <div className="w-full bg-[#06141D]">
				<div className="max-w-lg space-y-4 mx-auto py-24 text-neutral-300">
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam quae earum nobis quasi repellat.
						Amet facere nulla dolorum accusantium sit dolores odio excepturi facilis laboriosam officiis
						dolorem, nobis reprehenderit molestiae.
					</p>
				</div>
			</div> */}
				{/* <div>
				<BundleEditor
					onInit={(evt, editor) => (editorRef.current = editor)}
					initialValue="<p>This is the initial content of the editor.</p>"
					init={{
						height: 500,
						menubar: false,
						plugins: [
							"advlist",
							"anchor",
							"autolink",
							"help",
							"image",
							"link",
							"lists",
							"searchreplace",
							"table",
							"wordcount",
						],
						toolbar:
							"undo redo | blocks | " +
							"bold italic forecolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help",
						content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
				/>
				<button onClick={log}>Log editor content</button>
			</div> */}
				<ContactSection />
				<FaqSection />
			</div>
		</div>
	);
};

export default HomePage;
