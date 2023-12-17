/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useState } from "react";
import { get } from "../utils/fetchApi";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const fetchData = async () => {
		const cookies = Cookies.get("token");
		// console.log(cookies);
		if (cookies) {
			const data = await get(`admin/${cookies}`);
			setUser(data.data?.payload?.user);
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
		fetchData,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
