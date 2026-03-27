import { useState } from "react";

const options = [
    { value: "", label: "-- Select a country --" },
    { value: "India", label: "India" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "FinLand", label: "FinLand" },
    { value: "Sweden", label: "Sweden" },
];

function Forms() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        tel: "",
        dateOfBirth: "",
        favoriteColor: "",
        weight: "",
        gender: "",
        file: "",
        bio: "",
        skills: {
            html: false,
            css: false,
            javascript: false,
        },
        touched: {
            firstName: false,
            lastName: false,
            email: false,
        },
    });

    // HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                skills: {
                    ...prev.skills,
                    [name]: checked,
                },
            }));
        } else if (type === "file") {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // HANDLE BLUR (TOUCH)
    const handleBlur = (e) => {
        const { name } = e.target;

        setFormData((prev) => ({
            ...prev,
            touched: {
                ...prev.touched,
                [name]: true,
            },
        }));
    };

    // VALIDATION
    const validate = () => {
        const errors = { firstName: "", lastName: "", email: "" };

        if (
            (formData.touched.firstName && formData.firstName.length < 3) ||
            (formData.touched.firstName && formData.firstName.length > 12)
        ) {
            errors.firstName = "First name must be between 3 and 12 characters";
        }

        if (
            (formData.touched.lastName && formData.lastName.length < 3) ||
            (formData.touched.lastName && formData.lastName.length > 12)
        ) {
            errors.lastName = "Last name must be between 3 and 12 characters";
        }

        if (
            (formData.touched.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
        ) {
            errors.email = "Email is required";
        }

        return errors;
    };

    const errors = validate();

    // SUBMIT HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            country,
            gender,
            tel,
            dateOfBirth,
            favoriteColor,
            weight,
            bio,
            file,
            skills,
        } = formData;

        const formattedSkills = [];
        for (const key in skills) {
            if (skills[key]) formattedSkills.push(key.toUpperCase());
        }

        const data = {
            firstName,
            lastName,
            email,
            country,
            gender,
            tel,
            dateOfBirth,
            favoriteColor,
            weight,
            bio,
            file,
            skills: formattedSkills,
        };

        console.log("FORM SUBMITTED:", data);

        alert("Form submitted! Check console.");
    };

    return (
        <div className="container mt-4">
            <h4 className="text-center mb-3">Form Handling</h4>
            <hr />
            <h5 className="text-center mb-3">Add Student</h5>
            
            <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">

                    {/* First Name */}
                    <div className="col-md-4">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                            placeholder="First Name"
                        />
                        <span>{formData.firstName}</span><br />
                        {errors.firstName && (
                            <small className="text-danger">{errors.firstName}</small>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="col-md-4">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                            placeholder="Last Name"
                        />
                        <span>{formData.lastName}</span><br />
                        {errors.lastName && (
                            <small className="text-danger">{errors.lastName}</small>
                        )}
                    </div>

                    {/* Email */}
                    <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                            placeholder="Email"
                        />
                        <span>{formData.email}</span><br />

                        {errors.email && (
                            <small className="text-danger">{errors.email}</small>
                        )}
                    </div>

                    {/* Telephone */}
                    <div className="col-md-4">
                        <label className="form-label">Telephone</label>
                        <input
                            type="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Telephone"
                        />
                    </div>

                    {/* DOB */}
                    <div className="col-md-4">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    {/* Color */}
                    <div className="col-md-4">
                        <label className="form-label">Favorite Color</label>
                        <input
                            type="color"
                            name="favoriteColor"
                            value={formData.favoriteColor}
                            onChange={handleChange}
                            className="form-control form-control-color"
                        />
                    </div>

                    {/* Weight */}
                    <div className="col-md-4">
                        <label className="form-label">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Weight"
                        />
                    </div>

                    {/* Country */}
                    <div className="col-md-4">
                        <label className="form-label">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="form-select"
                        >
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="col-md-4">
                        <label className="form-label d-block">Gender</label>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Female</label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Male</label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === "Other"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Other</label>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="col-md-12">
                        <label className="form-label">Skills</label>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="html"
                                checked={formData.skills.html}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">HTML</label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="css"
                                checked={formData.skills.css}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">CSS</label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="javascript"
                                checked={formData.skills.javascript}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">JavaScript</label>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="col-md-12">
                        <label className="form-label">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="form-control"
                            rows="5"
                            placeholder="Write about yourself..."
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="col-md-4">
                        <label className="form-label">Upload File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <button className="btn btn-primary w-100">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Forms;
