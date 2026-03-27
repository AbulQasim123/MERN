import ToggleTest from "./ToggleTest"
import UsersJsonPlaceHolder from "./UsersJsonPlaceHolder"
import LoginForm from "./LoginForm"

function CustomHook() {
    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>

            <h4 className="text-center mb-3">Custom Hook</h4>
            {/* <ToggleTest /> */}
            {/* <UsersJsonPlaceHolder /> */}
            <LoginForm />
        </div>
    )
}

export default CustomHook