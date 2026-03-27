import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import CartPage from './pages/CartPage'
import ProductDetail from "./components/ProductDetail";
import { CartProvider, useCart } from './context/CartContext'
import ProductHome from "./pages/ProductHome"
import { Toaster } from "react-hot-toast";
function Navbar() {
    const { cart } = useCart()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">🛒 MyShop</Link>
                <div>
                    <Link className="nav-link d-inline me-3 text-white" to="/">Home</Link>
                    <Link className="nav-link d-inline me-3 text-white" to="/cart">Cart ({cart.length})</Link>
                </div>
            </div>
        </nav>
    )
}

function ShoppingCart() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <div className="container py-4">
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/" element={<ProductHome />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    )
}

export default ShoppingCart