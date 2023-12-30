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
				width="100%"
				height="100%"
			/>
		</>
	);
};

export default ImageComponent;
