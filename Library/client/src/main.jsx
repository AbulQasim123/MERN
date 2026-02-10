import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});


ReactDOM.createRoot(document.getElementById("root")).render(
	<ErrorBoundary>
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 1000,
					style: { fontSize: '14px', padding: '10px 16px' },
					success: { iconTheme: { primary: '#0d6efd', secondary: '#fff' } },
					error: { iconTheme: { primary: '#dc3545', secondary: '#fff' } },
				}}
			/>
		</React.StrictMode>
	</ErrorBoundary>
);