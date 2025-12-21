import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { AnimationClip, AnimationMixer } from 'three'


const TestCharacter = () => {
    const model = useLoader(GLTFLoader, "/glbs/Character2.glb")
    const box = useLoader(GLTFLoader, "/glbs/Box.glb")
    const boxMixerRef = useRef()
    const mixerRef = useRef()

    useEffect(() => {
        const clip = model.animations.find((a) => a.name == "Handshake")

        const newTrack = clip.tracks.filter((t) => t.name.toLowerCase().includes("handr")).map((t) => {
            t.name = `Box.${t.name.split(".")[1]}`
            return t
        })
        const newClip = new AnimationClip("boxMove", "1.2", newTrack, 2500)
        boxMixerRef.current = new AnimationMixer(box.scene)
        const boxAction = boxMixerRef.current.clipAction(newClip)
        boxAction.play()

        mixerRef.current = new AnimationMixer(model.scene)
        const action = mixerRef.current.clipAction(clip)
        action.play()
    }, [model, box])

    useFrame(() => {
        mixerRef.current?.update(1 / 60)
        boxMixerRef.current?.update(1 / 60)
    })

    return <>
        <primitive object={box?.scene} />
        <primitive object={model?.scene} />
    </>
}

export default TestCharacter