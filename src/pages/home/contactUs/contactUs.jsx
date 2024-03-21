import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Typography } from "@material-tailwind/react";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";

const ContactUs = () => {
	const { data: contactData = [], isLoading } = useQuery({
		queryKey: ["contactData"],
		queryFn: async () => {
			const res = await get("contact/all");
			const data = res.data.payload.data;

			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className="min-h-screen max-w-[1560px] mx-auto p-5 md:p-10">
			<HeaderText>Contact Kinminds</HeaderText>

			{contactData &&
				contactData
					.filter((item) => item.isPublished) // Filter items based on isPublished
					.map(({ _id, image, title, description }) => (
						<div
							key={_id}
							className="flex flex-col md:flex-row max-w-[1200px] mx-auto border border-gray-300 rounded-xl shadow-lg my-3"
						>
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
									{title}
								</Typography>
								<Typography variant="small" className="font-normal text-color-primary">
									{description}
								</Typography>
							</div>
						</div>
					))}
		</div>
	);
};

export default ContactUs;
