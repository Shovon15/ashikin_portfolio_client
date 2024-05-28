import HeaderText from "../../../components/shared/textHeader/HeaderText";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../utils/fetchApi";
import { Spinner } from "@material-tailwind/react";
import SocialCard from "./SocialCard";

const SocialSupport = () => {
	const { data: socialSupportData = [], isLoading } = useQuery({
		queryKey: ["socailSupportData"],
		queryFn: async () => {
			const res = await get("social-support/all");
			const data = res.data.payload.data;

			return data;
		},
	});
	const publishedData = socialSupportData.filter(
		({ isPublished }) => isPublished === true
	);

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
		<>
			{
				publishedData?.length > 0 &&
				<div className="bg-color-primary">
					<div className="max-w-[1560px] mx-auto  p-5 pt-10 md:p-10 md:px-[5rem] flex flex-col">
						<HeaderText>Social Support</HeaderText>
						<div className="flex flex-wrap flex-grow justify-end items-end gap-5 py-5">
							{publishedData.map((data) => (
								<SocialCard key={data.id} data={data} />
							))}
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default SocialSupport;
