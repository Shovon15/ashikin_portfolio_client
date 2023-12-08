/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const initialUser = JSON.parse(localStorage.getItem("user")) || null;

	const [user, setUser] = useState(initialUser);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		localStorage.setItem("user", JSON.stringify(user));
		setIsLoading(false);
	}, [user]);

	const authInfo = {
		user,
		setUser,
		isLoading,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
