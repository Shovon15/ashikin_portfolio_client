import { ToastContainer } from "react-toastify";
import MainRoutes from "./routes/mainRoutes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
	// When you set scrollRestoration to 'manual', you are essentially telling the browser not to attempt to automatically restore the scroll position when navigating between pages. Instead, you take control of managing the scroll position manually.
	useEffect(() => {
		window.history.scrollRestoration = "manual";
	}, []);

	return (
		<div className="bg-white dark:bg-darkPrimary ">
			<MainRoutes />
			<ToastContainer />
		</div>
	);
}

export default App;
