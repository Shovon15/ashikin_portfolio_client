import Aos from "aos";
import { useEffect } from "react";
import whatsappOriginal from "../../../assets/icon/whatsapp-original.png";
import facebookOriginal from "../../../assets/icon/facebook-original.png";
import emailOriginal from "../../../assets/icon/gmail-original.png";
import image1 from "../../../assets/image/tree-plantation.jpg";
import image2 from "../../../assets/image/anti-tobacco.jpg";
import image3 from "../../../assets/image/anti-harasment.jpg";

const SocialSupport = () => {
	useEffect(() => {
		Aos.init({ duration: 1000 });
	}, []);
	const iconData = [
		{
			id: 1,
			original: whatsappOriginal,
			link: "https://www.whatsapp.com",
		},
		{
			id: 2,
			original: facebookOriginal,
			link: "https://facebook.com",
		},
		{
			id: 3,
			original: emailOriginal,
			link: "https://gmail.com",
		},
	];

	const supportData = [
		{
			id: 1,
			title: "Connection Building",
			icon: image1,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quas.",
		},
		{
			id: 2,
			title: "Tree Plantation",
			icon: image1,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quas.",
		},
		{
			id: 3,
			title: "Anti Harasment Campain",
			icon: image3,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quas.",
		},
		{
			id: 4,
			title: "Anti Tobacco Campain",
			icon: image2,
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quas.",
		},
	];

	return (
		<div
			// data-aos="zoom-in-down"
			className=" bg-gradient-to-r from-blue-300 to-blue-800 p-5 pt-10 md:p-10 md:px-[5rem] flex flex-col"
		>
			<div className="">
				<p data-aos="fade-up" className="text-white font-bold text-4xl md:text-5xl text-center">
					Ashikin Alam Social Support
				</p>
				<div className="flex gap-5 items-center justify-center m-5">
					{iconData.map((icon) => (
						<a href={icon.link} key={icon.id}>
							<div className="relative transition-transform cursor-pointer z-10 transform hover:scale-110">
								<img
									src={icon.original}
									alt="..."
									className="w-12 h-12 rounded-full shadow-xl"
									data-aos="zoom-in"
								/>
							</div>
						</a>
					))}
				</div>
			</div>
			<div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
				{supportData.map(({ id, icon, title, desc }) => (
					<div
						data-aos="flip-left"
						data-aos-anchor-placement="center-bottom"
						key={id}
						className="bg-inherit p-4 rounded-lg shadow-lg h-[23rem] "
					>
						<img src={icon} alt="..." className="w-full h-44" />
						<h2 className="text-3xl text-white font-bold mb-2 mt-5">{title}</h2>
						<p className="text-gray-300">{desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SocialSupport;
