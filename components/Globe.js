import { Canvas, useThree } from '@react-three/fiber'
import { Edges, OrbitControls } from '@react-three/drei'
import { Stars } from './Stars'
import { drawThreeGeo, convertToGeoJsonCoords, convertToSphereCoords, drawLine, createGeometryArray, createCoordinateArray } from '../lib/threeGeoJSON'
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
    // const [testCountry, setTestCountry] = useState()

    const mouse = new THREE.Vector2()
    const { gl, camera } = useThree()

    // useEffect(() => {
    //     if (!countriesData) return
    //     // We did exactly what we did there but it is correct and those weren't why??
    //     const coordArr = countriesData.features[0].geometry.coordinates[0]
    //     const coords = { x: [], y: [], z: [] }
    //     for (let point_num = 0; point_num < coordArr.length; point_num++) {
    //         const [x, y, z] = convertToSphereCoords(coordArr[point_num], sphereRadius)
    //         coords.x.push(x)
    //         coords.y.push(y)
    //         coords.z.push(z)
    //     }
    //     const line = drawLine(coords.x, coords.y, coords.z, { color: 0x008000, linewidth: 1, fog: true })
    //     setTestCountry(line)

    // }, [countriesData])

    let a = {}

    // useEffect(() => {
    //     if (!countriesData) return
    //     const container = new THREE.Object3D();
    //     const jsonGeom = createGeometryArray(countriesData)
    //     console.log(jsonGeom)
    //     let coordinatesArray = []
    //     for (let i = 0; i < jsonGeom.length; i++) {
    //         if (jsonGeom[i].type == "Polygon") {
    //             for (let segmentNo = 0; segmentNo < jsonGeom[i].coordinates.length; segmentNo++) {
    //                 coordinatesArray = createCoordinateArray(jsonGeom[i].coordinates[segmentNo])
    //                 const coords = { x: [], y: [], z: [] }
    //                 for (let pointNum = 0; pointNum < coordinatesArray.length; pointNum++) {
    //                     const [x, y, z] = convertToSphereCoords(coordinatesArray[pointNum], sphereRadius)
    //                     coords.x.push(x)
    //                     coords.y.push(y)
    //                     coords.z.push(z)
    //                 }
    //                 const line = drawLine(coords.x, coords.y, coords.z, { color: 0x008000, linewidth: 1, fog: true })
    //                 container.add(line)
    //             }
    //         } else if (jsonGeom[i].type == "MultiPolygon") {
    //             console.log("Multipolygon")
    //         }
    //     }
    //     // container.rotation.x = -Math.PI * 0.5; // Fix orientation

    //     setTestCountry(container)
    //     // globeRef.current.rotateZ(-Math.PI * 0.5)
    //     // We did exactly what we did there but it is correct and those weren't why??
    //     // const coordArr = countriesData.features[0].geometry.coordinates[0]
    //     // const coords = { x: [], y: [], z: [] }
    //     // for (let point_num = 0; point_num < coordArr.length; point_num++) {
    //     //     const [x, y, z] = convertToSphereCoords(coordArr[point_num], sphereRadius)
    //     //     coords.x.push(x)
    //     //     coords.y.push(y)
    //     //     coords.z.push(z)
    //     // }
    //     // const line = drawLine(coords.x, coords.y, coords.z, { color: 0x008000, linewidth: 1, fog: true })
    //     // setTestCountry(line)

    // }, [countriesData])

    const isRayCasting = (geoJsonCoords, geometryArr) => {
        /** Polygon (one segment): Simple one closed polygon country
         * Polygon (1+ segments): One closed polygon country but has holes
         * MultiPolygon: 1+ non attached borders
        */

        geometryArr.forEach((country, index) => { //  Each country
            if (country.type == "Polygon") {
                const raycast = raycasting(geoJsonCoords, country.coordinates, "Polygon")
                if (raycast) {
                    const obj = {
                        name: countriesData?.features[index].properties.NAME,
                        geoJsonCoords: geoJsonCoords,
                        country_coords: country.coordinates
                    }
                    console.log(obj)
                }
            } else if (country.type == "MultiPolygon") {
                const raycast = raycasting(geoJsonCoords, country.coordinates, "MultiPolygon")
                if (raycast) {
                    const obj = {
                        name: countriesData?.features[index].properties.NAME,
                        geoJsonCoords: geoJsonCoords,
                        country_coords: country.coordinates
                    }
                    console.log(obj)
                }
            } else {
                console.log("Falseeeeee")
            }
        })
    }

    // const handlePointMove = (x, y) => {
    //     if (globeRef?.current == undefined) return;
    //     mouse.x = (x / gl.domElement.clientWidth) * 2 - 1;
    //     mouse.y = - (y / gl.domElement.clientHeight) * 2 + 1;

    //     rc?.current.setFromCamera(mouse, camera)

    //     const intersects = rc.current.intersectObject(globeRef.current, false)

    //     if (intersects.length > 0) {
    //         const p = intersects[0].point; // coords
    //         mouseHelper?.current.position.copy(p)

    //         const geoJsonCoords = threeGeoToGeoJson(p, sphereRadius)
    //         const geometryArr = createGeometryArray(countriesData)

    //         isRayCasting(geoJsonCoords, geometryArr)

    //         const normalMatrix = new THREE.Matrix3().getNormalMatrix(globeRef?.current.matrixWorld)

    //         const n = intersects[0].face.normal.clone()
    //         n.applyNormalMatrix(normalMatrix)
    //         n.multiplyScalar(10)
    //         n.add(intersects[0].point)
    //         mouseHelper.current.lookAt(n)
    //     }
    // }

    const handlePointMove = (x, y) => { return null }

    // console.log(convertToSphereCoords([80, 7], 2))

    const handleDoubleClick = (x, y) => { // temp as onPointMove was too fast and automatic
        if (globeRef?.current == undefined) return;
        mouse.x = (x / gl.domElement.clientWidth) * 2 - 1;
        mouse.y = - (y / gl.domElement.clientHeight) * 2 + 1;

        rc?.current.setFromCamera(mouse, camera)



        const intersects = rc.current.intersectObject(globeRef.current, false)

        if (intersects.length > 0) {
            const p = intersects[0].point; // sphere coords
            mouseHelper?.current.position.copy(p)

            // Instead of rotating whole, what if I change value
            // p.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI);
            // p.applyAxisAngle(new THREE.Vector3(0, 0, 1), -3.2);
            // p.applyAxisAngle(new THREE.Vector3(1, 0, 0), -1.58);

            ///////////// Here either make the rotation value precise or find a better way to sync in, no AI

            const geoJsonCoords = convertToGeoJsonCoords(p) // <- It is wrong at all.. Think about it, we are getting p from the globe not from the threeGeo map. can be its direction is something else??
            // Ok at line nos: 186,187 and 188 we did little rotation to match 2 countries coordinates with their actual map in globe and now when selecting any country downside, it is finding it correctly, not perfect as rotations aren't perfect but it is clear, we need to rotate it in correct direction correctly..

            // const polygon = countriesData?.features[0]
            // console.log({
            //     geoJsonCoords: geoJsonCoords,
            //     isInside: raycasting(geoJsonCoords, polygon.geometry.coordinates),
            //     polygon: polygon,
            //     point: p
            // })

            const geometryArr = createGeometryArray(countriesData)

            isRayCasting(geoJsonCoords, geometryArr)

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
            - [ ] Get country details and its coordinates
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
            <mesh onDoubleClick={(e) => { handleDoubleClick(e.clientX, e.clientY) }} onPointerMove={(e) => handlePointMove(e.clientX, e.clientY)} ref={globeRef}>
                <sphereGeometry args={[2, 18, 18]} />
                <meshStandardMaterial transparent opacity={0.9} />
                <Edges color={"gray"} lineWidth={0.5} threshold={0.1} />
                {/* {testCountry && <primitive object={testCountry} />} */}
                {countries && <primitive object={countries} />}
            </mesh>
            {/*For matching real country coords(got from geoJSon) with globe country*/}
            {/* <mesh position={convertToSphereCoords([67, 34], 2)}> Afghanistan
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color={"red"} />
            </mesh> */}
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
            // Gotcha
            // countriesGeo.rotateY(-Math.PI) // left right from y 
            // countriesGeo.rotateZ(-3.2) // left-right from front
            // countriesGeo.rotateX(-1.58) // front/back
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