import { Typography } from "@material-tailwind/react";

import GoBackButton from "../../../components/Button/GoBackButton";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";
import { Link } from "react-router-dom";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import BannerSwipper from "../../home/banner/bannerSwipper";

const BannerManage = () => {
	const {
		data: bannerData = [],
		// refetch,
		isLoading,
	} = useQuery({
		queryKey: ["bannerData"],
		queryFn: async () => {
			const res = await get("banner");
			const data = res.data.payload.data;

			return data;
		},
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="">
			<div>
				<GoBackButton />
			</div>
			<HeaderText>Banner Manage</HeaderText>
			<div className="flex justify-center md:justify-end py-5 pr-5">
				<Link to="/dashboard/banner/update-banner">
					<IconButton>update banner</IconButton>
				</Link>
			</div>
			{bannerData.length > 0 ? (
				<div className="bg-color-secondary pt-5">
					<div className="max-w-[1000px] mx-auto flex flex-col md:flex-row ">
						<div className="p-5 md:p-10 w-full md:w-5/12 flex flex-col justify-start md:justify-center">
							<Typography className="text-4xl lg:text-5xl font-bold text-color-header">
								{bannerData[0]?.bannerHeader}
							</Typography>
							<Typography className="text-lg text-color-text pt-5">
								{bannerData[0]?.bannerText}
							</Typography>
						</div>
						<div className="w-full md:w-7/12 rounded-xl">
							<BannerSwipper imageList={bannerData[0]?.imageList} />
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col justify-center items-center gap-5 min-h-screen">
					<p className="text-xl text-color-text">No content found please create banner</p>
					<Link to="/dashboard/banner/create-banner">
						<IconButton>Create banner</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default BannerManage;
