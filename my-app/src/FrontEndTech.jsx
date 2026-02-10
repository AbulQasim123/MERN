function FrontEndTech() {
    const techs = [
        {
            name: "HTML5",
            img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
            color: "danger",
        },
        {
            name: "CSS3",
            img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
            color: "primary",
        },
        {
            name: "JavaScript",
            img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
            color: "warning",
        },
        {
            name: "React",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            color: "info",
        },
    ];

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 fw-bold text-uppercase text-secondary">
                Front-End Technologies
            </h2>

            <div className="row justify-content-center g-4">
                {techs.map((tech, index) => (
                    <div key={index} className="col-6 col-md-3">
                        <div
                            className={`card border-${tech.color} shadow-sm text-center p-3`}
                            style={{ transition: "transform 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <img
                                src={tech.img}
                                alt={tech.name}
                                className="card-img-top mx-auto"
                                style={{ width: "80px", height: "80px", objectFit: "contain" }}
                            />
                            <div className="card-body">
                                <h5 className={`card-title text-${tech.color}`}>{tech.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FrontEndTech;
