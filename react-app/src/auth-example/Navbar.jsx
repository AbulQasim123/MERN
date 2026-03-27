import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
    const { isLoggedIn, login, logout } = useContext(AuthContext)

    return (
        <nav>
            {isLoggedIn ? (
                <button className="btn btn-secondary btn-sm" onClick={logout}>Logout</button>
            ) : (
                <button className="btn btn-primary btn-sm" onClick={login}>Login</button>
            )}
        </nav>
    )
}

export default NavBar;