import { useState } from "react";

function InputExample() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    function handleChange(e) {
        let value = e.target.value.toUpperCase();

        if (value.length > 50) {
            value = value.slice(0, 50);
            setError("Name cannot be more than 50 characters");
        } else {
            setError("");
        }

        setName(value);
    }

    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
            <h4>Input Example</h4>

            <input
                placeholder="Enter your name"
                className="form-control"
                value={name}
                onChange={handleChange}
            />

            <p>Hello, {name || "Guest"}</p>
            <span className="text-danger">{error}</span>
        </div>
    );
}

export default InputExample;
