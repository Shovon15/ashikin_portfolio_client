/* eslint-disable react/prop-types */
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageComponent = ({ src }) => {
	return (
		<>
			<LazyLoadImage
				effect="blur"
				src={src}
				alt="card-image"
				className="object-fill h-full rounded-t-xl "
				width="320px"
				height="230px"
			/>
		</>
	);
};

export default ImageComponent;
