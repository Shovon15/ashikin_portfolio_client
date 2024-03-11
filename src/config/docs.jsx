import { RxDashboard } from "react-icons/rx";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";

export const dashboardLinkItems = [
	{
		name: "dashboard",
		link: "/dashboard/admin",
		icon: <RxDashboard className="w-5 h-5" />,
	},
	{
		name: "Logo",
		link: "/dashboard/logo",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "banner",
		link: "/dashboard/banner",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Social Link",
		link: "/dashboard/social",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "services",
		link: "/dashboard/services",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "programs",
		link: "/dashboard/programs",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "blogs",
		link: "/dashboard/blogs",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "reviews",
		link: "/dashboard/reviews",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},

	{
		name: "invitations",
		link: "/dashboard/invitations",
		icon: <SlEnvolopeLetter className="w-5 h-5" />,
	},
];
