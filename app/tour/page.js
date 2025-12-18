/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Camera from '@/components/Camera'
import Characters from '@/components/Characters'
import { FadeIn } from '@/components/Fade'
import Html from '@/components/Html'
import Mobile from '@/components/Mobile'
import { useGSAP } from '@gsap/react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef, useState } from 'react'
import * as THREE from "three"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Tour Page: 
const page = () => {
  const [segment, setSegment] = useState(0)
  const rc = useRef()
  const camera = useRef()
  const firstSegmentRef = useRef()
  const currentFocus = useRef()
  const mobileRef = useRef()

  // IN FUTURE CHANGE THE EFFECT WEIGHT ACCORDING TO CAMERA POSITION(the closer, the less)
  const handlePointMove = (event) => {
    if (!rc?.current || !camera?.current) return

    let mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

    camera.current.position.x = mouse.x * 0.01
    camera.current.position.y = mouse.y * 0.01

    rc.current?.setFromCamera(mouse, camera.current)
  }

  useGSAP(() => {
    if (!mobileRef.current || !firstSegmentRef.current) return // || !camera.current

    if (segment == 1) {
      currentFocus.current = mobileRef.current
      gsap.to(mobileRef.current?.position, { // Mobile position
        y: -1.2,
        duration: 2,
        scrollTrigger: {
          trigger: firstSegmentRef.current,
          start: "top 20%",
          end: "+=2000px",
          scrub: true
        }
      })
      gsap.to(mobileRef.current?.rotation, { // Mobile Rotation
        y: Math.PI * 3,
        scrollTrigger: {
          trigger: firstSegmentRef.current,
          start: "top -20%",
          end: "+=1500px",
          scrub: true
        }
      })
    }
  }, [segment, firstSegmentRef.current])


  return (
    <div className='bg-black min-h-screen text-white relative'>
      <FadeIn />

      <div className='fixed top-0 left-0 h-screen w-screen'>
        <Canvas className='' onPointerMove={handlePointMove}>
          <color args={["gray"]} attach={"background"} />
          <Camera position={[0, 0, 0.25]} currentFocus={currentFocus} camera={camera} />
          <raycaster ref={rc} />
          <ambientLight />

          {/*Sync in the animation with gsap!*/}
          <Mobile mobileRef={mobileRef} />
          <Characters position={[0, -2.5, -0.5]} scale={[0.90, 0.90, 0.90]} />

          {/* <OrbitControls enableDamping enableRotate={false} enablePan={false} enableZoom={false} /> */}
          <axesHelper />
          <OrbitControls />
        </Canvas>
      </div>
      <Html firstSegmentRef={firstSegmentRef} setSegment={setSegment} />
    </div>
  )
}

export default page