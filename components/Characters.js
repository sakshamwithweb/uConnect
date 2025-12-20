/* eslint-disable react-hooks/immutability */
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Encrypt model through Draco in future
const Characters = ({ position, scale, progress }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    const mixerRef = useRef()
    const mobileViewActionRef = useRef()
    const handShakeActionRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        const mixer = new AnimationMixer(glbModel.scene)
        mixerRef.current = mixer

        // Mobile view clip
        const mobileViewClip = glbModel.animations.find((a) => a.name == "holdingmobile")
        mobileViewActionRef.current = mixer.clipAction(mobileViewClip)

        // Hand shake clip
        const handShakeClip = glbModel.animations.find((a) => a.name == "handshaking")
        handShakeActionRef.current = mixer.clipAction(handShakeClip)

        mobileViewActionRef.current.play()
        handShakeActionRef.current.play()

        mobileViewActionRef.current.paused = true
        handShakeActionRef.current.paused = true
    }, [glbModel])

    useFrame(() => {
        const mixer = mixerRef.current
        const mobileViewClip = mobileViewActionRef.current?.getClip()
        const handshakeClip = handShakeActionRef.current?.getClip()

        if (!mixer || !mobileViewClip || !handshakeClip) return

        const seg2 = progress.current[2]
        const seg3 = progress.current[3]

        if (seg2 > 0 && seg2 < 1) {
            if (mobileViewActionRef.current.weight != 1) mobileViewActionRef.current.weight = 1
            if (handShakeActionRef.current.weight != 0) handShakeActionRef.current.weight = 0
            mobileViewActionRef.current.time = mobileViewClip.duration * seg2
            // console.log(mobileViewActionRef.current)
        } else if (seg3 > 0 && seg3 < 1) {
            if (handShakeActionRef.current.weight != 1) handShakeActionRef.current.weight = 1
            if (mobileViewActionRef.current.weight != 0) handShakeActionRef.current.weight = 0
            handShakeActionRef.current.time = handshakeClip.duration * seg3
        }
        mixer.update(0)
    })

    return <primitive position={position} scale={scale} object={glbModel.scene} />
}

export default Characters
