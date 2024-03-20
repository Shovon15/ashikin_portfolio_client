import { Spinner, Typography } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import BrandSwiper from "./brandSwiper";
// import BrandSwiper from "./brandSwiper";

const ExperianceSection = () => {
	const { data: socialData = [], isLoading } = useQuery({
		queryKey: ["socialData"],
		queryFn: async () => {
			const res = await get("social/all");
			const data = res.data.payload.data;

			return data;
		},
	});
	const { data: brandData = [], isLoading: loading } = useQuery({
		queryKey: ["brandData"],
		queryFn: async () => {
			const res = await get("brands/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	return (
		<div className="max-w-[1560px] mx-auto">
			<div className="bg-[#22417a] max-w-[1560px] mx-auto shadow-xl">
				{loading ? (
					<div className="flex justify-center items-center h-20">
						<Spinner className="text-color-secondary" />
					</div>
				) : (
					<div className="py-2 px-5">{brandData.length !== 0 && <BrandSwiper data={brandData} />}</div>
				)}
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center h-80">
					<Spinner className="text-[#6982b8]" />
				</div>
			) : (
				<div className="p-10 flex flex-wrap gap-5 justify-center items-center md:justify-evenly ">
					{socialData &&
						socialData.map(({ name, logo, description, socialLink, isPublished }) =>
							isPublished ? (
								<a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer">
									<div className="flex gap-3 border shadow-xl rounded-xl  justify-center py-2 px-3 w-44">
										<div className="flex justify-center items-center">
											<LazyLoadImage
												effect="blur"
												src={logo}
												alt="card-image"
												className="object-fill "
												width="40"
												height="40"
											/>
										</div>
										<div>
											<Typography variant="h6" className="font-bold text-color-secondary">
												{name.charAt(0).toUpperCase() + name.slice(1)}
											</Typography>
											<Typography variant="small" className="font-medium ">
												{description}
											</Typography>
										</div>
									</div>
								</a>
							) : null
						)}
				</div>
			)}
		</div>
	);
};

export default ExperianceSection;
