import Modal from "./Modal";

const BASE_URL = "http://localhost:2025";

export default function BookViewModal({ book, show, onClose }) {
    if (!book) return null;

    return (
        <Modal show={show} onClose={onClose} title="Book Details">
            <div className="text-center mb-3">
                <img
                    src={`${BASE_URL}/uploads/${book.coverImage}`}
                    alt={book.title}
                    className="img-fluid rounded"
                    style={{ width: "120px" }}
                />
            </div>

            <h5>{book.title}</h5>
            <p><strong>Author:</strong> {book.author.name}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Category:</strong> {book.category.name}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p>
                <strong>Published:</strong>{" "}
                {new Date(book.publishedDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Status:</strong> {book.status ? 'Active' : 'Inactive'}</p>
            <p><strong>Summary:</strong> {book.summary}</p>
        </Modal>
    );
}
