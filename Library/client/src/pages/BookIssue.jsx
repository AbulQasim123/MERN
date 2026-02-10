import { useNavigate } from 'react-router-dom';
import { useBookIssue } from '../hooks/useBookIssue';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import BookIssueViewModal from "../components/modals/BookIssueViewModal";
import { toastErr } from '../utils/toastHelper';
const BASE_URL = "http://localhost:2025/uploads"

export default function BookIssue() {
    const nav = useNavigate();
    const { getBookIssues, deleteBookIssue, getBookIssue, returnBookIssue, downloadReceipt } = useBookIssue();
    const [bookIssues, setBookIssues] = useState([]);
    const [showView, setShowView] = useState(false);
    const [selectedBookIssue, setSelectedBookIssue] = useState(null);

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

    const loadBookIssues = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getBookIssues({ page, limit, search: search.trim() });
            setBookIssues(res.bookIssues);
            setMeta(res.meta);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, getBookIssues]);

    useEffect(() => {
        loadBookIssues();
    }, [loadBookIssues]);


    const handleView = async (id) => {
        try {
            const data = await getBookIssue(id);
            setSelectedBookIssue(data);
            setShowView(true);
        } catch {
            console.log("Failed to load book");
        }
    };


    const downloadPDF = async (id) => {
        try {
            const pdfBlob = await downloadReceipt(id);

            const blob = new Blob([pdfBlob], {
                type: 'application/pdf',
            });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'book-receipt.pdf';
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            toastErr('Download failed');
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
                                    placeholder="Search by profile or book or email column..."
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
                                onClick={() => nav("/book-issue/add")}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Issue Book
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-center" >#</th>
                                    <th width="15%">Profile</th>
                                    <th>Email</th>
                                    <th>Book</th>
                                    <th>Issue / Return</th>
                                    <th>Late Days / Fine</th>
                                    <th>⬇️ Receipt</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="12" className="text-center py-5">
                                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className="ms-2">Loading authors...</span>
                                        </td>
                                    </tr>
                                ) : bookIssues.length ? (
                                    bookIssues.map((b, i) => (
                                        <tr key={b._id} className="align-middle">
                                            <td className="text-center fw-semibold">
                                                {(page - 1) * limit + i + 1}
                                            </td>

                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        src={`${BASE_URL}/${b.member_id.profile}`}
                                                        alt={b.member_id.name}
                                                        className="rounded-circle border"
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                    />
                                                    <span className="fw-medium">
                                                        {b.member_id.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <div>{b.member_id.email}</div>
                                                <small>{b.member_id.phone}</small>
                                            </td>
                                            <td>
                                                <div>{b.book_id.title}</div>
                                                <small>isbn: {b.book_id.isbn}</small>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <small className="text-muted">
                                                        <b>
                                                            Issue Date:{" "}
                                                            {new Date(b.issue_date).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </b>
                                                    </small>

                                                    <small className="text-success">
                                                        <b>
                                                            Expected Return:{" "}
                                                            {new Date(b.return_date).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </b>
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <small className="text-muted">
                                                        <b>{`Late Days: ${b.late_days || 0}`}</b>
                                                    </small>

                                                    <small className="text-success">
                                                        <b className="text-danger">{`Fine: ${b.fine || 0}`}</b>
                                                    </small>
                                                </div>
                                            </td>
                                            <td>
                                                {b.status === "returned" ? (
                                                    <button
                                                        onClick={() => downloadPDF(b._id)}
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="Download PDF Receipt"
                                                    >
                                                        <i className="bi bi-file-pdf"></i>
                                                    </button>
                                                ) : (
                                                    <span className="text-muted">--</span>
                                                )}
                                            </td>

                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    {/* Return Button – sirf jab book issued ho */}
                                                    {b.status === "issued" && (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                                            onClick={() => {
                                                                toast((t) => (
                                                                    <div className="p-2">
                                                                        <p className="mb-3">
                                                                            Are you sure you want to return this book?
                                                                        </p>
                                                                        <div className="d-flex justify-content-end gap-2">
                                                                            <button
                                                                                className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                                                                                onClick={async () => {
                                                                                    await returnBookIssue(b._id);
                                                                                    toast.dismiss(t.id);
                                                                                    loadBookIssues();
                                                                                }}
                                                                            >
                                                                                <i className="bi bi-check-circle"></i>
                                                                                Yes, Return
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
                                                            title="Return"
                                                        >
                                                            <i className="bi bi-arrow-return-left"></i>
                                                            <span className="d-none d-md-inline">Return</span>
                                                        </button>
                                                    )}

                                                    <span
                                                        className={`badge ${b.status === "issued" ? "bg-success" : "bg-secondary"
                                                            } px-3 py-2`}
                                                    >
                                                        <i
                                                            className={`bi ${b.status === "issued" ? "bi-check-circle" : "bi-x-circle"
                                                                } me-1`}
                                                        ></i>
                                                        {b.status === "issued" ? "Issued" : "Returned"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm" role="group">

                                                    <button
                                                        className="btn btn-outline-primary d-flex align-items-center gap-1"
                                                        onClick={() => handleView(b._id)}
                                                        title="View Details"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                        <span className="d-none d-md-inline"></span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning d-flex align-items-center gap-1"
                                                        onClick={() => nav(`/book-issue/${b._id}/edit`)}
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
                                                                    <p className="mb-3">Are you sure you want to delete this book?</p>
                                                                    <div className="d-flex justify-content-end gap-2">
                                                                        <button
                                                                            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                                                                            onClick={async () => {
                                                                                await deleteBookIssue(b._id);
                                                                                toast.dismiss(t.id);
                                                                                loadBookIssues();
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
                                        <td colSpan="12" className="text-center py-5">
                                            <div className="text-muted">
                                                <i className="bi bi-person-x display-6 d-block mb-2"></i>
                                                No books found
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

                <div className="card-footer bg-light">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="text-muted small">
                                Showing <span className="fw-semibold">{bookIssues.length}</span> of{" "}
                                <span className="fw-semibold">{meta.total}</span> books
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

            {/* Modal */}
            <BookIssueViewModal
                show={showView}
                bookIssue={selectedBookIssue}
                onClose={() => setShowView(false)}
            />
        </>
    );
}