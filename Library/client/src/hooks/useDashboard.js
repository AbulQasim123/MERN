import { useQuery } from "@tanstack/react-query";
import dashboardApi from "../api/dashboard.api";

export const DASHBOARD_QUERY_KEY = ["dashboard-data"];

export const useDashboardQuery = () => {
    return useQuery({
        queryKey: DASHBOARD_QUERY_KEY,
        queryFn: dashboardApi.getDashboardData,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
    });
};