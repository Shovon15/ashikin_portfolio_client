import { Helmet } from "react-helmet-async";

const PageHelmet = ({ title, cover, link }) => {
	return (
		<Helmet>
			<meta name="description" content={title} />
			<meta property="og:image" content={cover} />
			<meta name="twitter:image" content={cover} />
			<link rel="canonical" href={link} />
		</Helmet>
	);
};

export default PageHelmet;
