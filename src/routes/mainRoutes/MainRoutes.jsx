import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Main from "../../layouts/Main";
import HomePage from "../../pages/home/HomePage";
import DashboardLayout from "../../layouts/DashboardLayout";
import Login from "../../pages/dashboard/Login";
import EventManage from "../../pages/dashboard/events/EventManage";
import BlogManage from "../../pages/dashboard/blogs/BlogManage";
import CreateEvent from "../../pages/dashboard/events/CreateEvent";
import PrivateRoute from "../privateRoute/PrivateRoute";
import EventViewPage from "../../pages/home/events/EventViewPage";
import EventRegister from "../../pages/home/events/EventRegister";
import EventsPage from "../../pages/home/events/EventsPage";
import ScrollToTop from "../../hooks/StartTop";
import UpdateEvent from "../../pages/dashboard/events/UpdateEvent";
import DashboardOverview from "../../pages/dashboard/DashboardOverview";
import Services from "../../pages/home/services/Services";
import BlogPage from "../../pages/home/blogs/BlogPage";
import UpdateProfile from "../../pages/dashboard/admin/UpdateProfile";
import UpdatePassword from "../../pages/dashboard/admin/UpdatePassword";
import CreateBlog from "../../pages/dashboard/blogs/CreateBlog";
import ForgetPassword from "../../pages/dashboard/ForgetPassword";
import ResetPassword from "../../pages/dashboard/ResetPassword";
import InvitationPage from "../../pages/dashboard/invitations/InvitationPage";
import InvitationDetails from "../../pages/dashboard/invitations/InvitationDetails";
import RegisteredEvent from "../../pages/dashboard/events/RegisteredEvent";
import ServicesManage from "../../pages/dashboard/services/ServicesManage";
import CreateService from "../../pages/dashboard/services/CreateService";
import UpdateService from "../../pages/dashboard/services/UpdateService";
import BannerManage from "../../pages/dashboard/banner/BannerManage";
import UpdateBanner from "../../pages/dashboard/banner/UpdateBanner";
import ReviewManage from "../../pages/dashboard/review/ReviewManage";
import WriteReview from "../../pages/dashboard/review/WriteReview";
import UpdateReview from "../../pages/dashboard/review/UpdateReview";
import UpdateBlog from "../../pages/dashboard/blogs/UpdateBlog";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { PiSmileySadThin } from "react-icons/pi";
import BlogViewPage from "../../pages/home/blogs/BlogViewPage";
import CreateBanner from "../../pages/dashboard/banner/CreateBanner";
import SignUp from "../../pages/dashboard/SignUp";
import About from "../../pages/home/about/about";
import LogoManage from "../../pages/dashboard/logo/LogoManage";
import CreateLogo from "../../pages/dashboard/logo/CreateLogo";
import UpdateLogo from "../../pages/dashboard/logo/UpdateLogo";
import SocialManage from "../../pages/dashboard/social/socialManage";
import CreateSocial from "../../pages/dashboard/social/CreateSocial";
import UpdateSocial from "../../pages/dashboard/social/UpdateSocial";
import BrandManage from "../../pages/dashboard/brands/brandManage";
import AboutManager from "../../pages/dashboard/about/aboutManager";
import CreateAbout from "../../pages/dashboard/about/createAbout";
import UpdateAbout from "../../pages/dashboard/about/updateAbout";
import PressPage from "../../pages/home/press/pressPage";
import PressManager from "../../pages/dashboard/press/pressManager";
import CreatePress from "../../pages/dashboard/press/createPress";
import UpdatePress from "../../pages/dashboard/press/updatePress";
import SocialSupportManager from "../../pages/dashboard/socialSupport/socialSupportManager";
import CreateSocialSupport from "../../pages/dashboard/socialSupport/createSocialSupport";
import UpdateSocialSupport from "../../pages/dashboard/socialSupport/updateSocialSupport";
import ContactUs from "../../pages/home/contactUs/contactUs";
import ContactUsManager from "../../pages/dashboard/contactUs/contactUsManager";
import UpdateContactUs from "../../pages/dashboard/contactUs/updateContactUs";
import CreateContactUs from "../../pages/dashboard/contactUs/createContactUs";

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{/* ---------------------------public route--------------------- */}
				<Route element={<Main />}>
					<Route path="/" element={<HomePage />} />

					<Route path="programs" element={<EventsPage />} />
					<Route path="program/:slug" element={<EventViewPage />} />
					<Route path="program/register/:slug" element={<EventRegister />} />

					<Route path="services" element={<Services />} />

					<Route path="blogs" element={<BlogPage />} />
					<Route path="blog/:slug" element={<BlogViewPage />} />
					<Route path="about" element={<About />} />
					<Route path="contact" element={<ContactUs />} />
					<Route path="press" element={<PressPage />} />
				</Route>

				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route path="/reset-password/:id/:token" element={<ResetPassword />} />

				{/* ---------------------------admin route--------------------- */}
				<Route
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route path="dashboard">
						<Route path="" element={<Navigate replace to="/dashboard/admin" />} />
						<Route path="admin" element={<DashboardOverview />} />

						<Route path="profile-update" element={<UpdateProfile />} />
						<Route path="password-update" element={<UpdatePassword />} />

						<Route path="invitations" element={<InvitationPage />} />
						<Route path="invitations/:id" element={<InvitationDetails />} />

						<Route path="blogs">
							<Route path="" element={<BlogManage />} />
							<Route path="write-blog" element={<CreateBlog />} />
							<Route path="update-blog/:slug" element={<UpdateBlog />} />
						</Route>

						<Route path="logo">
							<Route path="" element={<LogoManage />} />
							<Route path="create-logo" element={<CreateLogo />} />
							<Route path="update-logo" element={<UpdateLogo />} />
						</Route>

						<Route path="banner">
							<Route path="" element={<BannerManage />} />
							<Route path="create-banner" element={<CreateBanner />} />
							<Route path="update-banner" element={<UpdateBanner />} />
						</Route>

						<Route path="social">
							<Route path="" element={<SocialManage />} />
							<Route path="create-social" element={<CreateSocial />} />
							<Route path="update-social/:id" element={<UpdateSocial />} />
						</Route>
						<Route path="brand">
							<Route path="" element={<BrandManage />} />
						</Route>

						<Route path="services">
							<Route path="" element={<ServicesManage />} />
							<Route path="write-service" element={<CreateService />} />
							<Route path="update-service/:id" element={<UpdateService />} />
						</Route>

						<Route path="programs">
							<Route path="" element={<EventManage />} />
							<Route path=":slug" element={<RegisteredEvent />} />
							<Route path="write-program" element={<CreateEvent />} />
							<Route path="update-program/:slug" element={<UpdateEvent />} />
						</Route>

						<Route path="about">
							<Route path="" element={<AboutManager />} />
							<Route path="create-about" element={<CreateAbout />} />
							<Route path="update-about" element={<UpdateAbout />} />
						</Route>

						<Route path="press">
							<Route path="" element={<PressManager />} />
							<Route path="create-press" element={<CreatePress />} />
							<Route path="update-press/:id" element={<UpdatePress />} />
						</Route>

						<Route path="social-support">
							<Route path="" element={<SocialSupportManager />} />
							<Route path="create-social-support" element={<CreateSocialSupport />} />
							<Route path="update-social-support/:id" element={<UpdateSocialSupport />} />
						</Route>
						<Route path="contact">
							<Route path="" element={<ContactUsManager />} />
							<Route path="create-contact" element={<CreateContactUs />} />
							<Route path="update-contact/:id" element={<UpdateContactUs />} />
						</Route>

						<Route path="reviews">
							<Route path="" element={<ReviewManage />} />
							<Route path="write-review" element={<WriteReview />} />
							<Route path="update-review/:id" element={<UpdateReview />} />
						</Route>
					</Route>
				</Route>
				<Route
					path="*"
					element={
						<div className="flex flex-col gap-3 justify-center items-center min-h-screen">
							<p className="text-center text-color-primary font-bold text-3xl">Page not found</p>
							<PiSmileySadThin className="text-color-primary w-12 h-12" />
							<Link to="/">
								<PrimaryButton>Home</PrimaryButton>
							</Link>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoutes;
