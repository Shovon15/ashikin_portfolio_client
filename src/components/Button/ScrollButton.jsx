import { useContext } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { DashboardContext } from "../../context/DashboardContext";

const ScrollButton = () => {
	const { scrollPosition } = useContext(DashboardContext);

	const handleScroll = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	return (
		<button
			onClick={handleScroll}
			style={{ zIndex: "999" }}
			className={`fixed  bottom-5 right-5 bg-color-secondary text-color-primary
              rounded-full px-2 py-2 shadow-md hover:shadow-xl hover:text-color-header ${
					scrollPosition > 100 ? "block " : "hidden"
				}`}
		>
			<BiUpArrowAlt className="text-2xl" />
		</button>
	);
};

export default ScrollButton;
