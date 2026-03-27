import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-dark mt-5 bg-dark px-3">
            <Link to="/" className="navbar-brand">
                🎬 Movie Explorer
            </Link>
            <div>
                <Link to="/" className="btn btn-outline-light btn-sm">
                    Home
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
