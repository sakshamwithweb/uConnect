import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from "gsap"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const Gsap = ({ pos }) => {
    // const timelineConfig = useMemo(() => ({
    //     start: [{ opacity: 0, backgroundColor: "black" }, { opacity: 1, duration: 3 }]
    // }), [])

    // useEffect(() => {
    //     const timeline = gsap.timeline();
    //     const { start } = timelineConfig;
    //     timeline.fromTo("body", ...start)
    // }, [])

    const boxRef = useRef()

    useGSAP(() => {
        gsap.to(boxRef.current?.rotation, { x: pos[0], y: pos[1], z: pos[2], duration: 0.5 })
    }, [pos])


    return <div className='fixed top-0 h-screen w-screen'>
        <Canvas camera={{ position: [5, 5, 5] }}>
            <mesh ref={boxRef}>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial />
            </mesh>
            <ambientLight />
            <gridHelper args={[100, 20]} />
            <OrbitControls />
        </Canvas>
    </div>
}

export default Gsap