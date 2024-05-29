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
		name: "Logo Manager",
		link: "/dashboard/logo",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Banner Manager",
		link: "/dashboard/banner",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Brands Manager",
		link: "/dashboard/brand",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Social Link Manager",
		link: "/dashboard/social",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Service Manager",
		link: "/dashboard/services",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Program Manager",
		link: "/dashboard/programs",
		icon: <BsCalendar2Event className="w-5 h-5" />,
	},
	{
		name: "Blog Manager",
		link: "/dashboard/blogs",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "Review Manager",
		link: "/dashboard/reviews",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "About Manager",
		link: "/dashboard/about",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "Press Manager",
		link: "/dashboard/press",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "Social Support Manager",
		link: "/dashboard/social-support",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},
	{
		name: "Contact Manager",
		link: "/dashboard/contact",
		icon: <MdOutlineMessage className="w-5 h-5" />,
	},

	{
		name: "invitations",
		link: "/dashboard/invitations",
		icon: <SlEnvolopeLetter className="w-5 h-5" />,
	},
];

export const navLinks = [
	{
		id: 1,
		name: "home",
		link: "",
	},
	{
		id: 2,
		name: "Services",
		link: "services",
	},
	{
		id: 3,
		name: "Programs",
		link: "programs",
	},
	{
		id: 4,
		name: "blog",
		link: "blogs",
	},
	{
		id: 5,
		name: "press",
		link: "press",
	},
	{
		id: 6,
		name: "contact us",
		link: "contact",
	},
];

export const FooterLinks = [
	// {
	// 	name: "About Us",
	// 	link: "/about",
	// },
	{
		name: "Our Services",
		link: "/services",
	},
	{
		name: "Our Programs",
		link: "/programs",
	},
	{
		name: "Contact Us",
		link: "/contact",
	},

];