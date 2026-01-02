import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'

const Camera = ({ camera, currentFocus, position }) => {
    useFrame(() => {
        if (currentFocus.current) camera.current?.lookAt(currentFocus.current?.position)
    })
    return <PerspectiveCamera near={0.01} makeDefault ref={camera} position={position} />
}

export default Camera