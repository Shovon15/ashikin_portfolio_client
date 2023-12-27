import { Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import { Link } from "react-router-dom";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const BannerManage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [bannerData, setBannerData] = useState({});

	const { scrollPosition } = useContext(DashboardContext);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await get("banner");
			setBannerData(response.data.payload.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="min-h-[50rem]">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Banner Manage</HeaderText>
			<div className="flex justify-center md:justify-end py-5 pr-5">
				<Link to="/dashboard/banner/update-banner">
					<IconButton>update banner</IconButton>
				</Link>
			</div>
			{bannerData ? (
				<div className="relative h-[45rem] md:h-[30rem] flex">
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundImage: `url(${bannerData?.backgroundImage})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							opacity: 0.4 - Math.min(scrollPosition / 700, 1),
						}}
					></div>
					<div className="flex flex-col md:flex-row gap-0 md:gap-5 z-10">
						<div className="p-5 md:p-10 w-full md:w-7/12 flex flex-col justifystart md:justify-center">
							<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
								{bannerData?.bannerHeader}
							</Typography>
							<Typography className="text-md text-color-text pt-5">{bannerData?.bannerText}</Typography>
						</div>
						<div className="w-full md:w-5/12 p-5 md:p-10 max-h-[40rem] max-w-[20rem] flex flex-col justify-start md:justify-end mx-auto">
							<img
								src={bannerData?.portfolioImage}
								className="object-cover  rounded-lg"
								alt="secondary-image"
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center itmes-center min-h-screen">
					<p className="text-xl text-color-text">No content found please update banner</p>
					<Link to="/dashboard/banner/create-banner">
						<IconButton>Create banner</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default BannerManage;
