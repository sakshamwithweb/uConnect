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
      <Canvas camera={{ position: [0, 0, 2] }}>
        <color args={["gray"]} attach={"background"} />

        {/*At first float the mobile and as we scroll start typing and say AI is not what you think, then bring the mobile in bottom and rotate it and get in the hand of the model who later does handshake*/}
        <Mobile />

        <ambientLight />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default page