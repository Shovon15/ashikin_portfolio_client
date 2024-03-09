import { useEffect, useState } from "react";
import { get } from "../utils/fetchApi";

import ClipLoader from "react-spinners/ClipLoader";

const Logo = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

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

	useEffect(() => {
		window.addEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));

		return () => {
			window.removeEventListener("scroll", () => setScrollPosition(Math.round(window.scrollY)));
		};
	}, []);

	return (
		<div className={`${scrollPosition > 0 ? "h-14" : "h-16"}  w-48 transform transition duration-500`}>
			{isLoading ? (
				<ClipLoader color="#0c0c0c" size={30} aria-label="Loading Spinner" data-testid="loader" />
			) : (
				logoData && <img src={logoData.logoImage} alt="..." className="max-h-16 w-48" />
			)}
		</div>
	);
};

export default Logo;
