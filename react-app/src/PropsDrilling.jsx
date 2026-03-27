import { useState } from "react"

function Parent() {
    const [text, setText] = useState("")
    return (
        <div>
            <InputBox onChange={setText} />
            <Display value={text} />
        </div>
    )
}

function InputBox({ onChange }) {
    return <input type="text" name="text" className="form-control mb-3" placeholder="Enter text" id="text" onChange={(e) => onChange(e.target.value)} />
}

function Display({ value }) {
    return <h6>Typed: {value}</h6>
}
function PropsDrilling() {
    return (
        <div className="container mt-4 p-4 rounded shadow"
            style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">Props Drilling</h4>
            <Parent />
        </div>
    )
}

export default PropsDrilling