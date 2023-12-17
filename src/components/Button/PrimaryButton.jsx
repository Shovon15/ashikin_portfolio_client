/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import Aos from "aos";

import { useEffect } from "react";

const PrimaryButton = ({ className, children }) => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);
	return (
		<Button
			className={`${className}  bg-gradient-to-r from-cyan-500 to-blue-700  py-3 capitalize text-md shadow-xl focus:shadow-xl active:shadow-2xl`}
			
		>
			{children}
		</Button>
	);
};

export default PrimaryButton;
