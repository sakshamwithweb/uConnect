import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const Test = ({ rotation }) => {
    const glbModel = useLoader(GLTFLoader, "/glbs/Male.glb")

    useFrame(() => {
        if (!glbModel.scene) return
        // console.log(glbModel.scene)
        // eslint-disable-next-line react-hooks/immutability
        if (glbModel.scene.rotation.x != rotation.x) glbModel.scene.rotation.x = rotation.x
        if (glbModel.scene.rotation.y != rotation.y) glbModel.scene.rotation.y = rotation.y
        if (glbModel.scene.rotation.z != rotation.z) glbModel.scene.rotation.z = rotation.z
    })

    // Got this: 1.55 5.91 1.55

    useEffect(() => {
        setInterval(() => {
            console.log(rotation)
        }, 4000);
    }, [])

    return <primitive object={glbModel.scene} />
}

export default Test