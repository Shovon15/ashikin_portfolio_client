import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const Main = () => {
	return (
		<div className="">
			<Header />

			<div className=" mx-auto ">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
