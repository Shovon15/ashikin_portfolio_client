import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@material-tailwind/react";
import { useEffect } from "react";
import Aos from "aos";
const GoBackButton = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);

	return (
		<Button
			onClick={goBack}
			variant="text"
			className="flex gap-2 items-center capitalize text-md text-textSecondary hover:text-gray-700 dark:text-white dark:bg-blue-300 px-2 py-2"
			// data-aos="fade-up"
		>
			<IoIosArrowBack className="w-4 h-4" />
			Back
		</Button>
	);
};

export default GoBackButton;
