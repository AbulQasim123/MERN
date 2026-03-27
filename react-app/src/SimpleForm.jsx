import { useState } from "react"
function SimpleForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`Name: ${name}`)
        console.log("Email: ", email)
    }
    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">Simple Form</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input type="text" className="form-control mb-3" placeholder="Enter name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-1">
                    <input type="email" className="form-control mb-3" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        </div>
    )
}

export default SimpleForm