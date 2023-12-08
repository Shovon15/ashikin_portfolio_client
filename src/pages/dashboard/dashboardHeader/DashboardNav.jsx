import { Button, Navbar, Typography } from "@material-tailwind/react";
import { DashboardContext } from "../../../context/DashboardContext";
import { FaBars } from "react-icons/fa6";
import { useContext } from "react";
import { Link } from "react-router-dom";
const DashboardNav = () => {
	const { activeMenu, setActiveMenu, screenSize } = useContext(DashboardContext);
	// console.log({ activeMenu, setActiveMenu, screenSize });
	return (
		<div className="">
			<div
				className="!bg-white  mx-auto rounded-none px-4 py-2 lg:px-8 "
				style={{ boxShadow: "0 5px 2px -2px rgba(0, 0, 0, 0.1)" }}
			>
				<div className="flex justify-between items-center ">
					<div>
						<Button
							variant="text"
							onClick={() => setActiveMenu(!activeMenu)}
							className="rounded-full py-3 px-3"
						>
							<FaBars className="w-5 h-5" />
						</Button>
						<Link to="/">
							<Button>home</Button>
						</Link>
					</div>
					<div>
						<Button variant="filled" className="bg-buttonDanger capitalize text-lg py-2">
							Logout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardNav;
