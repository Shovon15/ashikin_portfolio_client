/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useContext(AuthContext);
	const location = useLocation();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (user) {
		return children;
	}

	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
