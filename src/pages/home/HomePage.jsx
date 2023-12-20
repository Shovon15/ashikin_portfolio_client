// import { useRef } from "react";

import Banner from "./banner/Banner";
import EventSection from "./events/EventSection";
import BLogSection from "./blogs/BLogSection";
import ContactSection from "./contact/ContactSection";
import ExperianceSection from "./Experience/ExperianceSection";
import SocialSupport from "./socialSupport/SocialSupport";
import Review from "./review/Review";

const HomePage = () => {
	return (
		<div className="max-w-[1560px] mx-auto ">
			<Banner />
			<ExperianceSection />
			<EventSection />
			<BLogSection />
			<ContactSection />
			<Review />
			<SocialSupport />
		</div>
	);
};

export default HomePage;
