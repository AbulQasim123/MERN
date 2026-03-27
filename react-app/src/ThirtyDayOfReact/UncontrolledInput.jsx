import { useRef } from "react"
function UncontrolledInput() {
    const firstNameRef = useRef(null);
    const lastNameeRef = useRef(null);
    const countryRef = useRef(null);
    const titleRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameeRef.current.value;
        const country = countryRef.current.value;
        const title = titleRef.current.value;
        console.log(`SUBMITTED DATA: ${firstName}, ${lastName}, ${country}, ${title}`);

        const data = {
            first_name: firstName,
            last_name: lastName,
            country: country,
            title: title
        }
        
        // the is the place we connect backend api to send the data to the database
        console.log(data);
    }
    
    return (
        <div className="container mt-4">
            <h4 className="text-center mb-3">Form Handling</h4>
            <hr />
            <h5 className="text-center mb-3">Add Student</h5>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            ref={firstNameRef}
                            className="form-control"
                            placeholder="First Name"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            ref={lastNameeRef}
                            className="form-control"
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <input
                            type="text"
                            name="country"
                            ref={countryRef}
                            className="form-control"
                            placeholder="Country"
                        />

                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            ref={titleRef}
                            className="form-control"
                            placeholder="Title"
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
    )
}

export default UncontrolledInput