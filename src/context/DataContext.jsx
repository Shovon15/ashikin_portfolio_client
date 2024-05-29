/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { get } from "../utils/fetchApi";
import { showErrorToast } from "../helper/ToastMessage";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
	const [serviceData, setServiceData] = useState([]);
	const [eventData, setEventData] = useState([]);

	const fetchEventData = async (pageNumber) => {
		try {
			const res = await get(`events/published?page=${pageNumber}`);
			const data = res?.data?.payload?.data;
			setEventData(data);
			return data;
		} catch (err) {
			showErrorToast(err.message);
		}
	};
	useEffect(() => {
		fetchEventData(1);
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
		fetchEventData,
		fetchEventBySlug,
		fetchServiceById,
		fetchBlogBySlug,
	};
	return <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>;
};
