import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Main from "../../layouts/Main";
import HomePage from "../../pages/home/HomePage";
import DashboardLayout from "../../layouts/DashboardLayout";
import Login from "../../pages/dashboard/Login";
import EventManage from "../../pages/dashboard/events/EventManage";
import BlogManage from "../../pages/dashboard/blogs/BlogManage";
import CreateEvent from "../../pages/dashboard/events/CreateEvent";
import PrivateRoute from "../privateRoute/PrivateRoute";
import { Button } from "@material-tailwind/react";
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

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{/* ---------------------------public route--------------------- */}
				<Route element={<Main />}>
					<Route path="/" element={<HomePage />} />
					<Route path="programs" element={<EventsPage />} />
					<Route path="services" element={<Services />} />
					<Route path="blogs" element={<BlogPage />} />
					<Route path="program/:id" element={<EventViewPage />} />
					<Route path="program/register/:id" element={<EventRegister />} />
				</Route>
				{/* ---------------------------admin route--------------------- */}
				<Route path="/login" element={<Login />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route path="/reset-password/:id/:token" element={<ResetPassword />} />
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

						<Route path="blogs" element={<BlogManage />} />
						<Route path="blogs/write-blog" element={<CreateBlog />} />

						<Route path="invitations" element={<InvitationPage />} />
						<Route path="invitations/:id" element={<InvitationDetails />} />

						<Route path="banner">
							<Route path="" element={<BannerManage />} />
							<Route path="update-banner" element={<UpdateBanner />} />
						</Route>

						<Route path="services">
							<Route path="" element={<ServicesManage />} />
							<Route path="write-service" element={<CreateService />} />
							<Route path="update-service/:id" element={<UpdateService />} />
						</Route>

						<Route path="programs">
							<Route path="" element={<EventManage />} />
							<Route path=":id" element={<RegisteredEvent />} />
							<Route path="write-program" element={<CreateEvent />} />
							<Route path="update-program/:id" element={<UpdateEvent />} />
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
						<div className="flex flex-col gap-5 justify-center items-center min-h-screen">
							<p className="text-center text-textPrimary font-bold text-3xl">Page not found</p>
							<Link to="/">
								<Button className="bg-gradient-to-r from-cyan-500 to-blue-700 px-8 dark:text-white text-black">
									home
								</Button>
							</Link>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoutes;
