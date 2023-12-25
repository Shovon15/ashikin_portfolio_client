/* eslint-disable react/prop-types */

import { createContext } from "react";
import { get } from "../utils/fetchApi";
import { showErrorToast } from "../helper/ToastMessage";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
	const fetchEventData = async () => {
		try {
			const res = await get("events");
			return res?.data?.payload;
		} catch (err) {
			showErrorToast(err.message);
		}
	};

	const fetchEventById = async (id) => {
		try {
			const response = await get("events/" + id, id);
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

	const fetchBlogById = async (id) => {
		try {
			const response = await get("blogs/" + id, id);
			return response.data?.payload?.data;
		} catch (error) {
			showErrorToast(error.message);
		}
	};

	const dataInfo = {
		fetchEventData,
		fetchEventById,
		fetchServiceById,
		fetchBlogById,
	};
	return <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>;
};
