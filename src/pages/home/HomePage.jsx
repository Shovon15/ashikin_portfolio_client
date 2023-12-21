// import { useRef } from "react";

import Banner from "./banner/Banner";
import EventSection from "./events/EventSection";
import BLogSection from "./blogs/BLogSection";
import ContactSection from "./contact/ContactSection";
import ExperianceSection from "./Experience/ExperianceSection";
import SocialSupport from "./socialSupport/SocialSupport";
import Review from "./review/Review";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>Ashikin Alam | Home</title>
				<meta name="description" content="Ashikin Alam personal portfolio home page" />
				<link rel="canonical" href="/" />
			</Helmet>
			<div className="max-w-[1560px] mx-auto ">
				<Banner />
				<ExperianceSection />
				<EventSection />
				<BLogSection />
				<ContactSection />
				<Review />
				<SocialSupport />
			</div>
		</>
	);
};

export default HomePage;
