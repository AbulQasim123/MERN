import Modal from "./Modal";

const BASE_URL = "http://localhost:2025/uploads";

export default function MemberViewModal({ member, show, onClose }) {
    if (!member) return null;

    return (
        <Modal show={show} onClose={onClose} title="Member Details">
            <div className="text-center mb-3">
                <img
                    src={`${BASE_URL}/${member.profile}`}
                    alt={member.name}
                    className="img-fluid rounded"
                    style={{ width: "120px" }}
                />
            </div>

            <h5>Name: {member.name}</h5>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>
            <p>Address: {member.address}</p>
            <p><strong>Member Since:</strong>
                {new Date(member.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p><strong>Status:</strong> {member.status ? true : false}</p>
        </Modal>
    );
}
