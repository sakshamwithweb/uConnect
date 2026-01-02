"use client"
import TestCharacter from '@/components/Test'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

{/* ONLY TEST PURPOSE */ }

const page = () => {
    return (
        <div className='h-screen w-screen overflow-hidden'>
            <Canvas>
                <color args={["gray"]} attach={"background"} />
                <ambientLight />
                <TestCharacter />
                <gridHelper />
                <OrbitControls enableDamping />
            </Canvas>
        </div>
    )
}

export default page