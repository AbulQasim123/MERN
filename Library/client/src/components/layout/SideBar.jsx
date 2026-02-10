import { NavLink } from "react-router-dom";

const nav = [
    { to: "/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { to: "/authors", label: "Authors", icon: "bi-person-lines-fill" },
    { to: "/categories", label: "Categories", icon: "bi-tags" },
    { to: "/members", label: "Members", icon: "bi-people" },
    { to: "/books", label: "Books", icon: "bi-book" },
    { to: "/book-issue", label: "Issued Books", icon: "bi-book" },
];

export default function SideBar({ toggled }) {
    return (
        <nav
            className={`sidebar d-none d-lg-block ${toggled ? "d-block" : ""
                } p-3`}
            style={{ width: 220 }}
        >
            <ul className="nav nav-pills flex-column">
                {nav.map((n) => (
                    <li key={n.to} className="nav-item mb-1">
                        <NavLink
                            to={n.to}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center ${isActive ? "active" : ""
                                }`
                            }
                        >
                            <i className={`bi ${n.icon} me-2`}></i>
                            {n.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}