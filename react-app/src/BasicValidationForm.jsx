import { useState } from "react";

function BasicValidationForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        setTimeout(() => {
            if (!name || !email) {
                setError("Name and Email are required.");
                setLoading(false);
                return;
            }

            // Success
            setSuccess("Form submitted successfully!");
            setLoading(false);
            setName("");
            setEmail("");
        }, 2000);

        setTimeout(() => {
            setError("");
            setSuccess("");
        }, 5000);
    };

    return (
        <div
            className="container mt-4 p-4 rounded shadow"
            style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}
        >
            <h4 className="text-center mb-3">Basic Validation Form</h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>

                <div className="mb-1">
                    <input
                        type="email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}

                {success && <p className="text-success">{success}</p>}

                <button className="btn btn-primary btn-sm" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-1"></span>
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
}

export default BasicValidationForm;
