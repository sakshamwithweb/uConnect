/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { FadeIn } from '@/components/Fade'
import Html from '@/components/Html'
import Mobile from '@/components/Mobile'
import { useGSAP } from '@gsap/react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'
import * as THREE from "three"

gsap.registerPlugin(useGSAP)

// Tour Page: 
const page = () => {
  const rc = useRef()
  const camera = useRef()
  const [progress, setProgress] = useState(0)

  const handlePointMove = (event) => {
    if (!rc?.current || !camera?.current) return

    let mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

    camera.current.position.x = mouse.x * 0.5
    camera.current.position.y = mouse.y * 0.5

    rc.current?.setFromCamera(mouse, camera.current)
  }

  return (
    <div className='bg-black min-h-screen text-white relative'>
      <FadeIn />

      <div className='fixed top-0 left-0 h-screen w-screen'>
        <Canvas className='' onPointerMove={handlePointMove}>
          <color args={["gray"]} attach={"background"} />
          <PerspectiveCamera makeDefault ref={camera} position={[0, 0, 3]} />
          <raycaster ref={rc} />
          <ambientLight />

          {/* ~~At first float the mobile and~~ as we scroll start typing and say AI is not what you think, then bring the mobile in bottom and rotate it and get in the hand of the model who later does handshake */}
          <Mobile />

          <OrbitControls enableDamping enableRotate={false} enablePan={false} enableZoom={false} />
        </Canvas>
      </div>

      <Html setProgress={setProgress} />
    </div>
  )
}

export default page