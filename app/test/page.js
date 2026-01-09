"use client"
import Test from '@/components/Test'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
{/* ONLY TEST PURPOSE */ }

const Page = () => {
    const rotation = useRef(new Vector3(0, 0, 0))

    useEffect(() => {
        let gui;
        (async () => {
            const { GUI } = await import("dat.gui")
            gui = new GUI()
            gui.add(rotation.current, 'x', 0, Math.PI * 2)
            gui.add(rotation.current, 'y', 0, Math.PI * 2)
            gui.add(rotation.current, 'z', 0, Math.PI * 2)
        })()
        return () => {
            gui.destroy()
        }
    }, [])

    return (
        <div className='h-screen w-screen overflow-hidden'>
            <Canvas>
                <color args={["gray"]} attach={"background"} />
                <ambientLight />
                <Test rotation={rotation.current} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Page