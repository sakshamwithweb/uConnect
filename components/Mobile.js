import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React, { useEffect, useRef } from 'react'
import { useVideoTexture } from '@react-three/drei'
import * as THREE from "three"

const Mobile = ({ mobileRef, onReady, progress }) => {
    const gltf = useLoader(GLTFLoader, "/glbs/Mobile.glb")
    const texture = useVideoTexture("/input.mp4")
    const mixerRef = useRef()
    const mobileHoldActionRef = useRef()

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
        // Floating effect
        const seg0 = progress.current[0] // Gap
        const seg1 = progress.current[1] // AI text
        const seg3 = progress.current[3] // Social Media Text

        if ((seg0 >= 0 && seg0 < 1) || (seg1 > 0 && seg1 < 1)) { // ONly in seg 0 and seg 1 || seg0 can also be 0 as it is first segment so will always be 0 default
            const time = clock.getElapsedTime();
            if (gltf.scene) {
                const model = gltf.scene
                // eslint-disable-next-line react-hooks/immutability
                model.position.y = Math.sin(time) * 0.01 // For future: {https://gsap.com/community/forums/topic/44834-how-to-use-gsap-scrolltrigger-or-timeline-with-floating-threejs-models/}
            }
        } else if (seg3 > 0 && seg3 < 1) {
            // call mobile animation to simulate as the Male Character is holding mobile
            const action = mobileHoldActionRef.current
            if (!action) return
            const clip = action.getClip()
            action.time = clip.duration * seg3
        }
        mixerRef.current?.update(0)
    })

    return <primitive ref={mobileRef} object={gltf.scene} />
}

export default Mobile