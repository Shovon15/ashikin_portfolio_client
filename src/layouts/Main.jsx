import { Outlet } from "react-router-dom";
import Header from "../components/shared/header/Header";
import Footer from "../components/shared/footer/Footer";

const Main = () => {
	return (
		<div className="">
			<Header />

			<div className="w-full h-full">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
