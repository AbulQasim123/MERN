import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=194")
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
            .catch((err) => console.log("Error fetching:", err));
    }, []);

    // Search filter
    const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );


    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    const totalPages = Math.ceil(filtered.length / limit);

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <select
                    className="form-select w-auto"
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                    }}>
                    <option value="6">6 / Page</option>
                    <option value="12">12 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="50">50 / Page</option>
                </select>
            </div>

            <div className="row">
                {paginated.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <ProductCard
                            product={{
                                id: product.id,
                                name: product.title,
                                price: product.price,
                                image: product.thumbnail,
                                category: product.category,
                            }}
                        />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    <span className="fw-bold">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-primary btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}

export default ProductList;
