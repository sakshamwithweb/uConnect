import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer, LoopOnce } from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Encrypt model through Draco in future
const Characters = ({ position, scale }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    // const animations = useLoader(FBXLoader, ['/anim/Waving.fbx']) // Load all maximo or other animations
    const mixerRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        console.log(glbModel)
        const mixer = new AnimationMixer(glbModel.scene)
        mixerRef.current = mixer

        const mobileView = mixer.clipAction(glbModel.animations.find((a) => a.name == "MobileView"))
        mobileView.play()
        // mobileView.setLoop(LoopOnce)
        // mobileView.clampWhenFinished = true
        // mobileView.paused = true;
    }, [glbModel])

    useFrame(() => {
        mixerRef.current?.update(1 / 60)
    })

    return <primitive position={position} scale={scale} object={glbModel.scene} />
}

export default Characters