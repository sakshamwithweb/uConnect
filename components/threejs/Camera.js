import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'

const Camera = ({ cameraRef, mobileRef, position, progress, maleRef, tableAndLaptopRef }) => {
    const seg = (idx) => progress.current[idx]
    const isBetween = (val, min, max) => val > min && val < max

    useFrame(() => {
        if (isBetween(seg(2), 0, 1) || isBetween(seg(3), 0, 1)) {
            cameraRef.current?.lookAt(0, mobileRef.current?.position.y, 0)
        } else if (isBetween(seg(4), 0, 1) || isBetween(seg(5), 0, 1)) {
            cameraRef.current?.lookAt(0, maleRef.current?.position.y + 1, 0)
        } else if (isBetween(seg(6), 0, 1) || isBetween(seg(7), 0, 1) || isBetween(seg(8), 0, 1) || isBetween(seg(9), 0, 1)) {
            cameraRef.current?.lookAt(0, tableAndLaptopRef.current?.position.y + 1.1, 0.4)
        } else if (isBetween(seg(10), 0, 1)) {
            cameraRef.current?.lookAt(maleRef.current?.position.x - 1, maleRef.current?.position.y, maleRef.current?.position.z)
        }
    })
    return <PerspectiveCamera near={0.01} makeDefault ref={cameraRef} position={position} />
}

export default Camera