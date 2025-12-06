import { useEffect, useState } from "react"

export const FadeIn = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(false))
        return () => cancelAnimationFrame(id)
    }, [])

    return (
        <div className={`absolute inset-0 pointer-events-none z-50 bg-black transition-opacity duration-3000 ${visible ? "opacity-100" : "opacity-0"}`} />
    )
}

export const FadeOut = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(id)
    }, [])

    return (
        <div className={`absolute inset-0 pointer-events-none z-50 bg-black transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} />
    )
}
