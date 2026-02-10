
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onToggle }) {
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <button
                    className="btn btn-sm btn-outline-light d-lg-none"
                    onClick={onToggle}
                >
                    <i className="bi bi-list"></i>
                </button>
                <span className="navbar-brand mb-0 h1">Library Admin</span>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle d-flex align-items-center"
                            href="#!"
                            id="profileDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-person-circle fs-4"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link className="dropdown-item" to="/profile">Profile</Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <button className="dropdown-item" onClick={logout}>
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </button>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}