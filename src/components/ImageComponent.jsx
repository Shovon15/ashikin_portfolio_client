import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageComponent = ({ src }) => {
	if (!src) {
		return <p>loading...</p>;
	}
	
	return (
		<>
			<LazyLoadImage
				effect="blur"
				src={src}
				alt="card-image"
				className="object-fill h-full rounded-t-xl "
				width="400px"
				height="200px"
			/>
		</>
	);
};

export default ImageComponent;
