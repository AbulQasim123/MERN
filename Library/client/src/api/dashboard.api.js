import axiosPrivate from "../utils/axiosPrivate";

const dashboardApi = {
    getDashboardData: async () => {
        const res = await axiosPrivate.get("/get-dashboard-data");
        return res.data;
    },
};

export default dashboardApi;