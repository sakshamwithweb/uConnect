import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'

const Camera = ({ camera, currentFocus }) => {
    useFrame(() => {
        if (currentFocus.current) camera.current?.lookAt(currentFocus.current?.position)
    })
    return <PerspectiveCamera makeDefault ref={camera} position={[0, 0, 3]} />
}

export default Camera