import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React, { useEffect, useRef } from 'react'
import { useVideoTexture } from '@react-three/drei'
import * as THREE from "three"

const Mobile = ({ mobileRef, onReady, progress }) => {
    const gltf = useLoader(GLTFLoader, "/glbs/Mobile.glb")
    const texture = useVideoTexture("/media/input.mp4")
    const mixerRef = useRef()
    const mobileHoldActionRef = useRef()

    const seg = (idx) => progress.current[idx]
    const isBetween = (val, min, max) => val > min && val < max

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

        const mobileHoldClip = gltf.animations.find((a) => a.name == "HoldMobile")
        mixerRef.current = new THREE.AnimationMixer(gltf.scene)

        mobileHoldActionRef.current = mixerRef.current.clipAction(mobileHoldClip)
        mobileHoldActionRef.current.play()
        mobileHoldActionRef.current.paused = true
    }, [gltf, texture])

    useEffect(() => {
        if (mobileRef.current) onReady()
    }, [])

    useFrame(({ clock }) => {
        if (isBetween(seg(0), 0, 1) || isBetween(seg(1), 0, 1)) {
            // Floating effect
            const time = clock.getElapsedTime();
            if (gltf.scene) mobileRef.current.position.y = Math.sin(time) * 0.01
        } else if (isBetween(seg(3), 0, 1)) {
            // call mobile animation to simulate as the Male Character is holding mobile
            const action = mobileHoldActionRef.current
            if (!action) return
            const clip = action.getClip()
            action.time = clip.duration * seg(3)
        }
        mixerRef.current?.update(0)
    })

    return <primitive ref={mobileRef} object={gltf.scene} />
}

export default Mobile