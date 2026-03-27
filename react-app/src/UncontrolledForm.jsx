import { useRef } from "react"
function UncontrolledForm() {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${nameRef.current.value}`);
        console.log("Email: ", emailRef.current.value);
    }
    return (
        <div className="container mt-4 p-4 rounded shadow"
            style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">Uncontrolled Form</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <input type="text" className="form-control mb-3" ref={nameRef} placeholder="Enter name" id="name" />
                </div>
                <div className="mb-1">
                    <input type="email" className="form-control mb-3" ref={emailRef} id="email" placeholder="Enter email" />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        </div>
    )
}

export default UncontrolledForm