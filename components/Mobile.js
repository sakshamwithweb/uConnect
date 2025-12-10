/* eslint-disable react-hooks/immutability */
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React, { useEffect } from 'react'
import { useVideoTexture } from '@react-three/drei'
import * as THREE from "three"

const Mobile = () => {
    const gltf = useLoader(GLTFLoader, "/glbs/Mobile.glb")
    const texture = useVideoTexture("/input.mp4")

    useEffect(() => {
        const screenMesh = gltf.scene.getObjectByName("Screen")
        screenMesh.material = new THREE.MeshStandardMaterial({
            map: texture,
            toneMapped: true,
            metalness: 0,
            roughness: 1,
            side: THREE.FrontSide
        });
        texture.flipY = false
        texture.needsUpdate = true
        screenMesh.material.needsUpdate = true;
    }, [gltf, texture])

    useFrame(({ clock }) => {
        // Floating effect
        const time = clock.getElapsedTime();
        gltf.scene.position.y = Math.sin(time) * 0.05
    })

    return <primitive object={gltf.scene} />
}

export default Mobile