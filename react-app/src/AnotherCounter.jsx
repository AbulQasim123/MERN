import { useState, useCallback } from "react"
function AnotherCounter() {
    const [count, setCount] = useState(0)

    const increment = useCallback(() => {
        setCount((prev) => prev + 1)
    },[])

    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
            <h4>Another Counter</h4>
            <h2>Count : {count}</h2>
            <button className="btn btn-sm btn-primary" onClick={increment}>Increment</button>
        </div>
    )
}

export default AnotherCounter