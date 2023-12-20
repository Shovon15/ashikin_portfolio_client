/* eslint-disable react/prop-types */

import Aos from "aos";
import { useEffect } from "react";

const HeaderText = ({ className, children }) => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);
	return (
		<p data-aos="fade-up" className={`${className} text-center font-bold text-2xl md:text-4xl text-textPrimary `}>
			{children}
		</p>
	);
};

export default HeaderText;
