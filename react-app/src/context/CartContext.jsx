import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("my_cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem("my_cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id)
			if (existing) {
				return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
			}
			return [...prev, { ...product, qty: 1 }]
		})
	}


	const removeFormCart = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id))
	}


	const updateQty = (id, qty) => {
		setCart((prev) =>
			prev.map((item) => (item.id === id ? { ...item, qty } : item))
		)
	}

	const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFormCart, updateQty, total }}>
			{children}
		</CartContext.Provider>
	)
}

// Custom Hook
export const useCart = () => useContext(CartContext);