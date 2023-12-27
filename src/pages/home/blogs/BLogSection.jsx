import HeaderText from "../../../components/shared/textHeader/HeaderText";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../../../utils/fetchApi";
import BlogCard from "../../../components/card/blog/BlogCard";
import BlogSkeleton from "../../../components/card/blog/blogSkeleton";

const BLogSection = () => {
	const [blogData, setBlogData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const res = await get("blogs/published");
			setIsLoading(false);
			setBlogData(res.data.payload.data);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-4 py-5">
				<BlogSkeleton />
				<BlogSkeleton />
				<BlogSkeleton />
				<BlogSkeleton />
			</div>
		);
	}
	return (
		<div className="p-5">
			{blogData.length > 0 && (
				<>
					<HeaderText className="py-5">Blog</HeaderText>
					<div className="flex flex-wrap gap-4 justify-center py-5">
						{blogData.map((item) => (
							<div key={item._id}>
								<BlogCard item={item} />
							</div>
						))}
					</div>
					<div className="text-center py-5">
						<Link to="blogs">
							<PrimaryButton className="px-10">View More</PrimaryButton>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default BLogSection;
