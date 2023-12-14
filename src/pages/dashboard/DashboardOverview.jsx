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
			{/* <div>
				<p>user name:{user.name}</p>
				<p>user id:{user.id}</p>
				<Button onClick={handleLogout}>Logout</Button>
			</div> */}
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								Color
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Apple MacBook Pro 17
							</th>
							<td className="px-6 py-4">Silver</td>
							<td className="px-6 py-4">Laptop</td>
							<td className="px-6 py-4">$2999</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Microsoft Surface Pro
							</th>
							<td className="px-6 py-4">White</td>
							<td className="px-6 py-4">Laptop PC</td>
							<td className="px-6 py-4">$1999</td>
						</tr>
						<tr className="bg-white dark:bg-gray-800">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
							>
								Magic Mouse 2
							</th>
							<td className="px-6 py-4">Black</td>
							<td className="px-6 py-4">Accessories</td>
							<td className="px-6 py-4">$99</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DashboardOverview;
