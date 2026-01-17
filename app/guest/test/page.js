"use client"
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { Float32BufferAttribute } from 'three'

const Test = () => {
    const meshRef = useRef()
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (!started) return

        const mesh = meshRef.current
        const geometry = mesh.geometry

        geometry.morphAttributes.position = []

        const pos = geometry.attributes.position
        const semiPositions = []

        const r = 1.5

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i)
            const y = pos.getY(i)
            const z = pos.getZ(i)
            const h = Math.sqrt(Math.max(0, r * r - x * x))
            const newY = h === 0 ? 0 : -((y + h) / (2 * h)) * h
            semiPositions.push(x, newY, z)
        }

        geometry.morphAttributes.position[0] = new Float32BufferAttribute(semiPositions, 3)
        mesh.morphTargetInfluences = []
        // mesh.morphTargetInfluences[0] = 1

    }, [started])

    return (
        <div className='w-screen h-screen'>
            <Canvas>
                <ambientLight />
                <mesh ref={(el) => {
                    meshRef.current = el
                    setStarted(true)
                }}>
                    <circleGeometry args={[1.5, 32, 0, Math.PI]} />
                    <meshBasicMaterial wireframe={true} color={"red"} />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}

export default Test