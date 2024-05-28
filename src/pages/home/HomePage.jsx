// import { useRef } from "react";

import Banner from "./banner/Banner";
import EventSection from "./events/EventSection";
import BLogSection from "./blogs/BLogSection";
// import ContactSection from "./contact/ContactSection";
import ExperianceSection from "./Experience/ExperianceSection";
import SocialSupport from "./socialSupport/SocialSupport";
import Review from "./review/Review";
import PageHelmet from "../../helper/PageHelmet";
import { useState } from "react";
import Profile from "./profile/profile";

const HomePage = () => {
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";
	const [bannerImage, setBannerImage] = useState("");
	// console.log(bannerImage, "bannerImage");
	return (
		<>
			<PageHelmet
				title="Ashikin Alam"
				description="I'm Ashikin Alam, Let's connect and create something extraordinary!"
				link={shareUrl}
				image={bannerImage}
				type="webapp"
			/>

			<div className="mx-auto bg-color-primary">
				<Banner setBannerImage={setBannerImage} />
				<ExperianceSection />
				<SocialSupport />
				<EventSection />
				<BLogSection />
				{/* <ContactSection /> */}
				<Review />
				<Profile />
			</div>
		</>
	);
};

export default HomePage;


//max-w-[1560px]