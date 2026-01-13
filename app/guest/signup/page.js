"use client"
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const Signup = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='w-[40%]'>
        <Canvas>
          <ambientLight />
          <OrthographicCamera args={[-5, 5, 5, -5, 0.1, 100]} zoom={100} position={[0, 0, 10]} makeDefault />
        </Canvas>
      </div>
      <div className='w-[60%] border'>

      </div>
    </div>
  )
}

export default Signup