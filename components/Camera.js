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
        const seg7 = progress.current[7]
        const seg8 = progress.current[8]
        const seg9 = progress.current[9]
        const seg10 = progress.current[10]

        if ((seg2 > 0 && seg2 < 1) || (seg3 > 0 && seg3 < 1)) {
            camera.current?.lookAt(0, mobileRef.current?.position.y, 0)
        } else if ((seg4 > 0 && seg4 < 1) || (seg5 > 0 && seg5 < 1)) {
            camera.current?.lookAt(0, maleRef.current?.position.y + 1, 0)
        } else if ((seg6 > 0 && seg6 < 1) || (seg7 > 0 && seg7 < 1) || (seg8 > 0 && seg8 < 1) || (seg9 > 0 && seg9 < 1)) {
            camera.current?.lookAt(0, tableAndLaptopRef.current?.position.y + 1.1, 0.4)
        } else if (seg10 > 0 && seg10 < 1) {
            camera.current?.lookAt(maleRef.current?.position.x-1, maleRef.current?.position.y, maleRef.current?.position.z)
        }
    })
    return <PerspectiveCamera near={0.01} makeDefault ref={camera} position={position} />
}

export default Camera