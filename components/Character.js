import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { OrbitControls, Stats } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from "three";

const Char = ({ position, url, rotation }) => {
    let mixer = null;
    const { scene, animations } = useLoader(GLTFLoader, url)
    // console.log(scene, animations)
    mixer = new THREE.AnimationMixer(scene)
    mixer.clipAction(animations[0]).play()
    useFrame((state, delta) => {
        mixer.update(delta)
    })
    return <primitive rotation={rotation} object={scene} position={position} />
}

export const Character = () => {
    return (
        <Canvas flat gl={{ antialias: true }} camera={{ position: [10, 4, 10], fov: 25, near: 1, far: 1000 }} >
            <color attach={"background"} args={["black"]} />
            <ambientLight intensity={2} />
            <pointLight position={[20, 20, 20]} decay={0} color={'white'} intensity={1} />
            <Char rotation={[0, 0, 0]} position={[0, -0.14, 0.25]} url={"/glbs/Character1.glb"} />
            <Char rotation={[0, Math.PI, 0]} position={[0, 0, -0.25]} url={"/glbs/Character2.glb"} />
            <gridHelper args={[100, 50]} />
            <OrbitControls />
            <Stats />
        </Canvas>
    )
}