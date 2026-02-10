import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useAuthor } from "../hooks/useAuthor";
import toast from "react-hot-toast";
import AuthorViewModal from "../components/modals/AuthorViewModal";

export default function Authors() {
    const nav = useNavigate();
    const { getAuthors, deleteAuthor, getAuthor } = useAuthor();
    const [authors, setAuthors] = useState([]);
    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 1
    });

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");

    const [showView, setShowView] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    /* ---------- Load Authors ---------- */
    const loadAuthors = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAuthors({ page, limit, search: search.trim() });
            setAuthors(res.authors);
            setMeta(res.meta);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, getAuthors]);

    useEffect(() => {
        loadAuthors();
    }, [loadAuthors]);

    /* ---------- View ---------- */
    const handleView = async (id) => {
        try {
            const data = await getAuthor(id);
            setSelectedAuthor(data);
            setShowView(true);
        } catch {
            console.log("Failed to load author");
        }
    };

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-header bg-light">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    placeholder="Search by name or email..."
                                    value={search}
                                    onChange={(e) => {
                                        setPage(1);
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="col-md-8 d-flex justify-content-end gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-muted small">Show:</span>
                                <select
                                    className="form-select form-select-sm w-auto"
                                    value={limit}
                                    onChange={(e) => {
                                        setPage(1);
                                        setLimit(+e.target.value);
                                    }}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                                <span className="text-muted small">entries</span>
                            </div>

                            <div className="vr"></div>

                            <button
                                className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                                onClick={() => nav("/authors/add")}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Add Author
                            </button>
                        </div>
                    </div>
                </div>

                {/* BODY - Improved Table Layout */}
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th width="5%" className="text-center">#</th>
                                    <th width="30%">Name</th>
                                    <th width="30%">Email</th>
                                    <th width="15%" className="text-center">Status</th>
                                    <th width="20%" className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className="ms-2">Loading authors...</span>
                                        </td>
                                    </tr>
                                ) : authors.length ? (
                                    authors.map((a, i) => (
                                        <tr key={a._id} className="align-middle">
                                            <td className="text-center fw-semibold">
                                                {(page - 1) * limit + i + 1}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                                                            {a.name?.charAt(0)?.toUpperCase() || 'A'}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-medium">{a.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {a.email}
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge ${a.status ? "bg-success" : "bg-danger"} px-3 py-2`}>
                                                    <i className={`bi ${a.status ? "bi-check-circle" : "bi-x-circle"} me-1`}></i>
                                                    {a.status ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm" role="group">
                                                    <button
                                                        className="btn btn-outline-primary d-flex align-items-center gap-1"
                                                        onClick={() => handleView(a._id)}
                                                        title="View Details"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                        <span className="d-none d-md-inline"></span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning d-flex align-items-center gap-1"
                                                        onClick={() => nav(`/authors/${a._id}/edit`)}
                                                        title="Edit"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                        <span className="d-none d-md-inline"></span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger d-flex align-items-center gap-1"
                                                        onClick={() => {
                                                            toast((t) => (
                                                                <div className="p-2">
                                                                    <p className="mb-3">Are you sure you want to delete this author?</p>
                                                                    <div className="d-flex justify-content-end gap-2">
                                                                        <button
                                                                            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                                                                            onClick={async () => {
                                                                                await deleteAuthor(a._id);
                                                                                toast.dismiss(t.id);
                                                                                loadAuthors();
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-trash"></i>
                                                                            Yes, Delete
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-sm btn-secondary"
                                                                            onClick={() => toast.dismiss(t.id)}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ), { duration: Infinity });
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                        <span className="d-none d-md-inline"></span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="text-muted">
                                                <i className="bi bi-person-x display-6 d-block mb-2"></i>
                                                No authors found
                                                {search && (
                                                    <div className="mt-2">
                                                        <small>Try adjusting your search criteria</small>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FOOTER - Improved Pagination */}
                <div className="card-footer bg-light">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="text-muted small">
                                Showing <span className="fw-semibold">{authors.length}</span> of{" "}
                                <span className="fw-semibold">{meta.total}</span> authors
                                {search && " (filtered)"}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex justify-content-md-end align-items-center gap-2">
                                <span className="text-muted small me-3">
                                    Page {page} of {meta.totalPages || 1}
                                </span>

                                <div className="btn-group btn-group-sm">
                                    <button
                                        className="btn btn-outline-secondary d-flex align-items-center gap-1"
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                        Prev
                                    </button>

                                    <div className="btn btn-outline-light border text-muted px-3">
                                        {page}
                                    </div>

                                    <button
                                        className="btn btn-outline-secondary d-flex align-items-center gap-1"
                                        disabled={page === meta.totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        Next
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AuthorViewModal
                show={showView}
                author={selectedAuthor}
                onClose={() => setShowView(false)}
            />
        </>
    );
}