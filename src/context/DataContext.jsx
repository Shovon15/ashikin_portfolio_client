/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { get } from "../utils/fetchApi";
import { showErrorToast } from "../helper/ToastMessage";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {

	const [isLogoLoading, setIsLogoLoading] = useState(false);
	const [isEventLoading, setIsEventLoading] = useState(false);
	const [isBlogLoading, setIsBlogLoading] = useState(false);
	
	const [logoData, setLogoData] = useState(null);
	const [serviceData, setServiceData] = useState([]);
	const [blogData, setBlogData] = useState({});
	const [eventData, setEventData] = useState({});

	const fetchEventData = async (pageNumber = 1) => {
		try {
			setIsEventLoading(true)
			const res = await get(`events/published?page=${pageNumber}`);
			const data = res?.data?.payload;
			setEventData(data);
			return data.data;
		} catch (err) {
			showErrorToast(err.message);
		}finally{
			setIsEventLoading(false)
		}
	};
	console.log(eventData,"eventData from context")
	useEffect(() => {
		fetchEventData();
	}, []); // The empty dependency array ensures this runs only once when the component mounts

	const fetchServiceData = async () => {
		try {
			const response = await get("services/published");
			const data = response.data?.payload?.data;
			setServiceData(data)
			return data;
		} catch (error) {
			showErrorToast(error.message);
		}
	};
	useEffect(() => {
		fetchServiceData()
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLogoLoading(true);
				const response = await get("logo");
				setLogoData(response.data?.payload?.data);
				setIsLogoLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLogoLoading(false);
			}
		};
		fetchData();
	}, []);



	const fetchBlogData = async (page = 1) => {
		try {
			setIsBlogLoading(true);
			const response = await get(`blogs/Published?page=${page}`);
			const data = response.data?.payload;
			setBlogData(data);
			return data;
		} catch (error) {
			showErrorToast(error.message);
		} finally {
			setIsBlogLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogData();
	}, []);



	const fetchEventBySlug = async (slug) => {
		try {
			const response = await get("events/" + slug, slug);
			return response.data?.payload?.data;
		} catch (error) {
			showErrorToast(error.message);
		}
	};

	const fetchServiceById = async (id) => {
		try {
			const response = await get("services/" + id, id);
			return response.data?.payload?.data;
		} catch (error) {
			showErrorToast(error.message);
		}
	};

	const fetchBlogBySlug = async (slug) => {
		try {
			const response = await get("blogs/" + slug, slug);
			return response.data?.payload?.data;
		} catch (error) {
			showErrorToast(error.message);
		}
	};



	const dataInfo = {
		serviceData,
		eventData,
		logoData,
		blogData,
		isLogoLoading,
		isBlogLoading,
		isEventLoading,
		fetchEventData,
		fetchBlogData,
		fetchEventBySlug,
		fetchServiceById,
		fetchBlogBySlug,
	};
	return <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>;
};
