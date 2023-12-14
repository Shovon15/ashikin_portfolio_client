import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from "../../layouts/Main";
import HomePage from "../../pages/home/HomePage";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminProfile from "../../pages/dashboard/admin/AdminProfile";
import Login from "../../pages/dashboard/Login";
// import DashboardOverview from "../../pages/dashboard/DashboardOverview";
import EventManage from "../../pages/dashboard/events/EventManage";
import BlogManage from "../../pages/dashboard/blogs/BlogManage";
import CreateEvent from "../../pages/dashboard/events/createEvent";
import PrivateRoute from "../privateRoute/PrivateRoute";
import { Button } from "@material-tailwind/react";
import EventViewPage from "../../pages/home/events/EventViewPage";
import EventRegister from "../../pages/home/events/EventRegister";
import EventsPage from "../../pages/home/events/EventsPage";
import ScrollToTop from "../../hooks/StartTop";
import UpdateEvent from "../../pages/dashboard/events/UpdateEvent";
import DashboardOverview from "../../pages/dashboard/DashboardOverview";

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{/* ---------------------------public route--------------------- */}
				<Route element={<Main />}>
					<Route path="/" element={<HomePage />} />
					<Route path="events" element={<EventsPage />} />
					<Route path="events/:id" element={<EventViewPage />} />
					<Route path="events/register/:id" element={<EventRegister />} />
				</Route>
				{/* ---------------------------admin route--------------------- */}
				<Route path="/login" element={<Login />} />
				<Route
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route path="dashboard" element={<AdminProfile />} />
					<Route path="dashboard/events" element={<EventManage />} />
					<Route path="dashboard/events/write-event" element={<CreateEvent />} />
					<Route path="dashboard/events/update-event/:id" element={<UpdateEvent />} />
					<Route path="dashboard/blogs" element={<BlogManage />} />
					<Route path="dashboard/admin" element={<AdminProfile />} />
					<Route path="dashboard/profile" element={<DashboardOverview />} />
				</Route>
				<Route
					path="*"
					element={
						<div className="flex flex-col gap-5 justify-center items-center min-h-screen">
							<p className="text-center font-bold text-3xl">Page not found</p>
							<Link to="/">
								<Button variant="outlined" className="dark:text-white text-black">
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
