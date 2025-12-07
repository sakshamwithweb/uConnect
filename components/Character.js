import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from "three";

const Char = ({ position, url, rotation }) => {
    let mixer = null;
    const { scene, animations } = useLoader(GLTFLoader, url)
    mixer = new THREE.AnimationMixer(scene)
    mixer.clipAction(animations[0]).play()
    useFrame((state, delta) => {
        mixer.update(delta)
    })
    return <primitive rotation={rotation} object={scene} position={position} />
}

const Camera = () => {
    const { camera } = useThree()

    // 30, 12, 30 -> 5, 2, 5
    let a = 0;
    useFrame(() => {
        if (!window) return
        // console.log(a)
        if (a < 220) {
            const factor = 0.99
            camera.position.setX(camera.position.x * factor)
            camera.position.setY(camera.position.y * factor)
            camera.position.setZ(camera.position.z * factor)
            a++
        }
    })

    return <PerspectiveCamera makeDefault position={[30, 12, 30]} fov={25} near={1} far={1000} />
}

export const Character = () => {
    return (
        <Canvas flat gl={{ antialias: true }} >
            <color attach={"background"} args={["black"]} />
            <Camera />
            <ambientLight intensity={2} />
            <pointLight position={[20, 20, 20]} decay={0} color={'white'} intensity={1} />
            <Char rotation={[0, 0, 0]} position={[0, -0.14, 0.25]} url={"/glbs/Character1.glb"} />
            <Char rotation={[0, Math.PI, 0]} position={[0, 0, -0.25]} url={"/glbs/Character2.glb"} />
            {/* <gridHelper args={[100, 50]} /> */}
            <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} enableDamping />
            {/* <Stats /> */}
        </Canvas>
    )
}