import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const Characters = () => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Male.glb')
    const animations = useLoader(FBXLoader, ['/anim/Waving.fbx'])
    const mixerRef = useRef()

    useEffect(() => {
        if (!glbModel?.scene) return
        const mixer = new AnimationMixer(glbModel.scene)
        mixerRef.current = mixer
        mixer.clipAction(animations[0].animations[0]).play()
    }, [glbModel, animations])

    useFrame(() => {
        mixerRef.current?.update(1 / 60)
    })

    return <primitive scale={[2, 2, 2]} object={glbModel.scene} />
}

export default Characters