import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer, LoopOnce } from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Encrypt model through Draco in future
const Characters = ({ position, scale, progress }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    // const animations = useLoader(FBXLoader, ['/anim/Waving.fbx']) // Load all maximo or other animations
    const mixerRef = useRef()
    const mobileViewClipRef = useRef()

    useEffect(() => { // progress.current[2] : 0 to 1
        // setInterval(() => console.log(progress.current[2]), 500);
    }, [progress])

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
        // console.log(progress.current[2])
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



// export const Model = (progress) => {
//     const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
//     const mixerRef = useRef()

//     useEffect(() => {
//         if (!glbModel?.scene) return
//         const clip = glbModel.animations.find((a) => a.name == "MobileView")
//         const mixer = new AnimationMixer(glbModel.scene)
//         mixerRef.current = mixer
//         const action = mixer.clipAction(clip)
//         action.play()
//     }, [glbModel])

//     useFrame(() => {
//         mixerRef.current.update()
//     })

//     return <primitive object={glbModel?.scene} />
// }