import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../components/shared/ToastMessage";

const DashboardOverview = () => {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("user");
		setUser(null);
		showSuccessToast("Logout");
		navigate("/login");
	};
	return (
		<div>
			<p>DashboardOverview</p>
			<div>
				<p>user name:{user.name}</p>
				<p>user id:{user.id}</p>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</div>
	);
};

export default DashboardOverview;
