/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Camera from '@/components/Camera'
import { MaleCharacter, SecondCharacter } from '@/components/Characters'
import { FadeIn } from '@/components/Fade'
import Html from '@/components/Html'
import Mobile from '@/components/Mobile'
import TableAndLaptop from '@/components/TableAndLaptop'
import Test from '@/components/Test'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from "three"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const page = () => {
  const rc = useRef()
  const camera = useRef()
  const progress = useRef()
  const segmentRefs = useRef([])
  const mobileRef = useRef()
  const tableAndLaptopRef = useRef()
  const [mobileReady, setMobileReady] = useState(false)
  const [htmlReady, setHtmlReady] = useState(false)
  const maleRef = useRef()

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

  useEffect(() => {
    console.clear({})
  }, [])

  useGSAP(() => {
    if (!mobileRef.current || segmentRefs.current.length === 0) return

    // immediateRender false cuz values are being changed and we want latest value in from

    ScrollTrigger.create({
      trigger: segmentRefs.current[2],
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.to(mobileRef.current?.position, { y: -1.2, immediateRender: false })
    })
    ScrollTrigger.create({
      trigger: segmentRefs.current[2],
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.to(mobileRef.current?.rotation, { y: Math.PI * 3, immediateRender: false })
    })

    ScrollTrigger.create({
      trigger: segmentRefs.current[3],
      scrub: true,
      animation: gsap.to(camera.current?.position, { x: 4, y: -1, immediateRender: false })
    })

    ScrollTrigger.create({
      trigger: segmentRefs.current[4],
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.to(camera.current?.position, { y: -3.5, immediateRender: false })
    })

    ScrollTrigger.create({
      trigger: segmentRefs.current[5],
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.to(camera.current?.position, { x: 0, z: 3, immediateRender: false })
    })

    ScrollTrigger.create({
      trigger: segmentRefs.current[6],
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      animation: gsap.to(camera.current?.position, { z: 0.1, immediateRender: false, y: -3.7 })
    })
  }, [mobileReady, htmlReady])


  return (
    <div className='bg-black min-h-screen text-white relative'>
      <FadeIn />

      <div className='fixed top-0 left-0 h-screen w-screen'>
        <Canvas className='' > {/*onPointerMove={handlePointMove}*/}
          <color args={["gray"]} attach={"background"} />
          <Camera tableAndLaptopRef={tableAndLaptopRef} maleRef={maleRef} progress={progress} position={[0, 0, 0.25]} mobileRef={mobileRef} camera={camera} />
          <raycaster ref={rc} />
          <ambientLight />

          <Mobile progress={progress} mobileRef={mobileRef} onReady={() => setMobileReady(true)} />
          <group>
            <MaleCharacter maleRef={maleRef} segmentRefs={segmentRefs} progress={progress} position={[0, -2.5, -0.5]} scale={[0.90, 0.90, 0.90]} />
            <SecondCharacter progress={progress} rotation={[0, Math.PI, 0]} position={[0.1, -1.7, 0.85]} scale={[0.9, 0.9, 0.9]} />
          </group>
          {/* <Test pos={[0, tableAndLaptopRef.current?.position.y + 1.1, 0.4]} /> */}

          <TableAndLaptop tableAndLaptopRef={tableAndLaptopRef} />
          <gridHelper />
        </Canvas>
      </div>
      <Html progress={progress} onReady={() => setHtmlReady(true)} segmentRefs={segmentRefs} />
    </div>
  )
}

export default page