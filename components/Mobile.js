import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React from 'react'

const Mobile = () => {
    const gltf = useLoader(GLTFLoader, "/glbs/Mobile.glb")
    // const mobile = useRef()
    useFrame(() => {
        gltf?.scene.rotateY(-0.05)
    })
    return <primitive object={gltf.scene} />
}

export default Mobile