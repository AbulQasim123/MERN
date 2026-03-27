import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Laptop from "./Laptop"
import Phone from "./Phone"
import Products from "./Products"
function ReactRouter() {

	function User() {
		console.log(useParams())
		const { id } = useParams();
		return (
			<div className="mt-3">
				<h5>User Profile for Id {id}</h5>
			</div>
		)
	}


	function NotFound() {
		return (
			<div className="mt-3">
				<h5>4o4 - Page Not Found</h5>
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
				<h4 className="text-center mb-3">React Router Example</h4>
				<nav style={{ display: "flex", gap: "10px", padding: "10px", border: "1px solid black", borderRadius: "5px" }}>
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
					<Link to="/contact">Contact</Link>
					<Link to="/user/10">User</Link>
					<Link to="/products">Product</Link>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/user/:id" element={<User />} />
					<Route path="/products" element={<Products />} >
						<Route path="phone" element={<Phone />} />
						<Route path="laptop" element={<Laptop />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</BrowserRouter >
	)
}

export default ReactRouter