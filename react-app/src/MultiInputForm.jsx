import { useState } from "react"

function MultiInputForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        setFormData({
            name: "",
            email: "",
            age: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">Multi Input Form</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input type="text" className="form-control" placeholder="Enter Name" name="name" id="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-1">
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" id="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-1">
                    <input type="number" min="0" className="form-control" placeholder="Enter Age" name="age" id="age" value={formData.age} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        </div>
    )
}

export default MultiInputForm