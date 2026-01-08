import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'

const Camera = ({ camera, mobileRef, position, progress, maleRef, tableAndLaptopRef }) => {
    useFrame(() => {
        // if (currentFocus.current) camera.current?.lookAt(currentFocus.current?.position)
        // Here do everything of Camera
        const seg2 = progress.current[2] // B/w ai is not what you think and so does social Media
        const seg3 = progress.current[3] // So does social media
        const seg4 = progress.current[4] // 
        const seg5 = progress.current[5]
        const seg6 = progress.current[6]

        if ((seg2 > 0 && seg2 < 1) || (seg3 > 0 && seg3 < 1)) {
            camera.current?.lookAt(0, mobileRef.current?.position.y, 0)
        } else if ((seg4 > 0 && seg4 < 1) || (seg5 > 0 && seg5 < 1)) {
            camera.current?.lookAt(0, maleRef.current?.position.y + 1, 0)
        } else if (seg6 > 0 && seg6 < 1) {
            camera.current?.lookAt(0, tableAndLaptopRef.current?.position.y + 1.1, 0.4)
        }
    })
    return <PerspectiveCamera near={0.01} makeDefault ref={camera} position={position} />
}

export default Camera