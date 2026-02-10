import { useNavigate } from 'react-router-dom';
import { useBook } from '../hooks/useBook';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
const BASE_URL = "http://localhost:2025/uploads";
import BookViewModal from "../components/modals/BookViewModal";

export default function Books() {
    const nav = useNavigate();
    const { getBooks, deleteBook, getBook } = useBook();
    const [books, setBooks] = useState([]);
    const [showView, setShowView] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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

    const loadBooks = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getBooks({ page, limit, search: search.trim() });
            setBooks(res.books);
            setMeta(res.meta);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, getBooks]);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);


    const handleView = async (id) => {
        try {
            const data = await getBook(id);
            setSelectedBook(data);
            setShowView(true);
        } catch {
            console.log("Failed to load book");
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
                                    placeholder="Search by title or isbn..."
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
                                onClick={() => nav("/books/add")}
                            >
                                <i className="bi bi-plus-lg"></i>
                                Add Book
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Cover</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th className="text-center">Stock</th>
                                    <th>Page</th>
                                    <th>Price</th>
                                    <th>PY</th>
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
                                ) : books.length ? (
                                    books.map((b, i) => (
                                        <tr key={b._id} className="align-middle">
                                            <td className="text-center fw-semibold">
                                                {(page - 1) * limit + i + 1}
                                            </td>
                                            <td>
                                                <img
                                                    src={`${BASE_URL}/${b.coverImage}`}
                                                    alt={b.title}
                                                    className="rounded-circle border"
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>
                                                <div>{b.title}</div>
                                                <small>isbn: {b.isbn}</small>
                                            </td>
                                            <td>
                                                <div>{b.author.name}</div>
                                                <small>{b.author.email}</small>
                                            </td>
                                            <td>{b.category.name}</td>
                                            <td>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="badge bg-secondary">
                                                        Total: {b.total_copies}
                                                    </span>

                                                    <span className="badge bg-warning text-dark">
                                                        Issued: {b.issued_copies}
                                                    </span>

                                                    <span className="badge bg-success">
                                                        Available: {b.available_copies}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>{b.pages}</td>
                                            <td>{b.price}</td>
                                            <td>
                                                {new Date(b.publishedDate).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge ${b.status ? "bg-success" : "bg-danger"} px-3 py-2`}>
                                                    <i className={`bi ${b.status ? "bi-check-circle" : "bi-x-circle"} me-1`}></i>
                                                    {b.status ? "Active" : "Inactive"}
                                                </span>
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
                                                        onClick={() => nav(`/books/${b._id}/edit`)}
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
                                                                                await deleteBook(b._id);
                                                                                toast.dismiss(t.id);
                                                                                loadBooks();
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
                                Showing <span className="fw-semibold">{books.length}</span> of{" "}
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
            <BookViewModal
                show={showView}
                book={selectedBook}
                onClose={() => setShowView(false)}
            />
        </>
    );
}