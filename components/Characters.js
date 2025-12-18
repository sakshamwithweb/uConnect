import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Encrypt model through Draco in future
const Characters = ({ position, scale, progress }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    // const animations = useLoader(FBXLoader, ['/anim/Waving.fbx']) // Load all maximo or other animations
    const mixerRef = useRef()
    const mobileViewClipRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        console.log(glbModel)
        const mixer = new AnimationMixer(glbModel.scene)
        mixerRef.current = mixer
        mobileViewClipRef.current = glbModel.animations.find((a) => a.name == "MobileView")
        const mobileView = mixer.clipAction(mobileViewClipRef.current)
        mobileView.play()
        mixer.setTime(mobileViewClipRef.duration)
    }, [glbModel])

    useFrame(() => {
        const mixer = mixerRef.current
        const clip = mobileViewClipRef.current
        let t;
        if (progress.current[2] == 1) t = clip.duration * (progress.current[2] - 0.01)
        else t = clip.duration * progress.current[2]
        mixer.setTime(t)
    })

    return <primitive position={position} scale={scale} object={glbModel.scene} />
}

export default Characters
