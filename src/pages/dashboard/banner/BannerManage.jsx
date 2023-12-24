import { Link } from "react-router-dom";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import IconButton from "../../../components/Button/IconButton";

import img from "../../../assets/image/banner-demo-img.jpg";
import imgBg from "../../../assets/image/bg.jpg";

const BannerManage = () => {
	const Data = [
		{
			header: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
			text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est rem repellendus voluptatem, labore animi ex! Sint iste aliquam provident quisquam incidunt quam eius est! Esse necessitatibus inventore voluptatibus dolor quasi",
			bgImage: imgBg,
			secondaryImage: img,
		},
	];
	return (
		<div>
			<HeaderText>Banner Management</HeaderText>
			<Link to={`update-banner`} className="flex justify-end">
				<IconButton>update banner</IconButton>
			</Link>
			<div></div>
			<div className="border border-color-border ">
				<div className="flex flex-col md:flex-row bg-color-primary ">
					<div className="w-full md:w-5/12 p-5 md:p-10  flex flex-col gap-5 justify-center items-center">
						<p data-aos="fade-up" className="font-bold text-3xl md:text-4xl lg:text-5xl text-color-header ">
							{Data[0]?.header}
						</p>
						<p data-aos="fade-up" className="text-color-text text-justify">
							{Data[0]?.text}
						</p>
					</div>

					<div className="w-full md:w-7/12 relative">
						<div className="pl-[100px] md:pl-[120px] h-[350px] md:h-[520px]">
							<div
								style={{
									backgroundImage: `url(${Data[0]?.bgImage})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									width: "100%",
									height: "520px",
									opacity: ".4",
								}}
							></div>
						</div>
						<img
							src={Data[0]?.secondaryImage}
							className="absolute top-[40px] md:top-[70px] left-10 md:left-0 w-40 h-56 md:w-[18rem] md:h-96"
							data-aos="fade-up"
							data-aos-anchor-placement="center-bottom"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerManage;
