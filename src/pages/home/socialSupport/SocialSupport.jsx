import Aos from "aos";
import { useEffect } from "react";
import whatsappOriginal from "../../../assets/icon/whatsapp-original.png";
import facebookOriginal from "../../../assets/icon/facebook-original.png";
import emailOriginal from "../../../assets/icon/gmail-original.png";
import image1 from "../../../assets/image/tree-plantation.jpg";
import image2 from "../../../assets/image/anti-tobacco.jpg";
import image3 from "../../../assets/image/anti-harasment.jpg";
import HeaderText from "../../../components/shared/textHeader/HeaderText";

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
		<div className=" bg-color-primary p-5 pt-10 md:p-10 md:px-[5rem] flex flex-col">
			<div className="">
				<HeaderText>Ashikin Alam Social Support</HeaderText>
				<div className="flex gap-5 items-center justify-center m-5">
					{iconData.map((icon) => (
						<a href={icon.link} target="_blank" rel="noopener noreferrer" key={icon.id} data-aos="zoom-in">
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
						className="bg-color-secondary p-4 rounded-lg shadow-lg hover:shadow-xl h-[23rem] "
					>
						<img src={icon} alt="..." className="w-full h-44" />
						<h2 className="text-2xl text-color-header font-bold mb-2 mt-5">{title}</h2>
						<p className="text-color-text">{desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SocialSupport;
