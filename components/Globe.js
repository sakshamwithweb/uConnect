import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, OrbitControls } from '@react-three/drei'
import { Stars } from './Stars'
import { drawThreeGeo } from './threeGeoJSON'
import { useEffect, useRef, useState } from 'react'

function Earth({ countries }) {
    const globeRef = useRef()
    useFrame((state, delta) => {
        if (globeRef?.current?.rotation) globeRef.current.rotation.y += 0.003
    })
    return <mesh ref={globeRef}>
        <sphereGeometry args={[2, 18, 18]} />
        <meshStandardMaterial transparent opacity={0.9} />
        <Edges color={"gray"} lineWidth={0.5} threshold={0.1} />
        {countries && <primitive object={countries} />}
    </mesh>
}

export const Globe = () => {
    const [countries, setCountries] = useState()

    // Fetching and placing countries on globe
    useEffect(() => {
        fetch("/ne_110m_land.json").then((response) => response.json()).then((json) => {
            const countriesGeo = drawThreeGeo({
                json: json, radius: 2, materalOptions: {
                    color: 0x80FF80,
                }
            })
            setCountries(countriesGeo)
        })
    }, [])

    return <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 10], fov: 25, near: 1, far: 100 }}>
        <color attach={"background"} args={["black"]} />

        <Earth countries={countries} />

        <Stars noOfStars={3000} />
        <OrbitControls enableZoom={false} enableDamping />
    </Canvas>
}