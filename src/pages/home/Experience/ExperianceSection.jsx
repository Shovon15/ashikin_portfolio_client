/* eslint-disable no-unused-vars */
import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import BrandSlider from "./brandSlider";

const ExperianceSection = () => {
	
	const { data: brandData = [], isLoading: loading } = useQuery({
		queryKey: ["brandData"],
		queryFn: async () => {
			const res = await get("brands/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	return (
		<div className="max-w-[1560px] bg-color-primary mx-auto pt-5 md:pt-10">
			<div className=" max-w-[1560px] mx-auto">
				{loading ? (
					<div className="flex justify-center items-center h-20">
						<Spinner className="text-color-secondary" />
					</div>
				) : (
					// <div className="py-2 px-5">{brandData.length !== 0 && <BrandSwiper data={brandData} />}</div>
					<div className="py-2 px-5">{brandData.length !== 0 && <BrandSlider data={brandData} />}</div>
				)}
			</div>
			{/* {isLoading ? (
				<div className="flex justify-center items-center h-80">
					<Spinner className="text-[#6982b8]" />
				</div>
			) : (
				
			)} */}
		</div>
	);
};

export default ExperianceSection;
