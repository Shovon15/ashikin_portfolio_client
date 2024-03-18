import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import GoBackButton from "../../../components/Button/GoBackButton";

import { Link } from "react-router-dom";
import IconButton from "../../../components/Button/IconButton";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const AboutManager = () => {
	const {
		data: profileData = [],
		isLoading,
	} = useQuery({
		queryKey: ["profileData"],
		queryFn: async () => {
			const res = await get("profile");
			const data = res.data.payload.data;

			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div>
			<div>
				<GoBackButton />
			</div>
			<HeaderText>About Profile Manage</HeaderText>
			{profileData.length > 0 ? (
				<>
					<div className="flex justify-center md:justify-end py-5 pr-5">
						<Link to="/dashboard/about/update-about">
							<IconButton>update Profile</IconButton>
						</Link>
					</div>
					<div className="bg-color-secondary p-5 md:p-10 flex flex-col md:flex-row">
						<div className="w-full md:w-1/3 flex justify-center items-center">
							<LazyLoadImage
								effect="blur"
								src={profileData[0]?.profileImage}
								alt="profile-image"
								className="object-fill h-full rounded-full"
								width="200px"
								height="200px"
							/>
						</div>
						<div className="w-full md:w-2/3">
							<HeaderText>{profileData[0]?.profileHeader}</HeaderText>
							<div
								className="text-white text-pretty "
								dangerouslySetInnerHTML={{ __html: profileData[0]?.description }}
							/>
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-col justify-center items-center gap-5 min-h-screen">
					<p className="text-xl text-color-text">No content found please create profile</p>
					<Link to="/dashboard/about/create-about">
						<IconButton>Create Profile</IconButton>
					</Link>
				</div>
			)}
		</div>
	);
};

export default AboutManager;
