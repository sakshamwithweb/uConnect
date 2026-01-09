import { useGSAP } from '@gsap/react'
import { useFrame, useLoader } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Encrypt model through Draco in future
export const MaleCharacter = ({ position, scale, progress, segmentRefs, maleRef }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    const mixerRef = useRef()
    const mobileViewAndHandShakingActionRef = useRef()
    const idleActionRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        mixerRef.current = new AnimationMixer(glbModel.scene)

        // Mobile view clip
        const mobileViewAndHandShakingClip = glbModel.animations.find((a) => a.name == "mobileViewAndHandShaking")
        mobileViewAndHandShakingActionRef.current = mixerRef.current.clipAction(mobileViewAndHandShakingClip)

        // Idle
        const idleClip = glbModel.animations.find((a) => a.name == "idle")
        idleActionRef.current = mixerRef.current.clipAction(idleClip)

        mobileViewAndHandShakingActionRef.current.play()
        mobileViewAndHandShakingActionRef.current.paused = true
        idleActionRef.current.play()
        idleActionRef.current.paused = true
        idleActionRef.current.weight = 0
    }, [glbModel])

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: segmentRefs.current[4],
            start: "top center",
            end: "bottom center",
            scrub: true,
            animation: gsap.to(maleRef.current?.position, { y: -5, immediateRender: false })
        })

        // 1.55 5.91 1.55
        console.log()

        ScrollTrigger.create({
            trigger: segmentRefs.current[10],
            start: "top top",
            end: "bottom center",
            markers: true,
            scrub: true,
            animation: gsap.to(maleRef.current?.rotation, { x: Math.PI / 2, z: Math.PI / 2 })
        })
        ScrollTrigger.create({
            trigger: segmentRefs.current[10],
            start: "top top",
            end: "bottom center",
            markers: true,
            scrub: true,
            animation: gsap.to(maleRef.current?.position, { x: -2 })
        })
    })

    useFrame(() => {
        const mixer = mixerRef.current
        const mobileViewAndHandShakingClip = mobileViewAndHandShakingActionRef.current?.getClip()
        const idleClip = idleActionRef.current?.getClip()

        if (!mixer || !mobileViewAndHandShakingClip) return

        const seg2 = progress.current[2]
        const seg3 = progress.current[3]
        const seg4 = progress.current[4]

        const mobileViewAnimDuration = mobileViewAndHandShakingClip.duration * 0.34259259259 // 
        if (seg2 > 0 && seg2 < 1) {
            mobileViewAndHandShakingActionRef.current.time = mobileViewAnimDuration * seg2
        } else if (seg3 > 0 && seg3 < 1) {
            mobileViewAndHandShakingActionRef.current.time = ((mobileViewAndHandShakingClip.duration - mobileViewAnimDuration) * seg3) + mobileViewAnimDuration
        } else if (seg4 > 0 && seg4 < 1) {
            // mobileViewAndHandShakingActionRef.current.crossFadeTo(idleActionRef.current, 0.2)
            mobileViewAndHandShakingActionRef.current.weight = (1 - seg4) // reverse of seg4 (fuck, was debugging for literally 1 hr and got to know, I didn't add .current in mobileViewAndHandShakingActionRef.....ahhhhh)
            idleActionRef.current.weight = seg4
        }
        mixer.update(0)
    })

    return <primitive ref={maleRef} position={position} scale={scale} object={glbModel.scene} />
}

export const SecondCharacter = ({ position, scale, rotation, progress }) => {
    const model = useLoader(GLTFLoader, "/glbs/Character2.glb")
    const mixerRef = useRef()
    const handshakeActionRef = useRef()

    useEffect(() => {
        if (!model) return
        const handshakeClip = model.animations.find((a) => a.name == "Handshake")
        mixerRef.current = new AnimationMixer(model.scene)
        handshakeActionRef.current = mixerRef.current.clipAction(handshakeClip)
        handshakeActionRef.current.play()
        handshakeActionRef.current.paused = true
    }, [model])

    useFrame(() => {
        const mixer = mixerRef.current
        const seg3 = progress.current[3]

        if (seg3 > 0 && seg3 < 1) {
            handshakeActionRef.current.time = (handshakeActionRef.current?.getClip().duration - 0.2) * seg3
        }

        mixer?.update(0)
    })

    return <primitive position={position} rotation={rotation} scale={scale} object={model?.scene} />
}