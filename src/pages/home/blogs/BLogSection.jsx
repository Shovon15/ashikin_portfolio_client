import BlogSwiper from "./BlogSwiper";
import HeaderText from "../../../components/shared/textHeader/HeaderText";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { Link } from "react-router-dom";

const BLogSection = () => {
	return (
		<div className=" px-5 md:px-10">
			<HeaderText>Blog</HeaderText>
			<BlogSwiper />
			<div className="text-center py-5">
				<Link to="/blogs">
					<PrimaryButton className="px-10">View More</PrimaryButton>
				</Link>
			</div>
		</div>
	);
};

export default BLogSection;
