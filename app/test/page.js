"use client"
import Characters from '@/components/Characters'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const page = () => {
    return (
        <div className='h-screen w-screen overflow-hidden'>
            <Canvas>
                <color args={["gray"]} attach={"background"} />
                <ambientLight />
                <Characters />
                <OrbitControls enableDamping />
            </Canvas>
        </div>
    )
}

export default page