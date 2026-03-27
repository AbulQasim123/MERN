import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    const fallbackImage =
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const handleAdd = () => {
        setLoading(true);
        setTimeout(() => {
            addToCart(product);
            setLoading(false);
            toast.success("Product added to cart!");
        }, 1000);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="card shadow-sm h-100 product-card border-0 rounded-3 overflow-hidden transition-all">
            {/* Image Container */}
            <div 
                className="position-relative overflow-hidden bg-light"
                style={{ height: "220px" }}
            >
                <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    className={`card-img-top w-100 h-100 ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                    style={{ 
                        objectFit: "contain", 
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                        padding: "1rem"
                    }}
                    onError={(e) => {
                        e.target.src = fallbackImage;
                        setImageLoaded(true);
                    }}
                    onLoad={handleImageLoad}
                />
                
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {/* Category Badge */}
                <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-primary bg-opacity-90 text-white">
                        {product.category}
                    </span>
                </div>

                {/* Hover Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-0 transition-all d-flex align-items-center justify-content-center"
                    style={{ 
                        opacity: 0,
                        transition: "all 0.3s ease"
                    }}
                >
                    <div className="text-white text-center">
                        <i className="bi bi-eye-fill display-6 mb-2"></i>
                        <p className="mb-0 fw-semibold">View Details</p>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="card-body d-flex flex-column p-3">
                {/* Product Name */}
                <h6 className="card-title fw-bold text-dark mb-2 line-clamp-2" 
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '48px'
                    }}>
                    {product.name}
                </h6>

                {/* Price */}
                <div className="mb-3">
                    <h5 className="text-primary fw-bold mb-1">
                        ${product.price}
                    </h5>
                    {product.originalPrice && (
                        <small className="text-muted text-decoration-line-through">
                            ${product.originalPrice}
                        </small>
                    )}
                </div>

                {/* Rating (if available) */}
                {product.rating && (
                    <div className="d-flex align-items-center justify-content-center gap-1 mb-3">
                        <div className="d-flex align-items-center">
                            {[...Array(5)].map((_, i) => (
                                <i
                                    key={i}
                                    className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''} text-warning`}
                                    style={{ fontSize: '0.8rem' }}
                                ></i>
                            ))}
                        </div>
                        <small className="text-muted">({product.rating})</small>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-auto d-flex flex-column gap-2">
                    <button
                        className={`btn btn-primary btn-sm fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 ${
                            loading ? 'disabled' : ''
                        }`}
                        disabled={loading || product.stock === 0}
                        onClick={handleAdd}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" style={{ width: '1rem', height: '1rem' }}></span>
                                Adding...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-cart-plus"></i>
                                Add to Cart
                            </>
                        )}
                    </button>

                    <button
                        className="btn btn-outline-dark btn-sm py-2 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <i className="bi bi-eye"></i>
                        View Details
                    </button>
                </div>
            </div>

            {/* Hover Effects */}
            <style>{`
                .product-card {
                    transition: all 0.3s ease;
                    border: 1px solid #e9ecef;
                }
                
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                    border-color: #007bff;
                }
                
                .product-card:hover .position-absolute.bg-dark {
                    opacity: 0.8 !important;
                }
                
                .product-card:hover .card-img-top {
                    transform: scale(1.05);
                }
                
                .transition-all {
                    transition: all 0.3s ease;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

export default ProductCard;