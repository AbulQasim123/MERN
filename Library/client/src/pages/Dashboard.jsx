import { useDashboardQuery } from "../hooks/useDashboard";

export default function Dashboard() {
    const { data, isLoading, isError, error } = useDashboardQuery();

    if (isLoading) {
        return <h5>Loading dashboard...</h5>;
    }

    if (isError) {
        return <h5 className="text-danger">{error.message}</h5>;
    }

    const stats = [

        {
            label: "Authors",
            value: data.data.authorsCount,
            icon: "bi-person-lines-fill",
            color: "success",
        },
        {
            label: "Categories",
            value: data.data.categoriesCount,
            icon: "bi-tags",
            color: "info",
        },

        {
            label: "Total Books",
            value: data.data.booksCount,
            icon: "bi-book",
            color: "primary",
        },
        {
            label: "Members",
            value: data.data.membersCount,
            icon: "bi-people",
            color: "warning",
        },


        {
            label: "Total Issued Books",
            value: data.data.totalBookIssuesCount,
            icon: "bi-journal-bookmark",
            color: "secondary",
        },
        {
            label: "Issued Books",
            value: data.data.issueBookCount,
            icon: "bi-arrow-left",
            color: "danger",
        },
        {
            label: "Returned Books",
            value: data.data.returnBookCount,
            icon: "bi-arrow-right",
            color: "dark",
        },
        {
            label: "Total Fine (₹)",
            value: data.data.totalFineAmount,
            icon: "bi-currency-rupee",
            color: "dark",
        },
    ];

    return (
        <>
            <h4 className="mb-4">Dashboard</h4>

            <div className="row g-4">
                {stats.map((s) => (
                    <div key={s.label} className="col-xl-3 col-lg-4 col-md-6">
                        <div className={`card text-white bg-${s.color} h-100`}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title mb-1">{s.label}</h6>
                                    <h2 className="mb-0">{s.value}</h2>
                                </div>
                                <i className={`bi ${s.icon} fs-1 opacity-75`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
