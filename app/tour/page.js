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
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Tour Page: 
const page = () => {
  const rc = useRef()
  const camera = useRef()
  const progress = useRef()
  const segmentRefs = useRef([])
  const currentFocus = useRef()
  const mobileRef = useRef()
  const [mobileReady, setMobileReady] = useState(false)
  const [htmlReady, setHtmlReady] = useState(false)

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
    if (!mobileRef.current || !segmentRefs.current) return

    if (segmentRefs.current[2]) { // 2nd segment(b/w AI and Social Media) (IN FUTURE MAKE IT ALSO IN A OBJECT AND CALL!)
      currentFocus.current = mobileRef.current
      gsap.to(mobileRef.current?.position, { // Mobile position
        y: -1.2,
        duration: 2,
        scrollTrigger: {
          trigger: segmentRefs.current[2],
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })
      gsap.to(mobileRef.current?.rotation, { // Mobile Rotation
        y: Math.PI * 3,
        scrollTrigger: {
          trigger: segmentRefs.current[2],
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      })
    }

    if (segmentRefs.current[3]) {
      /* start: top center, end bottom center
      Do these:
        - Sync in the handshake animation with scroll - We need to do this in Characters components and do actions based on current segment we are working on 
        - The mobile position must be in hand..
        - Load second person as well
        - move the camera with hand then after handshake, backward so as to both people can be seen correctly
      */
    }
  }, [mobileReady, htmlReady])


  return (
    <div className='bg-black min-h-screen text-white relative'>
      <FadeIn />

      <div className='fixed top-0 left-0 h-screen w-screen'>
        <Canvas className='' > {/*onPointerMove={handlePointMove}*/}
          <color args={["gray"]} attach={"background"} />
          <Camera position={[0, 0, 0.25]} currentFocus={currentFocus} camera={camera} />
          <raycaster ref={rc} />
          <ambientLight />

          <Characters segmentRefs={segmentRefs} progress={progress} position={[0, -2.5, -0.5]} scale={[0.90, 0.90, 0.90]}  />
          <Mobile mobileRef={mobileRef} onReady={() => setMobileReady(true)} />

          {/* <OrbitControls enableDamping enableRotate={false} enablePan={false} enableZoom={false} /> */}
          <axesHelper />
          <OrbitControls />
          <gridHelper />
        </Canvas>
      </div>
      <Html progress={progress} onReady={() => setHtmlReady(true)} segmentRefs={segmentRefs} />
    </div>
  )
}

export default page