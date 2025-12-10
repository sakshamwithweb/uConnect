"use client"
import { FadeIn } from '@/components/Fade'
import Mobile from '@/components/Mobile'
import VideoCube from '@/components/VideoCube'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

// Tour Page: 
const page = () => {
  return (
    <div className='bg-black h-screen text-white'>
      <FadeIn />
      <Canvas>
        <color args={["pink"]} attach={"background"} />
        <Mobile />
        {/* <VideoCube/> */}
        <ambientLight />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default page