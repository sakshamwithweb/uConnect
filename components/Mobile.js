import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React, { useEffect } from 'react'
import { useVideoTexture } from '@react-three/drei'
import * as THREE from "three"

const Mobile = ({ mobileRef, onReady }) => {
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
        screenMesh.material.map.flipY = false
        screenMesh.material.needsUpdate = true;
    }, [gltf, texture])

    useEffect(() => {
        if (mobileRef.current) {
            onReady()
        }
    }, [])

    useFrame(({ clock }) => {
        // Floating effect
        const time = clock.getElapsedTime();
        // if(gltf.scene){
        //     const model = gltf.scene
        //     // eslint-disable-next-line react-hooks/immutability
        //     model.position.y = Math.sin(time) * 0.05 <- fighting with gsap {https://gsap.com/community/forums/topic/44834-how-to-use-gsap-scrolltrigger-or-timeline-with-floating-threejs-models/}
        // }
    })

    return <primitive ref={mobileRef} object={gltf.scene} />
}

export default Mobile