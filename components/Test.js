import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { AnimationMixer } from 'three'


const TestCharacter = () => {
    const model = useLoader(GLTFLoader, "/glbs/Male.glb")
    const mixerRef = useRef()

    useEffect(() => {
        const clip = model.animations.find((a) => a.name == "handshaking")
        const mixer = new AnimationMixer(model.scene)
        mixerRef.current = mixer
        const action = mixer.clipAction(clip)
        action.play()
    }, [model])

    useFrame(() => {
        mixerRef.current?.update(1/60)
    })

    return <primitive object={model?.scene} />
}

export default TestCharacter