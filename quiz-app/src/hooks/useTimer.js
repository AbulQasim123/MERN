import { useState, useEffect, useCallback } from 'react'

export default function useTimer(initialSeconds) {
    const [time, setTime] = useState(initialSeconds)
    const [isActive, setIsActive] = useState(true)

    const reset = useCallback(() => {
        setTime(initialSeconds)
        setIsActive(true)
    }, [initialSeconds])

    const pause = useCallback(() => {
        setIsActive(false)
    }, [])

    const resume = useCallback(() => {
        setIsActive(true)
    }, [])

    useEffect(() => {
        let interval
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prev => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [time, isActive])

    return {
        time,
        reset,
        pause,
        resume,
        isActive
    }
}