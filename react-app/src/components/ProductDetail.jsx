import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const zoomRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setActiveIndex(0);
            })
            .catch(() => navigate("/"));
    }, [id]);

    if (!product) return <div className="text-center mt-5">Loading...</div>;

    // Enhanced zoom effect
    const handleZoom = (e) => {
        if (!zoomRef.current || !imgRef.current) return;

        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
        setIsZoomed(true);
    };

    const handleZoomLeave = () => {
        setIsZoomed(false);
        if (zoomRef.current) {
            zoomRef.current.style.backgroundPosition = "center";
        }
    };

    return (
        <div className="container py-4">
            <button
                className="btn btn-outline-primary btn-sm mb-3 d-flex align-items-center gap-2"
                onClick={() => navigate("/")}
            >
                <i className="bi bi-arrow-left"></i>
                Back to Products
            </button>

            <div className="row g-4">
                {/* IMAGES SECTION */}
                <div className="col-md-6">
                    {/* Main Image with Enhanced Zoom */}
                    <div className="position-relative">
                        <div
                            className="border rounded-3 shadow-sm overflow-hidden bg-light"
                            style={{
                                height: "400px",
                                position: "relative",
                                cursor: isZoomed ? "zoom-out" : "zoom-in",
                            }}
                            onMouseMove={handleZoom}
                            onMouseLeave={handleZoomLeave}
                            ref={zoomRef}
                        >
                            <img
                                ref={imgRef}
                                src={product.images[activeIndex]}
                                className="w-100 h-100"
                                style={{
                                    objectFit: "contain",
                                    transition: "transform 0.3s ease",
                                    transform: isZoomed ? "scale(0.5)" : "scale(1)",
                                }}
                                alt={product.title}
                            />

                            {/* Zoom overlay background */}
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{
                                    backgroundImage: `url(${product.images[activeIndex]})`,
                                    backgroundSize: "200%",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    opacity: isZoomed ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Zoom indicator */}
                            {!isZoomed && (
                                <div className="position-absolute bottom-0 end-0 m-2">
                                    <span className="badge bg-dark bg-opacity-50">
                                        <i className="bi bi-zoom-in me-1"></i>
                                        Hover to zoom
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="d-flex gap-3 mt-4 px-2">
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`border rounded-3 cursor-pointer transition-all ${activeIndex === i
                                    ? "border-primary border-2 shadow-sm"
                                    : "border-secondary"
                                    }`}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onClick={() => setActiveIndex(i)}
                            >
                                <img
                                    src={img}
                                    className="w-100 h-100 rounded-2"
                                    style={{
                                        objectFit: "cover",
                                        padding: "2px",
                                    }}
                                    alt={`${product.title} view ${i + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* PRODUCT DETAILS */}
                <div className="col-md-6">
                    <div className="ps-md-4">
                        {/* Category Badge */}
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                            {product.category}
                        </span>

                        {/* Title */}
                        <h2 className="fw-bold text-dark mb-3">{product.title}</h2>

                        {/* Rating */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="d-flex align-items-center">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`bi bi-star${i < Math.floor(product.rating) ? "-fill" : ""
                                            } text-warning`}
                                    ></i>
                                ))}
                            </div>
                            <span className="text-muted">
                                ({product.rating}/5 • {product.reviews?.length || 0} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <h3 className="text-primary fw-bold">
                                ${product.price}
                                {product.discountPercentage && (
                                    <small className="text-danger fs-6 ms-2">
                                        <del>${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</del>
                                        <span className="ms-1">({product.discountPercentage}% OFF)</span>
                                    </small>
                                )}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-muted lead mb-4">{product.description}</p>

                        {/* Product Specs */}
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="bi bi-tag text-primary"></i>
                                    <strong>Brand:</strong>
                                    <span>{product.brand || "N/A"}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="bi bi-box text-primary"></i>
                                    <strong>Stock:</strong>
                                    <span className={product.stock > 0 ? "text-success" : "text-danger"}>
                                        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                                    </span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;