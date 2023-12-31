/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const PageHelmet = ({ title, description, type, name, link, image }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={link} />

			<meta property="og:type" content={type} />
			<meta property="og:url" content={link} />
			<meta property="og:image" content={image} />
			<meta property="og:image:width" content="2500" />
			<meta property="og:image:height" content="1384" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />

			<meta name="twitter:creator" content={name} />
			<meta name="twitter:card" content={type} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
		</Helmet>
	);
};

// PageHelmet.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	cover: PropTypes.string.isRequired,
// 	link: PropTypes.string.isRequired,
// 	page: PropTypes.string.isRequired,
// };

export default PageHelmet;
