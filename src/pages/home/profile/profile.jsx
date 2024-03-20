import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
const Profile = () => {
	const { data: profileData = [], isLoading } = useQuery({
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
		<>
			{profileData.length > 0 && (
				<div className="bg-color-secondary">
					<div className="max-w-[1560px] mx-auto p-5 md:p-10 flex flex-col md:flex-row">
						<div className="w-full md:w-2/5 flex justify-center items-center py-5">
							<LazyLoadImage
								effect="blur"
								src={profileData[0]?.profileImage}
								alt="card-image"
								className="object-fill h-full rounded-full"
								width="200px"
								height="200px"
							/>
						</div>
						<div className="w-full md:w-3/5 p-5 md:p-10">
							<HeaderText className="text-color-headerSecondary">
								{profileData[0]?.profileHeader}
							</HeaderText>
							<div
								className="text-white py-5 text-pretty "
								dangerouslySetInnerHTML={{ __html: profileData[0]?.description }}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
