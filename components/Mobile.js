import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import React, { useEffect } from 'react'
import { useVideoTexture } from '@react-three/drei'
import * as THREE from "three"

const Mobile = () => {
    // So in the video, we will simulate a chat like b/w the character and Ai, its not clear, what character will be asking but such thing that shows this: i. Currently Social Network is not what we think it is(people even use AI for chat and for gaining people(Like we see in X.com))
    // At first, show the hands holding mobile(it is main here) and in which play the user X ai convo video then as user scroll, zoom out and move the camera and show an animation that user keep the mobile and hand shake to another character(such that it feels people use even use AI for social networking) and say, 'So Social Media'
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

    return <primitive object={gltf.scene} />
}

export default Mobile