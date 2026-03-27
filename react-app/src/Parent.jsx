import { useState, useCallback } from 'react'
import Child from './Child'

function Parent() {
    const [count, setCount] = useState(0)
    const handleClick = useCallback(() => {
        console.log("Button Clicked")
    }, [])

    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
            <h4>Parent/Child Component</h4>
            <h2>Count : {count}</h2>
            <button className="btn btn-sm btn-primary m-1" onClick={() => setCount(count + 1)}>Parent Button</button>

            <Child handleClick={handleClick} />
        </div>
    )
}

export default Parent