import { Button, Typography } from "@material-tailwind/react";
import SvgImage from "../../../components/SVGImage";
import RocketSvg from "../../../components/shared/RocketSvg";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import EventSummary from "./EventSummary";
import BlogSummary from "./BlogSummary";
import shieldIcon from "../../../assets/icon/shield.png";

const AdminProfile = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="min-h-screen">
			<div className="">
				<div className="flex gap-5 items-center">
					<img src="https://i.ibb.co/r3bmK5n/tom.png" className="w-44 rounded-full" />
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
							{user.name}
						</Typography>
					</div>
				</div>
				<div className="py-5 px-2">
					<Button
						variant="text"
						className="bg-green-600 hover:bg-green-400 active:bg-green-700 text-white capitalize text-lg py-2"
					>
						Update Profile
					</Button>
				</div>
			</div>
			<div className="w-full flex gap-12 justify-center items-center px-10 ">
				<EventSummary />
				<BlogSummary />
			</div>
		</div>
	);
};

export default AdminProfile;
