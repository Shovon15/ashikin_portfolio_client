import "./LoadingSpinner.css";
const LoadingSpinner = () => {
	return (
		<div className=" flex justify-center items-center min-h-screen">
			<div className="spinner">
				<div className="spinner-circle"></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
