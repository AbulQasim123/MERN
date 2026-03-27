import { Link, Outlet } from 'react-router-dom'
function Products() {
    return (
        <div className="mt-3">
            <h5>Products Page</h5>
            <nav>
                <Link to="phone">Phone</Link>   |
                <Link to="laptop">   Laptop</Link>
            </nav>

            <Outlet />
        </div>
    )
}

export default Products