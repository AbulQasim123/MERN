import { useState } from "react";

function AdvancedForm() {
    const [formData, setFormData] = useState({
        gender: "",
        agree: false,
        country: "India"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            gender: "",
            agree: false,
            country: "India"
        });
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div
            className="container mt-4 p-4 rounded shadow"
            style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}
        >
            <h4 className="text-center mb-3">
                Form with Checkbox, Radio & Select
            </h4>
            <form onSubmit={handleSubmit}>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        id="gender_male"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                    />{" "}
                    Male
                </label>
                <br />

                <label>
                    <input
                        type="radio"
                        name="gender"
                        id="gender_female"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                    />{" "}
                    Female
                </label>

                <br /><br />

                <label>
                    Country:{" "}
                    <select
                        className="form-control"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                </label>

                <br /><br />

                <label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="agree"
                        id="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                    />{" "}
                    I agree
                </label>

                <br /><br />

                <button type="submit" className="btn btn-primary btn-sm">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AdvancedForm;
