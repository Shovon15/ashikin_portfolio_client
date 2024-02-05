// import { useEffect, useState } from "react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

const About = () => {
	// const [testData, setTestData] = useState(null);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch("http://localhost:5000/test", {
	// 				method: "GET",
	// 				credentials: "include", // Include credentials for cross-origin requests
	// 			});

	// 			if (!response.ok) {
	// 				throw new Error(`HTTP error! Status: ${response.status}`);
	// 			}

	// 			const data = await response.json();
	// 			setTestData(data);
	// 		} catch (error) {
	// 			setError(error.message);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	return (
		<div className="min-h-screen pt-20 text-center font-semibold">
			<HeaderText className="pt-20">Coming soon</HeaderText>
			{/* <div>{error ? <p>Error: {error}</p> : <p>{testData ? testData.message : "Loading..."}</p>}</div> */}
		</div>
	);
};

export default About;
