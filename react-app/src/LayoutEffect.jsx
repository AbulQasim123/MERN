import Example2 from "./Example2"
import Example1 from "./Example1"
import Test from "./Test"
import Chat from "./Chat"

function LayoutEffect() {
    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">use Layout Effect</h4>
            <Chat />
            {/* <Example2 /> */}
            {/* <Example1 /> */}
            {/* <Test /> */}
        </div>
    )
}

export default LayoutEffect