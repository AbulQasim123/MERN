import { useEffect, useLayoutEffect } from "react"

function Test() {
    useEffect(() => {
        console.log('useEffect');
    });

    useLayoutEffect(() => {
        console.log('useLayoutEffect');
    });

    return (
        <div>Use Effect Call after component render, useLayoutEffect Call before component renderf</div>
    )
}

export default Test