function Subscribe() {
    const data = {
        title: "SUBSCRIBE",
        text: "Sign up with your email address to receive news and updates.",
        fNamePlaceholder: "First name",
        lNamePlaceholder: "Last name",
        emailPlaceholder: "Email",
        buttonText: "Subscribe",
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >
            <div
                className="p-5 text-center rounded-4"
                style={{ backgroundColor: "#CFEFFF", maxWidth: "700px", width: "100%" }}
            >
                <h3 className="mb-3">{data.title}</h3>
                <p className="text-muted mb-4">{data.text}</p>

                <form className="row g-2 justify-content-center">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={data.fNamePlaceholder}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={data.lNamePlaceholder}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder={data.emailPlaceholder}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <button type="button" className="btn btn-danger px-5">
                            {data.buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Subscribe;
