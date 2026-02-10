import Modal from "./Modal";

export default function AuthorViewModal({ author, show, onClose }) {
    if (!author) return null;

    return (
        <Modal show={show} onClose={onClose} title="Author Details">
            <h5>{author.name}</h5>
            <p><strong>Email:</strong> {author.email}</p>
            <p><strong>Short Bio:</strong> {author.short_bio}</p>
            <p><strong>Status:</strong> {author.status ? 'Active' : 'Inactive'}</p>
        </Modal>
    );
}
