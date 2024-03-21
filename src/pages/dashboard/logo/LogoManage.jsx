import { useEffect, useState } from "react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import { Link } from "react-router-dom";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const LogoManage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [logoData, setLogoData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await get("logo");
				setLogoData(response.data.payload.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	// console.log(logoData, "bannerData");

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-screen">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Logo Manage</HeaderText>
			<div className="flex justify-center md:justify-end py-5 pr-5">
				{logoData && (
					<Link to="/dashboard/logo/update-logo">
						<IconButton>Update Logo</IconButton>
					</Link>
				)}
			</div>
			{logoData ? (
				<div className="flex justify-center items-center">
					<div className="max-w-80 w-80 h-80  border border-dashed p-2 flex justify-center items-center">
						<img src={logoData?.logoImage} className="object-fill rounded-lg" alt="logo-image" />
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-3 justify-center items-center min-h-80">
					<p className="text-xl text-color-primary">No content found please create logo</p>
					<Link to="/dashboard/logo/create-logo">
						<IconButton>Create logo</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default LogoManage;
