import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/mainRoutes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import LoadingSpinner from "./components/shared/loadingSpinner/LoadingSpinner";
import ScrollButton from "./components/Button/ScrollButton";
import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
	const [loading, setLoading] = useState(true);

	// Simulating a delay (replace this with your actual data fetching or initialization logic)
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	// When you set scrollRestoration to 'manual', you are essentially telling the browser not to attempt to automatically restore the scroll position when navigating between pages. Instead, you take control of managing the scroll position manually.
	useEffect(() => {
		window.history.scrollRestoration = "manual";
	}, []);
	// https://i.ibb.co/M9mb97w/bg.jpg
	// https://i.ibb.co/XkX5T9w/creative-people-working-office.jpg
	return (
		<div className="bg-color-primary">
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<MainRoutes />
					<ToastContainer />
					<ScrollButton />
				</>
			)}
		</div>
	);
}

export default App;
