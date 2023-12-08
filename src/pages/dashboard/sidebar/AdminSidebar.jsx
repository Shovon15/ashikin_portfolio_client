import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Button,
} from "@material-tailwind/react";

import { MdOutlineEvent } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { CgErase } from "react-icons/cg";
import { TfiWrite } from "react-icons/tfi";
import { TfiPencilAlt } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { showSuccessToast } from "../../../components/shared/ToastMessage";

export function AdminSidebar() {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
		showSuccessToast("Logout");
		navigate("/login");
	};
	return (
		<Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl rounded-none shadow-blue-gray-900/5 bg-primary dark:bg-darkPrimary dark:border dark:border-blue-500 ">
			<div className="mb-2 p-4 flex justify-between items-center">
				<Typography variant="h5" color="blue-gray">
					Sidebar
				</Typography>
			</div>
			<List className="p-0 ">
				<NavLink
					to="/dashboard"
					className={({ isActive }) => (isActive ? `bg-gray-300 rounded-md font-bold` : ` `)}
				>
					<ListItem className=" text-lg ">
						<ListItemPrefix>
							<MdOutlineEvent className="h-5 w-5" />
						</ListItemPrefix>
						Dashboard
					</ListItem>
				</NavLink>
				<NavLink
					to="/dashboard/events"
					className={({ isActive }) => (isActive ? `bg-gray-300 rounded-md font-bold` : ` `)}
				>
					<ListItem>
						<ListItemPrefix>
							<BsPencilSquare className="h-5 w-5" />
						</ListItemPrefix>
						Events
					</ListItem>
				</NavLink>
				<NavLink
					to="/dashboard/blogs"
					className={({ isActive }) => (isActive ? `bg-gray-300 rounded-md font-bold` : ` `)}
				>
					<ListItem>
						<ListItemPrefix>
							<CgErase className="h-5 w-5" />
						</ListItemPrefix>
						Blogs
					</ListItem>
				</NavLink>
				<ListItem>
					<ListItemPrefix>
						<TfiWrite className="h-5 w-5" />
					</ListItemPrefix>
					Profile
				</ListItem>
			</List>
			<div className="my-5 w-full">
				<Button
					onClick={handleLogout}
					variant="text"
					className="px-[4rem] py-2 bg-red-500 hover:bg-red-800 active:bg-red-600 capitalize text-lg text-white"
				>
					Logout
				</Button>
			</div>
		</Card>
	);
}
export default AdminSidebar;
