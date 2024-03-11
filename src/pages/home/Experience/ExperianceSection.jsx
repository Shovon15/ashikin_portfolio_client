import { Typography } from "@material-tailwind/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";


const ExperianceSection = () => {
	const {
		data: socialData = [],
		isLoading,
	} = useQuery({
		queryKey: ["socialData"],
		queryFn: async () => {
			const res = await get("social/all");
			const data = res.data.payload.data;

			return data;
		},
	});



	return (
		<div className="relative p-0 md:p-10 bg-color-secondary z-20">
			<div className="absolute -mt-10 md:-mt-24 mx-[2rem] md:mx-[3rem] lg:mx-[10rem] shadow-xl bg-color-secondary rounded-xl animation-body">
				<Typography
					variant="paragraph"
					className="text-color-text text-center p-5 md:py-10 md:px-[3rem] lg:px-[10rem] font-semibold"
				>
					Celebrated Leadership Icon and Trusted Advisor to Fortune 100 Companies, Sport Legends, Elite
					Performers and Titans of Industryo
				</Typography>
			</div>
			{isLoading ? (
				<div className=" flex justify-center items-center mt-36 min-h-80">
					<div className="spinner">
						<div className="spinner-circle"></div>
					</div>
				</div>
			) : (
				<div className="pt-[9rem] md:pt-[6rem]  py-10 flex flex-wrap gap-5 justify-center items-center md:justify-evenly">
					{socialData &&
						socialData.map(({ name, logo, description, socialLink }) => (
							<a key={socialLink} href={socialLink} target="_blank" rel="noopener noreferrer">
								<div className="flex gap-3 bg-color-primary shadow-xl rounded-xl w-72 p-3 animation-experience-section">
									<LazyLoadImage
										effect="blur"
										src={logo}
										alt="card-image"
										className="object-fill"
										width="50"
										height="50"
									/>

									<div>
										<Typography variant="h5" className="font-bold text-color-header">
											{name}
										</Typography>
										<Typography variant="paragraph" className="text-color-text">
											{description}
										</Typography>
									</div>
								</div>
							</a>
						))}
				</div>
			)}
		</div>
	);
};

export default ExperianceSection;
