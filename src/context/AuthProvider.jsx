/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useState } from "react";
import { get } from "../utils/fetchApi";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () => {
		const cookies = Cookies.get("token");

		if (cookies) {
			setIsLoading(true);
			const data = await get(`admin/${cookies}`);
			setUser(data.data?.payload?.user);
			setIsLoading(false);
		}
		if (!cookies) {
			setUser(null);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const authInfo = {
		user,
		isLoading,
		fetchData,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
