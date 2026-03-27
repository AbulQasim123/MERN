import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
	const { cart, removeFormCart, updateQty, total } = useCart();
	const [loadingId, setLoadingId] = useState(null);
	const [qtyLoadingId, setQtyLoadingId] = useState(null);
	const [qtyAction, setQtyAction] = useState(null);
	//  Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	// Calculate pagination indexes
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentItems = cart.slice(indexOfFirst, indexOfLast);

	const totalPages = Math.ceil(cart.length / itemsPerPage);

	const fallbackImage =
		"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

	const handleDelete = (id) => {
		setLoadingId(id);
		setTimeout(() => {
			removeFormCart(id);
			setLoadingId(null);
			toast.success("Product removed from cart!");

			if (currentItems.length === 1 && currentPage > 1) {
				setCurrentPage((prev) => prev - 1);
			}
		}, 1000);
	};


	const handleQtyChange = (id, newQty, actionType) => {
		setQtyLoadingId(id);
		setQtyAction(actionType);

		setTimeout(() => {
			updateQty(id, newQty);
			setQtyLoadingId(null);
			setQtyAction(null);
			toast.success("Cart quantity updated!");
		}, 600);
	};

	return (
		<div className="container py-4">
			<h3 className="mb-4 fw-bold">🛒 Your Cart</h3>

			{cart.length === 0 ? (
				<div className="alert alert-info text-center py-4 fs-5 shadow-sm">
					Your cart is empty 😔
				</div>
			) : (
				<>
					{/* CART TABLE */}
					<table className="table table-hover align-middle shadow-sm">
						<thead className="table-dark">
							<tr>
								<th style={{ width: "120px" }}>Image</th>
								<th>Product</th>
								<th>Price</th>
								<th style={{ width: "120px" }}>Qty</th>
								<th>Subtotal</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{currentItems.map((item) => (
								<tr key={item.id}>
									<td>
										<img
											src={item.image || fallbackImage}
											alt={item.name}
											className="img-thumbnail"
											style={{
												width: "80px",
												height: "80px",
												objectFit: "contain",
											}}
											onError={(e) => (e.target.src = fallbackImage)}
										/>
									</td>

									<td className="fw-semibold">
										{item.name}
										<div className="text-muted small">{item.category}</div>
									</td>

									<td className="fw-bold">${item.price}</td>

									<td>
										<div className="d-flex align-items-center gap-3">

											{/* Minus */}
											<button
												className="btn btn-light border rounded-circle d-flex justify-content-center align-items-center"
												style={{ width: "32px", height: "32px" }}
												disabled={
													(qtyLoadingId === item.id && qtyAction === "minus") ||
													item.qty === 1
												}
												onClick={() =>
													handleQtyChange(item.id, item.qty - 1, "minus")
												}
											>
												{qtyLoadingId === item.id &&
													qtyAction === "minus" ? (
													<span className="spinner-border spinner-border-sm"></span>
												) : (
													<span className="fs-5 text-danger mb-1">−</span>
												)}
											</button>

											<span className="fw-bold fs-5">{item.qty}</span>

											{/* Plus */}
											<button
												className="btn btn-light border rounded-circle d-flex justify-content-center align-items-center"
												style={{ width: "32px", height: "32px" }}
												disabled={
													qtyLoadingId === item.id && qtyAction === "plus"
												}
												onClick={() =>
													handleQtyChange(item.id, item.qty + 1, "plus")
												}
											>
												{qtyLoadingId === item.id &&
													qtyAction === "plus" ? (
													<span className="spinner-border spinner-border-sm"></span>
												) : (
													<span className="fs-5 text-success mb-1">+</span>
												)}
											</button>

										</div>
									</td>

									<td className="fw-bold">
										${(item.price * item.qty).toFixed(2)}
									</td>

									<td>
										<button
											className="btn btn-danger btn-sm"
											disabled={loadingId === item.id}
											onClick={() => handleDelete(item.id)}
										>
											{loadingId === item.id ? (
												<>
													<span className="spinner-border spinner-border-sm me-1"></span>
													Deleting...
												</>
											) : (
												"Remove"
											)}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* PAGINATION UI */}
					<div className="d-flex justify-content-center my-3">
						<nav>
							<ul className="pagination">

								{/* Prev */}
								<li className={`page-item ${currentPage === 1 && "disabled"}`}>
									<button
										className="page-link"
										onClick={() => setCurrentPage((p) => p - 1)}
									>
										Previous
									</button>
								</li>

								{/* Page Numbers */}
								{Array.from({ length: totalPages }, (_, i) => (
									<li
										key={i}
										className={`page-item ${currentPage === i + 1 ? "active" : ""
											}`}
									>
										<button
											className="page-link"
											onClick={() => setCurrentPage(i + 1)}
										>
											{i + 1}
										</button>
									</li>
								))}

								{/* Next */}
								<li
									className={`page-item ${currentPage === totalPages && "disabled"
										}`}
								>
									<button
										className="page-link"
										onClick={() => setCurrentPage((p) => p + 1)}
									>
										Next
									</button>
								</li>
							</ul>
						</nav>
					</div>

					{/* TOTAL SECTION */}
					<div className="text-end mt-3">
						<h4 className="fw-bold">
							Total: <span className="text-success">${total.toFixed(2)}</span>
						</h4>
						<button className="btn btn-success btn-sm mt-2 px-4 py-2">
							Checkout
						</button>
					</div>
				</>
			)}
		</div>
	);
}