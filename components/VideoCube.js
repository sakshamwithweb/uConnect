import { useVideoTexture } from '@react-three/drei'
import React from 'react'

const VideoCube = () => {
    const texture = useVideoTexture("/video.mp4")
    return (
        <mesh>
            <boxGeometry />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    )
}

export default VideoCube