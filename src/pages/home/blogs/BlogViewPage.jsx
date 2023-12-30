import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../../../components/Button/GoBackButton";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { DataContext } from "../../../context/DataContext";
import { RxDoubleArrowUp } from "react-icons/rx";
import LoadingSpinner from "../../../components/shared/loadingSpinner/LoadingSpinner";
import ButtonOutline from "../../../components/Button/ButtonOutline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import bgImg from "../../../assets/image/abstract-offer.png";
import PageHelmet from "../../../helper/PageHelmet";
const BlogViewPage = () => {
	const { fetchBlogBySlug } = useContext(DataContext);
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);
	const [blogData, setblogData] = useState({});
	const { title, cover, content } = blogData;

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const events = await fetchBlogBySlug(slug);
			setblogData(events);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const words = content?.length;
	const shouldShowButton = words > 600;

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<PageHelmet
				title={title}
				description={title}
				name="ashikin alam"
				image={cover}
				link={shareUrl}
				type="webapp"
			/>
			<div className="bg-color-primary relative min-h-screen pb-10">
				<div className="absolute top-0 left-0 flex justify-between w-full pointer-events-none">
					<div>
						<img src={bgImg} alt="bg-shape" className="w-[25rem] h-[600px] -mt-20 transform scale-x-[-1]" />
					</div>
					<div>
						<img src={bgImg} alt="bg-shape" className="w-[25rem] h-[600px] -mt-20  ml-auto" />
					</div>
				</div>
				<div className="page-container z-10">
					<div className=" ml-5">
						<GoBackButton />
					</div>
					<div className="max-w-[800px] mx-auto">
						<p className="text-center text-color-header font-bold text-4xl py-5 ">{title}</p>

						<div className="flex justify-center p-5 ">
							<LazyLoadImage
								effect="blur"
								src={cover}
								alt="cover-image"
								className=" object-cover rounded-xl mx-auto"
								width="90%"
								height="90%"
							/>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: shouldShowButton && !showMore ? `${content.slice(0, 600)} ...` : content,
							}}
							className="pb-2 transition text-color-text "
						/>
						{shouldShowButton && !showMore && (
							<div className="flex justify-end mx-10">
								<Button
									variant="text"
									onClick={() => setShowMore(true)}
									className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
								>
									Read More
									<RxDoubleArrowUp className="rotate-180 w-4 h-4" />
								</Button>
							</div>
						)}
						{showMore && (
							<div className="flex justify-end mx-10">
								<Button
									variant="text"
									onClick={() => setShowMore(false)}
									className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
								>
									Read Less
									<RxDoubleArrowUp className=" w-4 h-4" />
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
		// <div className=" min-h-screen">
		// 	<div className="bg-color-secondary">
		// 		<div className="p-5">
		// 			<GoBackButton />
		// 		</div>
		// 		<div className="max-w-[800px] mx-auto p-5 pb-[6rem] md:pb-[5rem]">
		// 			<p className="text-center text-color-header font-bold text-2xl md:text-3xl lg:text-4xl pb-5">
		// 				{title}
		// 			</p>
		// 			<div className="flex justify-center py-5 -mb-[14rem]">
		// 				<img
		// 					src={cover}
		// 					alt="card-image"
		// 					className=" object-cover h-full rounded-xl md:max-w-[500px]"
		// 				/>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div className="max-w-[800px] mx-auto mt-[7rem] lg:mt-[8.5rem] flex flex-col justify-center pt-5 pb-10 px-5">
		// 		<div
		// 			dangerouslySetInnerHTML={{
		// 				__html: shouldShowButton && !showMore ? `${content.slice(0, 600)} ...` : content,
		// 			}}
		// 			className="pb-2 transition text-color-text "
		// 		/>
		// 		{shouldShowButton && !showMore && (
		// 			<div className="flex justify-end mx-10">
		// 				<Button
		// 					variant="text"
		// 					onClick={() => setShowMore(true)}
		// 					className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
		// 				>
		// 					Read More
		// 					<RxDoubleArrowUp className="rotate-180 w-4 h-4" />
		// 				</Button>
		// 			</div>
		// 		)}
		// 		{showMore && (
		// 			<div className="flex justify-end mx-10">
		// 				<Button
		// 					variant="text"
		// 					onClick={() => setShowMore(false)}
		// 					className="w-32 p-1 py-3 text-color-header flex justify-center items-center gap-2"
		// 				>
		// 					Read Less
		// 					<RxDoubleArrowUp className=" w-4 h-4" />
		// 				</Button>
		// 			</div>
		// 		)}
		// 	</div>
		// </div>
	);
};

export default BlogViewPage;
