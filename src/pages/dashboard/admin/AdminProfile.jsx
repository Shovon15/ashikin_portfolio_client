import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const AdminProfile = () => {
	const { user } = useContext(AuthContext);
	return (
		<>
			<p>user:{user?.name}</p>
		</>
	);
};

export default AdminProfile;
