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
			<div className="">
				<div className="flex gap-5 items-center">
					<img src={avatar} className="w-24 rounded-full" />
					<div>
						<div className="flex gap-1 items-center">
							<img className="w-5 h-5" src={shieldIcon} />
							<Typography
								variant="paragraph"
								className=" text-textPrimary text-xl font-bold dark:text-darkTextPrimary "
							>
								Admin
							</Typography>
						</div>
						<Typography
							variant="h5"
							className="mb-2 text-textPrimary text-4xl dark:text-darkTextPrimary font-bold"
						>
							{name}
						</Typography>
					</div>
				</div>
				<div className="py-5 px-2 flex flex-col md:flex-row gap-5">
					<Link to="/dashboard/profile-update">
						<Button
							variant="text"
							className="bg-green-600 hover:bg-green-400 active:bg-green-700 text-white capitalize text-lg py-2"
						>
							Update Profile
						</Button>
					</Link>
					<Link to="/dashboard/password-update">
						<Button
							variant="text"
							className="bg-green-600 hover:bg-green-400 active:bg-green-700 text-white capitalize text-lg py-2"
						>
							Update Password
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DashboardOverview;
