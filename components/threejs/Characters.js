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

    const seg = (idx) => progress.current[idx]
    const isBetween = (val, min, max) => val > min && val < max

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
        const scrollConfigs = [
            {
                trigger: segmentRefs.current[4],
                start: "top center",
                end: "bottom center",
                scrub: true,
                animation: gsap.to(maleRef.current?.position, { y: -5, immediateRender: false })
            },
            {
                trigger: segmentRefs.current[10],
                start: "top top",
                end: "bottom center",
                scrub: true,
                animation: gsap.to(maleRef.current?.rotation, { x: Math.PI / 2, z: Math.PI / 2 })
            },
            {
                trigger: segmentRefs.current[10],
                start: "top top",
                end: "bottom center",
                scrub: true,
                animation: gsap.to(maleRef.current?.position, { x: -2 })
            }
        ]
        scrollConfigs.forEach((config) => ScrollTrigger.create(config))
    })

    useFrame(() => {
        const mixer = mixerRef.current
        const mobileViewAndHandShakingClip = mobileViewAndHandShakingActionRef.current?.getClip()

        if (!mixer || !mobileViewAndHandShakingClip) return


        const mobileViewAnimDuration = mobileViewAndHandShakingClip.duration * 0.34259259259 // 
        if (isBetween(seg(2), 0, 1)) {
            mobileViewAndHandShakingActionRef.current.time = mobileViewAnimDuration * seg(2)
        } else if (isBetween(seg(3), 0, 1)) {
            mobileViewAndHandShakingActionRef.current.time = ((mobileViewAndHandShakingClip.duration - mobileViewAnimDuration) * seg(3)) + mobileViewAnimDuration
        } else if (isBetween(seg(4), 0, 1)) {
            mobileViewAndHandShakingActionRef.current.weight = (1 - seg(4)) // reverse of seg4
            idleActionRef.current.weight = seg(4)
        }
        mixer.update(0)
    })

    return <primitive ref={maleRef} position={position} scale={scale} object={glbModel.scene} />
}

export const SecondCharacter = ({ position, scale, rotation, progress }) => {
    const model = useLoader(GLTFLoader, "/glbs/female.glb")
    const mixerRef = useRef()
    const handshakeActionRef = useRef()

    const seg = (idx) => progress.current[idx]
    const isBetween = (val, min, max) => val > min && val < max

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

        if (isBetween(seg(3), 0, 1)) {
            handshakeActionRef.current.time = (handshakeActionRef.current?.getClip().duration - 0.2) * seg(3)
        }

        mixer?.update(0)
    })

    return <primitive position={position} rotation={rotation} scale={scale} object={model?.scene} />
}