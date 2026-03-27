import { useState, useEffect } from "react"
function First() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `React is a fun`
        // console.log(`Component rendered ${count} times`)
    }, [count])

    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
            <button className="btn btn-sm btn-primary m-2" onClick={() => setCount(count + 1)}>Increment ({count})</button>
        </div>
    )
}

export default First
