import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContextProvider.jsx";
import { DashboardContextProvider } from "./context/DashboardContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { DataContextProvider } from "./context/DataContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeContextProvider>
					<DashboardContextProvider>
						<DataContextProvider>
							<HelmetProvider>
								<App />
							</HelmetProvider>
						</DataContextProvider>
					</DashboardContextProvider>
				</ThemeContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
