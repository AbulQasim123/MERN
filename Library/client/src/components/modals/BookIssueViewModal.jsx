import Modal from "./Modal";

export default function BookIssueViewModal({ bookIssue, show, onClose }) {
    if (!bookIssue) return null;

    return (
        <Modal show={show} onClose={onClose} title="Book Issue Details">

            <p><strong>Book:</strong> {bookIssue.book_id.title}</p>
            <p><strong>Book ISBN:</strong> {bookIssue.book_id.isbn}</p>
            <p><strong>Member:</strong> {bookIssue.member_id.name}</p>
            <p><strong>Member Email:</strong> {bookIssue.member_id.email}</p>
            <p><strong>Member Phone:</strong> {bookIssue.member_id.phone}</p>
            <p><strong>Issue Date:</strong>
                {new Date(bookIssue.issue_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p><strong>Return Date:</strong>
                {new Date(bookIssue.return_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p><strong>Status:</strong> {bookIssue.status === "issued" ? "Issued" : "Returned"}</p>

            {bookIssue.status === "returned" && (
                <>
                    <p><strong>Late Days:</strong> {bookIssue.late_days}</p>
                    <p><strong>Expected Return Date:</strong>
                        {new Date(bookIssue.expected_return_date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                    <p><strong>Fine:</strong> {bookIssue.fine}</p>
                </>
            )}
        </Modal>
    );
}
