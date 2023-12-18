import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import shieldIcon from "../../assets/icon/shield.png";

const DashboardOverview = () => {
	const { user } = useContext(AuthContext);
	const { avatar, name } = user;
	return (
		<div className="min-h-screen">
			<div className="flex gap-5 items-center">
				<img src={avatar} className="w-24 rounded-full" />
				<div>
					<div className="flex gap-1 items-center">
						<img className="w-5 h-5" src={shieldIcon} />
						<Typography
							variant="paragraph"
							className=" text-textPrimary text-md md:text-xl font-bold dark:text-darkTextPrimary "
						>
							Admin
						</Typography>
					</div>
					<Typography
						variant="h5"
						className="mb-2 text-textPrimary text-3xl md:text-4xl dark:text-darkTextPrimary font-bold"
					>
						{name}
					</Typography>
				</div>
			</div>
			<div className="py-5 flex flex-col md:flex-row gap-5 ">
				<Link to="/dashboard/profile-update" className="w-[196px]">
					<Button
						variant="text"
						className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white capitalize text-lg 
						py-2 px-9"
					>
						Update Profile
					</Button>
				</Link>
				<Link to="/dashboard/password-update" className="w-[196px]">
					<Button
						variant="text"
						className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white capitalize 
						text-lg py-2"
					>
						Update Password
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default DashboardOverview;
