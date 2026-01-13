/* eslint-disable react-hooks/immutability */
"use client"
import LoginCharacters from '@/components/loginCharacters'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three"

const Login = () => {
  const pointer = new THREE.Vector2()
  const plane = new THREE.Plane()
  const planeNormal = new THREE.Vector3(0, 0, 1);
  const planePoint = new THREE.Vector3(0, 0, 0);
  plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint)
  const raycasterRef = useRef()
  const cameraRef = useRef()

  const handleMouseMove = ({ clientX, clientY }) => {
    pointer.x = (clientX / window.innerWidth) * 2 - 1
    pointer.y = -((clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <div onMouseMove={handleMouseMove} className='flex min-h-screen bg-black'>
      <div className='w-[40%]'>
        <Canvas>
          <LoginCharacters pointer={pointer} raycasterRef={raycasterRef} plane={plane}/>
          <ambientLight />
          <raycaster ref={raycasterRef} />
          <OrthographicCamera ref={cameraRef} args={[-5, 5, 5, -5, 0.1, 100]} zoom={100} position={[0, 0, 10]} makeDefault />
        </Canvas>
      </div>
      <div className='w-[60%] border'>

      </div>
    </div>
  )
}

export default Login