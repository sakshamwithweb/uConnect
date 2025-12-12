/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { FadeIn } from '@/components/Fade'
import Mobile from '@/components/Mobile'
import VideoCube from '@/components/VideoCube'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from "three"
import { gsap } from "gsap";
import Gsap from '@/components/Gsap'
import { Button } from '@/components/ui/button'

// Tour Page: 
const page = () => {
  const [pos, setPos] = useState([0, 0, 0])
  const rc = useRef()
  const camera = useRef()

  const handlePointMove = (event) => {
    if (!rc?.current || !camera?.current) return

    // Track the mouse coords using raycast and ~~tilt the model~~ move the camera to that side
    let mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

    camera.current.position.x = mouse.x * 0.5
    camera.current.position.y = mouse.y * 0.5

    rc.current?.setFromCamera(mouse, camera.current)

    // const intersects = rc.current.intersectObject(mobile.current, false)
    // console.log(intersects)
  }
  return (
    <div className='bg-black h-screen text-white relative'>
      {/* <FadeIn /> */}
      {/* <Canvas onPointerMove={handlePointMove}>
        <color args={["gray"]} attach={"background"} />
        <PerspectiveCamera makeDefault ref={camera} position={[0, 0, 3]} />
        <raycaster ref={rc} />
        <ambientLight />

        ~~At first float the mobile and~~ as we scroll start typing and say AI is not what you think, then bring the mobile in bottom and rotate it and get in the hand of the model who later does handshake

        <Mobile />


        <OrbitControls enableDamping enableRotate={false} enablePan={false} enableZoom={false} />
        <gridHelper />
      </Canvas> */}

      <Gsap pos={pos} />
      <div className='z-10 absolute'>
        <Button onClick={() => {
          setPos([...Array(3)].map(() => {
            return (Math.random() * 2) - 1
          }))
        }} className={"pointer-events-auto"}>Random Move</Button>
      </div>
    </div>
  )
}

export default page