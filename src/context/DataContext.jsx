/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";
import { get } from "../utils/fetchApi";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
	const [receiveEvent, setReceiveEvent] = useState([]);
	const [receiveEventById, setReceiveEventById] = useState({});

	const fetchEventData = async () => {
		try {
			const res = await get("events");
			setReceiveEvent(res?.data?.payload?.data);
		} catch (err) {
			console.log(err, "err");
		}
	};

	const fetchEventById = async (id) => {
		try {
			const response = await get("events/" + id, id);
			setReceiveEventById(response.data?.payload.event);
		} catch (error) {
			console.log(error.message);
		}
	};

	const dataInfo = {
		fetchEventData,
		receiveEvent,
		fetchEventById,
		receiveEventById,
	};
	return <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>;
};
