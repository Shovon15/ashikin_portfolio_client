import { useEffect, useState } from "react";
import { get } from "../utils/fetchApi";

import { Spinner } from "@material-tailwind/react";

const Logo = () => {
	// const [scrollPosition, setScrollPosition] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [logoData, setLogoData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await get("logo");
				setLogoData(response.data.payload.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	// useEffect(() => {
	// 	window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));

	// 	return () => {
	// 		window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
	// 	};
	// }, []);

	return (
		//${scrollPosition > 0 ? "h-14" : "h-16"}
		<div className={` transform transition duration-500 flex items-center h-full`}>
			{isLoading ? (
				<div className="flex justify-center items-center ">
					<Spinner className="text-[#4480a3]" />
				</div>
			) : (
				// logoData && <img src={logoData.logoImage} alt="..." className="w-[65px] h-[65px]" />
				logoData && <img src={logoData.logoImage} alt="logo" className="w-full h-full" />
			)}
		</div>
	);
};

export default Logo;
