import { useState, useEffect } from "react"
function Timer() {
    const [second, setSecond] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
            console.log('Timer Cleared')
        }
    }, [])

    return (
        <div>
            <h2>Second: {second}</h2>
        </div>
    )
}

export default Timer