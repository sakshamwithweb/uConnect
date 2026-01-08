import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { DoubleSide } from 'three'
import { MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const TableAndLaptop = ({ tableAndLaptopRef }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Table_everything.glb')
    const texture = useTexture("/media/ide.png")
    useEffect(() => {
        const screen = glbModel.scene.getObjectByName("Screen")
        screen.material = new MeshStandardMaterial({
            map: texture,
            side: DoubleSide
        })
        screen.material.needsUpdate = true;
    }, [])
    return <primitive ref={tableAndLaptopRef} position={[0, -5, -0.3]} object={glbModel.scene} />
}

export default TableAndLaptop