import { useLayoutEffect, useState, useRef } from "react"

function Example1() {
    const boxRef = useRef(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setHeight(boxRef.current.clientHeight);
    }, [])
    return (
        <>
            <div ref={boxRef} style={{ width: "200px", padding: "20px", background: "#eee" }}>
                Hello world, Measure Me
            </div>
            <p>Height: {height}</p>
        </>
    )
}

export default Example1