import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import { get } from "../../../utils/fetchApi";

const PressPage = () => {
	const { data: pressData = [], isLoading } = useQuery({
		queryKey: ["pressData"],
		queryFn: async () => {
			const res = await get("press/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="min-h-screen max-w-[1560px] mx-auto p-5 md:p-10">
			<HeaderText>Press</HeaderText>

			{pressData &&
				pressData
					.filter((item) => item.isPublished) // Filter items based on isPublished
					.map(({ _id, image, heading, buttonText, description, link }) => (
						<div key={_id} className="flex flex-col md:flex-row max-w-[1200px] mx-auto border border-gray-300 rounded-xl shadow-lg my-3">
							<div className="w-full md:w-1/2 p-5 md:p-10 md:pr-2 flex justify-center items-center">
								<LazyLoadImage
									effect="blur"
									src={image}
									alt="card-image"
									className="object-fill max-h-72 rounded-md"
								/>
							</div>
							<div className="w-full flex flex-col justify-center md:w-1/2 p-5 md:p-10 md:pl-2">
								<Typography variant="h4" className="font-bold text-color-primary capitalize">
									{heading}
								</Typography>

								<div className=" py-3 text-pretty " dangerouslySetInnerHTML={{ __html: description }} />

								<a href={link} target="_blank" rel="noopener noreferrer">
									<PrimaryButton>{buttonText}</PrimaryButton>
								</a>
							</div>
						</div>
					))}
		</div>
	);
};

export default PressPage;
