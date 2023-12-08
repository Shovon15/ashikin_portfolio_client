import "./LoadingSpinner.css";
const LoadingSpinner = () => {
	return (
		<div className=" flex justify-center items-center min-h-screen">
			<div className="spinner  ">
				<div className="spinner-circle dark:border-white"></div>
			</div>
		</div>
		// <div className="flex justify-center items-center min-h-screen ">
		// 	<Spinner color="blue" className="mx-auto w-10 h-10  " />
		// </div>
	);
};

export default LoadingSpinner;
