
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState } from "react";

export default function Layout({ children }) {
    const [toggled, setToggled] = useState(false);
    return (
        <div className="d-flex">
            <SideBar toggled={toggled} />
            <div className="content-wrapper w-100">
                <Header onToggle={() => setToggled(!toggled)} />
                <main className="p-3 bg-light">{children}</main>
                <Footer />
            </div>
        </div>
    );
}