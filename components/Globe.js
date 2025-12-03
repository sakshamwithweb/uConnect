import { Canvas, useThree } from '@react-three/fiber'
import { Edges, OrbitControls } from '@react-three/drei'
import { Stars } from './Stars'
import { drawThreeGeo } from '../lib/threeGeoJSON'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Returns a Sphere with all countries's border.
 * 
 * @param countries A Object3D, returned by components/threeGeoJSON.js
 * @returns 
 */
function Earth({ countries }) {
    const globeRef = useRef()
    const rc = useRef()
    const mouseHelper = useRef()

    const mouse = new THREE.Vector2()
    const { gl, camera } = useThree()

    const handlePointMove = (x, y) => {
        if (globeRef?.current == undefined) return;
        mouse.x = (x / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = - (y / gl.domElement.clientHeight) * 2 + 1;

        rc?.current.setFromCamera(mouse, camera)

        const intersects = rc.current.intersectObject(globeRef.current, false)

        if (intersects.length > 0) {
            const p = intersects[0].point;
            mouseHelper?.current.position.copy(p)

            const normalMatrix = new THREE.Matrix3().getNormalMatrix(globeRef?.current.matrixWorld)

            const n = intersects[0].face.normal.clone()
            n.applyNormalMatrix(normalMatrix)
            n.multiplyScalar(10)
            n.add(intersects[0].point)
            mouseHelper.current.lookAt(n)
        }
    }

    return (
        <>
            <raycaster ref={rc} />
            <mesh scale={0.04} ref={mouseHelper} visible={true}>
                <boxGeometry args={[0.1, 0.1, 5]} />
                <meshNormalMaterial />
            </mesh>
            <mesh onPointerMove={(e) => handlePointMove(e.clientX, e.clientY)} ref={globeRef}>
                <sphereGeometry args={[2, 18, 18]} />
                <meshStandardMaterial transparent opacity={0.9} />
                <Edges color={"gray"} lineWidth={0.5} threshold={0.1} />
                {countries && <primitive object={countries} />}
            </mesh>
        </>
    )
}

export const Globe = () => {
    const [countries, setCountries] = useState()
    const [newCountries, setNewCountries] = useState()

    // Fetching and placing countries on globe
    useEffect(() => {
        (async () => {
            const countriesGeoData = await (await fetch("/ne_110m_countries.geojson")).json()
            const countriesGeo = drawThreeGeo({
                json: countriesGeoData, radius: 2, materialOptions: {
                    color: 0x008000,
                    linewidth: 1,
                    fog: true
                }
            })
            setCountries(countriesGeo)
        })()
    }, [])


    return <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 10], fov: 25, near: 1, far: 100 }}>
        <color attach={"background"} args={["black"]} />

        <Earth countries={countries} />

        <Stars noOfStars={3000} />
        <OrbitControls autoRotate enableZoom={false} enableDamping />
    </Canvas>
}