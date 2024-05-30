import { useContext } from "react";


import { Spinner } from "@material-tailwind/react";
import { DataContext } from "../context/DataContext";

const Logo = () => {
const {logoData, isLogoLoading}= useContext(DataContext)

	

	// useEffect(() => {
	// 	window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));

	// 	return () => {
	// 		window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
	// 	};
	// }, []);

	return (
		//${scrollPosition > 0 ? "h-14" : "h-16"}
		<div className={` transform transition duration-500 flex items-center h-full`}>
			{isLogoLoading ? (
				<div className="flex justify-center items-center ">
					<Spinner className="text-color-secondary " />
				</div>
			) : (
				logoData && <img src={logoData.logoImage} alt="logo" className="w-full h-full" />
			)}
		</div>
	);
};

export default Logo;
