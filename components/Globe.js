import { Canvas, useThree } from '@react-three/fiber'
import { Edges, OrbitControls } from '@react-three/drei'
import { Stars } from './Stars'
import { drawThreeGeo, convertToGeoJsonCoords, createGeometryArray } from '../lib/threeGeoJSON'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { raycasting } from '@/lib/RayCasting'




/**
 * Returns a Sphere with all countries's border.
 * 
 * @param countries A Object3D, returned by components/threeGeoJSON.js
 * @returns 
 */
function Earth({ countries, sphereRadius, countriesData }) {
    const globeRef = useRef()
    const rc = useRef()
    const mouseHelper = useRef()

    const mouse = new THREE.Vector2()
    const { gl, camera } = useThree()

    const isRayCasting = (geoJsonCoords, geometryArr) => {
        /** Polygon (one segment): Simple one closed polygon country
         * Polygon (1+ segments): One closed polygon country but has holes
         * MultiPolygon: 1+ non attached borders
        */
        let result;

        for (let i = 0; i < geometryArr.length; i++) {
            const country = geometryArr[i]
            let raycast;
            if (country.type == "Polygon") {
                raycast = raycasting(geoJsonCoords, country.coordinates, country.type)
            } else if (country.type == "MultiPolygon") {
                raycast = raycasting(geoJsonCoords, country.coordinates, country.type)
            } else {
                raycast = false
            }

            if (raycast) {
                result = {
                    isRayCasting: true,
                    name: countriesData?.features[i].properties.NAME,
                    geoJsonCoords: geoJsonCoords,
                    country_coords: country.coordinates
                }
                break
            }
        }
        return result
    }

    const handlePointMove = (x, y) => { // temp as onPointMove was too fast and automatic
        if (globeRef?.current == undefined) return;
        mouse.x = (x / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = - (y / gl.domElement.clientHeight) * 2 + 1;

        rc?.current.setFromCamera(mouse, camera)

        const intersects = rc.current.intersectObject(globeRef.current, false)

        if (intersects.length > 0) {
            const p = intersects[0].point; // sphere coords
            mouseHelper?.current.position.copy(p)

            // --Instead of rotating whole, what if I change value--
            // p.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI);
            // p.applyAxisAngle(new THREE.Vector3(0, 0, 1), -3.2);
            // p.applyAxisAngle(new THREE.Vector3(1, 0, 0), -1.58);

            const geoJsonCoords = convertToGeoJsonCoords(p)

            const geometryArr = createGeometryArray(countriesData)

            const israycasting = isRayCasting(geoJsonCoords, geometryArr)
            if(israycasting) console.log(israycasting?.name)

            const normalMatrix = new THREE.Matrix3().getNormalMatrix(globeRef?.current.matrixWorld)

            const n = intersects[0].face.normal.clone()
            n.applyNormalMatrix(normalMatrix)
            n.multiplyScalar(10)
            n.add(intersects[0].point)
            mouseHelper.current.lookAt(n)
        }
    }



    // So currenly we have a raycaster, we can check at what country, we are currently in and do that effect. For that effect, we need particles which currently we don't have, what if we spawn the particles below the country we are hovering to then do that effect and as we move the cursor away, just get those particles below again then delete.

    /* Milestones:
        - [ ] Identify current country or Ocean
            - [x] Get coordinates of raycaster (Vector3)
            - [x] Convert it into geojson coordinates
            - [x] Get country details and its coordinates
            - [ ] Convert country's coordinates back to globe coords
        - Highlight the color of that country
        - Add particles on hover and delete on moving away
    */


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
    const sphereRadius = 2;

    const [countries, setCountries] = useState()
    const [countriesData, setCountriesData] = useState()

    // Fetching and placing countries on globe
    useEffect(() => {
        (async () => {
            const countriesGeoData = await (await fetch("/ne_110m_countries.geojson")).json()
            const countriesGeo = drawThreeGeo(
                countriesGeoData, sphereRadius, {
                color: 0x008000,
                linewidth: 1,
                fog: true
            }
            )
            setCountries(countriesGeo)
            setCountriesData(countriesGeoData)
        })()
    }, [])


    return <Canvas gl={{ antialias: true }} camera={{ position: [0, 1, 10], fov: 25, near: 1, far: 100 }}>
        <color attach={"background"} args={["black"]} />

        <Earth countries={countries} countriesData={countriesData} sphereRadius={sphereRadius} />

        <Stars noOfStars={3000} />
        <OrbitControls enableDamping />
    </Canvas>
}