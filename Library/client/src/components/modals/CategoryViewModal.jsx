import Modal from "./Modal";
export default function CategoryViewModal({ category, show, onClose }) {
    if (!category) return null;

    return (
        <Modal show={show} onClose={onClose} title="Category Details">
            <h5>{category.name}</h5>
            <p><strong>Description:</strong> {category.description}</p>
            <p><strong>Status:</strong> {category.status ? 'Active' : 'Inactive'}</p>
        </Modal>
    );
}
