import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/mainRoutes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/shared/LoadingSpinner";

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

	return (
		<div className="bg-white dark:bg-bgSecondary  !scroll-smooth">
			{loading ? (
				// Loader component or loading indicator
				<LoadingSpinner />
			) : (
				// Main content
				<>
					<MainRoutes />
					<ToastContainer />
				</>
			)}
		</div>
	);
}

export default App;
