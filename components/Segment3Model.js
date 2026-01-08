import { useLoader } from '@react-three/fiber'
import React from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const Segment3Model = () => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Table_everything.glb')
    return <primitive position={[0, -5, -0.2]} object={glbModel.scene} />
}

export default Segment3Model