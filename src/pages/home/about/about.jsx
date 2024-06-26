// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { get } from "../../../utils/fetchApi";

const About = () => {
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
		<div className="text-center font-semibold">
			<>
				{profileData.length > 0 && (
					<div className="bg-color-custom">
						<div className="max-w-[1560px] mx-auto p-5 md:p-10 flex flex-col md:flex-row">
							<div className="w-full md:w-2/5 flex justify-center items-center py-5">
								<LazyLoadImage
									effect="blur"
									src={profileData[0]?.profileImage}
									alt="card-image"
									className="object-fill h-full rounded-full"
									width="250px"
									height="250px"
								/>
							</div>
							<div className="w-full md:w-3/5 p-5 md:p-10">
								<HeaderText className="">
									{profileData[0]?.profileHeader}
								</HeaderText>
								<div
									className="text-color-text text-lg py-5 text-pretty "
									dangerouslySetInnerHTML={{ __html: profileData[0]?.description }}
								/>
							</div>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default About;
