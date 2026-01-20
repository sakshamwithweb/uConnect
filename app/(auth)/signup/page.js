"use client"
import LoginCharacters from '@/components/authCharacters/main'
import SignupForm from '@/components/signup/Main'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"

const Login = () => {
  const pointer = useRef(new THREE.Vector2())
  const plane = new THREE.Plane()
  const planeNormal = new THREE.Vector3(0, 0, 1);
  const planePoint = new THREE.Vector3(0, 0, 0);
  plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint)
  const raycasterRef = useRef()
  const cameraRef = useRef()
  const [showPswrd, setShowPswrd] = useState(false)
  const [event, setEvent] = useState("")

  const handleMouseMove = ({ clientX, clientY }) => {
    pointer.current.x = (clientX / window.innerWidth) * 2 - 1
    pointer.current.y = -((clientY / window.innerHeight) * 2 - 1)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (showPswrd) setEvent("showPassword")
  }, [showPswrd])

  return (
    <div onMouseMove={handleMouseMove} className='flex min-h-screen'>
      <div className='w-[40%]'>
        <Canvas>
          <LoginCharacters states={{ event: event }} pointer={pointer} raycasterRef={raycasterRef} plane={plane} />
          <ambientLight />
          <raycaster ref={raycasterRef} />
          <OrthographicCamera ref={cameraRef} args={[-5, 5, 5, -5, 0.1, 100]} zoom={100} position={[0, 0, 10]} makeDefault />
        </Canvas>
      </div>
      <SignupForm showPswrd={showPswrd} setShowPswrd={setShowPswrd} setEvent={setEvent} />
    </div>
  )
}

export default Login