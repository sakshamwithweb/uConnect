/* eslint-disable react-hooks/immutability */
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Encrypt model through Draco in future
export const MaleCharacter = ({ position, scale, progress }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    const mixerRef = useRef()
    const mobileViewAndHandShakingActionRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        const mixer = new AnimationMixer(glbModel.scene)
        mixerRef.current = mixer

        // Mobile view clip
        const mobileViewAndHandShakingClip = glbModel.animations.find((a) => a.name == "mobileViewAndHandShaking")
        mobileViewAndHandShakingActionRef.current = mixerRef.current.clipAction(mobileViewAndHandShakingClip)

        mobileViewAndHandShakingActionRef.current.play()
        mobileViewAndHandShakingActionRef.current.paused = true
    }, [glbModel])

    useFrame(() => {
        const mixer = mixerRef.current
        const mobileViewAndHandShakingClip = mobileViewAndHandShakingActionRef.current?.getClip()

        if (!mixer || !mobileViewAndHandShakingClip) return

        const seg2 = progress.current[2]
        const seg3 = progress.current[3]

        if (seg2 > 0 && seg2 < 1) {
            mobileViewAndHandShakingActionRef.current.time = (mobileViewAndHandShakingClip.duration / 3) * seg2
        } else if (seg3 > 0 && seg3 < 1) {
            mobileViewAndHandShakingActionRef.current.time = (mobileViewAndHandShakingClip.duration * seg3) + mobileViewAndHandShakingClip.duration / 3
        }
        mixer.update(0)
    })

    return <primitive position={position} scale={scale} object={glbModel.scene} />
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
            handshakeActionRef.current.time = (handshakeActionRef.current?.getClip().duration-0.2) * seg3
        }

        mixer?.update(0)
    })

    return <primitive position={position} rotation={rotation} scale={scale} object={model?.scene} />
}