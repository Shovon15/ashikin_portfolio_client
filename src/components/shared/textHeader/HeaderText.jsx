/* eslint-disable react/prop-types */

import Aos from "aos";
import { useEffect } from "react";

const HeaderText = ({ className, children }) => {
	// useEffect(() => {
	// 	Aos.init({ duration: 1000 });
	// }, []);
	return (
		<p
			// data-aos="zoom-in"
			className={`${className} text-center font-bold text-3xl md:text-4xl text-color-header capitalize`}
		>
			{children}
		</p>
	);
};

export default HeaderText;
