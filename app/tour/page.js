/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Camera from '@/components/Camera'
import { FadeIn } from '@/components/Fade'
import Html from '@/components/Html'
import Mobile from '@/components/Mobile'
import { useGSAP } from '@gsap/react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Tour Page: 
const page = () => {
  const [segment, setSegment] = useState(0)
  const rc = useRef()
  const camera = useRef()
  const segmentRef = useRef()
  const currentFocus = useRef()
  const mobileRef = useRef()

  const handlePointMove = (event) => {
    if (!rc?.current || !camera?.current) return

    let mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)

    camera.current.position.x = mouse.x * 0.5
    camera.current.position.y = mouse.y * 0.5

    rc.current?.setFromCamera(mouse, camera.current)
  }

  useGSAP(() => {
    if (!mobileRef.current || !segmentRef.current) return // || !camera.current

    if (segment == 1) {
      currentFocus.current = mobileRef.current
      gsap.to(mobileRef.current?.position, { // Mobile position
        y: -5,
        duration: 2,
        scrollTrigger: {
          trigger: segmentRef.current,
          start: "top 20%",
          end: "+=2000px",
          scrub: true
        }
      })
      gsap.to(mobileRef.current?.rotation, { // Mobile Rotation
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: segmentRef.current,
          start: "top -20%",
          end: "+=1500px",
          scrub: true
        }
      })
    }
  }, [segment, segmentRef.current])


  return (
    <div className='bg-black min-h-screen text-white relative'>
      <FadeIn />

      <div className='fixed top-0 left-0 h-screen w-screen'>
        <Canvas className='' onPointerMove={handlePointMove}>
          <color args={["gray"]} attach={"background"} />
          <Camera currentFocus={currentFocus} camera={camera} />
          <raycaster ref={rc} />
          <ambientLight />

          {/* ~~At first float the mobile and~~ as we scroll start typing and say AI is not what you think, then bring the mobile in bottom and rotate it and get in the hand of the model who later does handshake */}
          <Mobile mobileRef={mobileRef} />

          <OrbitControls enableDamping enableRotate={false} enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
      <Html segmentRef={segmentRef} setSegment={setSegment} />
    </div>
  )
}

export default page