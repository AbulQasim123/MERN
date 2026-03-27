import { useState } from "react"

function ToggleText() {
    const [showText, setShowText] = useState(false)
    function TextToggle() {
        setShowText(!showText)
    }
    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black"}}>
            <h4>Toggle Text</h4>
            <button className="btn btn-sm btn-primary m-1" onClick={TextToggle}>
                {showText ? "Hide" : "Show"} Text
            </button>
            {showText && <p className="text-center text-danger fw-bold  mt-3">This is danger message</p>}
        </div>
    )
}

export default ToggleText