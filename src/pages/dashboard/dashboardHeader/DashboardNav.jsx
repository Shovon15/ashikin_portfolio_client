import { IconButton, Typography } from "@material-tailwind/react";
import { DashboardContext } from "../../../context/DashboardContext";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import ThemeButton from "../../../components/Button/ThemeButton";
const DashboardNav = () => {
	const { toggleDrawer, isSidebarOpen, setIsSidebarOpen } = useContext(DashboardContext);
	const { user } = useContext(AuthContext);
	const { name, avatar } = user;

	return (
		<div
			className="w-full flex items-center sticky inset-0 z-10 px-5 py-2 lg:px-10  bg-white dark:bg-bgSecondary"
			style={{ boxShadow: "0 5px 2px -2px rgba(0, 0, 0, 0.1)" }}
		>
			<div className="flex justify-between lg:justify-start lg:gap-5 items-center">
				<div className="flex gap-2 items-center">
					<img src={avatar} alt="..." className="w-12 h-12 rounded-full" />
					<Typography variant="h2" className="text-lg text-textPrimary">
						{name}
					</Typography>
				</div>
				{/* ---------------------sidebar button------------------- */}
				{!isSidebarOpen && (
					<IconButton
						variant="text"
						className=" h-6 w-6 text-gray-800 dark:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent hidden lg:block"
						ripple={false}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						{isSidebarOpen ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</IconButton>
				)}
			</div>
			<div className="ml-auto flex items-center gap-3">
				<ThemeButton />
				{/* ---------------------drawer button------------------- */}
				<IconButton
					onClick={toggleDrawer}
					variant="text"
					className="ml-auto h-6 w-6 text-black dark:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden "
					ripple={false}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</IconButton>
			</div>
		</div>
	);
};

export default DashboardNav;
