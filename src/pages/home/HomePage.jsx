// import { useRef } from "react";

import Banner from "./banner/Banner";
import EventSection from "./events/EventSection";
import BLogSection from "./blogs/BLogSection";
import ContactSection from "./contact/ContactSection";
import ExperianceSection from "./Experience/ExperianceSection";
import SocialSupport from "./socialSupport/SocialSupport";
import Review from "./review/Review";
import PageHelmet from "../../helper/PageHelmet";
import { useState } from "react";

const HomePage = () => {
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	const [bannerImage, setBannerImage] = useState("");

	return (
		<>
			<PageHelmet
				title="Ashikin Alam"
				description="I'm Ashikin Alam, Let's connect and create something extraordinary!"
				link={shareUrl}
				image={bannerImage}
				type="webapp"
			/>

			<Banner setBannerImage={setBannerImage} />
			<div className="max-w-[1560px] mx-auto">
				<ExperianceSection style={{ marginTop: "700px" }} />
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
