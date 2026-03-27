import { useState } from "react"
function Counter() {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        if (count <= 0) return
        setCount(count - 1)
    }

    function reset() {
        setCount(0)
    }
    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black"}}>
            <h4>Counter</h4>
            <button className="btn btn-sm btn-primary m-1" onClick={increment}>Increment</button>
            <button className="btn btn-sm btn-primary m-1" onClick={decrement}>Decrement</button>
            <button className="btn btn-sm btn-primary m-1" onClick={reset}>Reset</button>
            <p>Count: {count}</p>
        </div>
    )
}

export default Counter