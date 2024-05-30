
const BannerSkeleton = () => {
	return (
		<div className="bg-color-secondary ">
			<div
				role="status"
				className="space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center h-[600px] p-10 max-w-[1560px] mx-auto "
			>
				<div className="w-full h-full md:w-5/12 animate-pulse flex flex-col justify-center">
					<div className="h-4 bg-color-primary rounded-full mb-2.5  max-w-[580px]"></div>
					<div className="h-4 bg-color-primary rounded-full w-48 mb-8"></div>
					<div className="h-2 bg-color-primary rounded-full  max-w-[480px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full max-w-[440px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full max-w-[460px] mb-2.5"></div>
					<div className="h-2 bg-color-primary rounded-full  max-w-[360px]"></div>
				</div>
				<div className=" items-center justify-center w-72 md:w-7/12 h-[550px] bg-color-primary  rounded pt-10 mx-auto animate-pulse hidden lg:flex">
					<svg
						className="w-10 h-10 text-color-secondary "
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default BannerSkeleton;