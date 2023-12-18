import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{/* ---------------------------public route--------------------- */}
				<Route element={<Main />}>
					<Route path="/" element={<HomePage />} />
					<Route path="events" element={<EventsPage />} />
					<Route path="services" element={<Services />} />
					<Route path="blogs" element={<BlogPage />} />
					<Route path="events/:id" element={<EventViewPage />} />
					<Route path="events/register/:id" element={<EventRegister />} />
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
					<Route path="dashboard" element={<DashboardOverview />} />
					<Route path="dashboard/profile-update" element={<UpdateProfile />} />
					<Route path="dashboard/password-update" element={<UpdatePassword />} />
					<Route path="dashboard/events" element={<EventManage />} />
					<Route path="dashboard/events/write-event" element={<CreateEvent />} />
					<Route path="dashboard/events/update-event/:id" element={<UpdateEvent />} />
					<Route path="dashboard/blogs" element={<BlogManage />} />
					<Route path="dashboard/blogs/write-blog" element={<CreateBlog />} />
					<Route path="dashboard/invitations" element={<InvitationPage />} />
					<Route path="dashboard/invitations/:id" element={<InvitationDetails />} />
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
