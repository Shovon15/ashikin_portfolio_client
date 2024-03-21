import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import { Spinner } from "@material-tailwind/react";

const SocialSupport = () => {
	const { data: socailSupportData = [], isLoading } = useQuery({
		queryKey: ["socailSupportData"],
		queryFn: async () => {
			const res = await get("social-support/all");
			const data = res.data.payload.data;

			return data;
		},
	});

	// const iconData = [
	// 	{
	// 		id: 1,
	// 		original: whatsappOriginal,
	// 		link: "https://www.whatsapp.com",
	// 	},
	// 	{
	// 		id: 2,
	// 		original: facebookOriginal,
	// 		link: "https://facebook.com",
	// 	},
	// 	{
	// 		id: 3,
	// 		original: emailOriginal,
	// 		link: "https://gmail.com",
	// 	},
	// ];
	if (isLoading) {
		return (
			<div className="h-96 flex justify-center items-center">
				<Spinner className="w-7 h-7" />
			</div>
		);
	}

	return (
		<div className=" bg-color-primary p-5 pt-10 md:p-10 md:px-[5rem] flex flex-col">
			<HeaderText>Social Support</HeaderText>
			{/* <div className="">
				<div className="flex gap-5 items-center justify-center m-5">
					{iconData.map((icon) => (
						<a href={icon.link} target="_blank" rel="noopener noreferrer" key={icon.id}>
							<div className="relative transition-transform cursor-pointer z-10 transform hover:scale-110 animation-button">
								<LazyLoadImage
									effect="blur"
									src={icon.original}
									alt="..."
									className="w-12 h-12 rounded-full shadow-xl"
									width="50"
									height="50"
								/>
							</div>
						</a>
					))}
				</div>
			</div> */}
			<div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 ">
				{socailSupportData &&
					socailSupportData.map(
						({ id, image, title, description, isPublished }) =>
							isPublished && (
								<div
									key={id}
									className="bg-color-secondary p-4 rounded-lg shadow-lg hover:shadow-xl h-[23rem]"
								>
									<div className="w-full h-44 flex justify-center  duration-300 hover:scale-110 transition ease-in-out ">
										<LazyLoadImage
											effect="blur"
											src={image}
											alt="card-image"
											className="object-fill h-full rounded-xl"
											width="400"
											height="200"
										/>
									</div>

									<h2 className="text-2xl text-color-header font-bold mb-2 mt-5">{title}</h2>
									<p className="text-color-primary">{description}</p>
								</div>
							)
					)}
			</div>
		</div>
	);
};

export default SocialSupport;
