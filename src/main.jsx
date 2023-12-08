import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContextProvider.jsx";
import { DashboardContextProvider } from "./context/DashboardContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { DataContextProvider } from "./context/DataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<ThemeContextProvider>
				<DashboardContextProvider>
					<DataContextProvider>
						<App />
					</DataContextProvider>
				</DashboardContextProvider>
			</ThemeContextProvider>
		</AuthProvider>
	</React.StrictMode>
);
