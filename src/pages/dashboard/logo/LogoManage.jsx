import { useContext} from "react";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { DataContext } from "../../../context/DataContext";

const LogoManage = () => {
	const {logoData, isLogoLoading} = useContext(DataContext);

	if (isLogoLoading) {
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
