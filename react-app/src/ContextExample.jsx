import NavBar from "./auth-example/Navbar";
import { AuthProvider } from "./auth-example/AuthContext";
import { useState } from "react";
import ThemeContext from "./theme-example/ThemeContext";
import Toolbar from "./theme-example/Toolbar";


function ContextExample() {
    const [theme, setTheme] = useState("light");

    return (
        <>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
                    <h4 className="text-center mb-3">use Context Example</h4>
                    <Toolbar />

                    <AuthProvider>
                        <NavBar />
                    </AuthProvider>
                </div>
            </ThemeContext.Provider>
        </>
    )
}

// function ContextExample() {
//     const user = { name: "Qasim", role: "Admin" };
//     return (
//         <>
//             <UserContext.Provider value={user}>
//                 <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
//                     <h4 className="text-center mb-3">use Context Example</h4>
//                     <Parent />
//                 </div>
//             </UserContext.Provider>
//         </>
//     )
// }

// function Parent() {
//     return <Child />
// }

// function Child() {
//     return (
//         <div>
//             <GrandChild />
//         </div>
//     )
// }

// function GrandChild(){
//     const {name, role} = useContext(UserContext)
//     return <h5>Welcome {name} - your role is {role}</h5>;
// }

export default ContextExample