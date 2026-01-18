import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { Float32BufferAttribute, Vector3 } from 'three'
import { charactersData } from './characters.data'
import CharacterRender from './CharacterRender'

const doHaveThis = (arr, key, putInArr) => {
    arr.forEach((c) => {
        if (c[key]) putInArr.push(c)
        if (c["children"]) doHaveThis(c["children"], key, putInArr)
    })
}

const LoginCharacters = ({ pointer, raycasterRef, plane, event }) => {
    const mouseWorld = new Vector3(0, 0, 0)
    const { camera } = useThree()
    const characterRefs = useRef([])
    const elapsedTimeRef = useRef({})

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const characters = useMemo(() => {
        return charactersData.map((char, idx) => {
            char.properties.ref = (el) => characterRefs.current[idx] = el
            return char
        })
    }, [])

    const allFaces = useMemo(() => {
        let all = {}
        characters.forEach((char) => {
            let al = []
            doHaveThis(char.children, "face", al)
            all[char.name] = al
        })
        return all
    }, [characters])

    const allInteractions = useMemo(() => {
        let all = {}
        characters.forEach((char) => {
            let al = []
            doHaveThis(char.children, "interaction", al)
            all[char.name] = al
        })
        return all
    }, [characters])

    // Setup Morph with 0 influende by default for later use
    useEffect(() => {
        if (characterRefs.current.length === 0) return

        characterRefs.current.map((characterRef) => {
            let allFacesOfChar = allFaces[characterRef.name]
            // objWithFaceData must have a name
            allFacesOfChar.forEach((objWithFaceData) => {
                const objWithFaceRef = characterRef.getObjectByName(objWithFaceData.name)
                const mesh = objWithFaceRef.children[0]
                mesh.geometry.morphAttributes.position = []
                if (objWithFaceRef) {
                    // Set face
                    Object.keys(objWithFaceData.face).forEach((faceName, idx) => {
                        const faceValue = objWithFaceData.face[faceName]
                        mesh.geometry.morphAttributes.position[idx] = new Float32BufferAttribute(faceValue, 3)
                    })
                    // set influence 0 by default
                    mesh.morphTargetInfluences = []
                    Object.keys(objWithFaceData.face).forEach((_, i) => mesh.morphTargetInfluences[i] = 0)
                }
            })
        })
    }, [])

    // For eye on cursor effect
    useFrame(() => {
        if (characterRefs.current.length == 0) return
        raycasterRef.current.setFromCamera(pointer.current, camera)
        raycasterRef.current.ray.intersectPlane(plane, mouseWorld)
        characterRefs.current.forEach((char) => {
            let interactions = allInteractions[char.name]
            interactions.forEach((interactObj) => {
                const obj = char.getObjectByName(interactObj.name)
                if (obj) {
                    const { hover } = interactObj.interaction
                    if (hover) {
                        const objWorldPose = new Vector3()
                        obj.getWorldPosition(objWorldPose)
                        const objDirection = new Vector3().subVectors(mouseWorld, objWorldPose)
                        const objLocalDir = objDirection.clone()
                        obj.parent.worldToLocal(objLocalDir.add(objWorldPose))
                        const x = objLocalDir.x * hover.offset.x
                        const y = objLocalDir.y * hover.offset.y + hover.yPos
                        obj.position.lerp(new Vector3(x, y, objLocalDir.z), 0.1)
                    }
                }
            })
        })
    })

    // For showing face based on event
    useFrame((s) => {
        const elapsedTime = s.clock.getElapsedTime()

        // Beginning O to smile for roange
        if (elapsedTime < 0.5) {
            const lips = {
                property: allFaces?.roange.find((a) => a.name == "lips"),
                ref: characterRefs.current.find((c) => c.name == "roange").getObjectByName("lips")
            }
            const parent = lips.ref.children[0]
            if (parent?.morphTargetInfluences) parent.morphTargetInfluences[0] = elapsedTime * 2
        }

        if (event == "emailInput") {
            if (!elapsedTimeRef[event]) {
                // console.log("I am new here")
                elapsedTimeRef[event] = elapsedTime
            } else {
                // console.log("old one")
                const interval = elapsedTime - elapsedTimeRef[event]
                if (interval < 0.2) {
                    const roangeRef = characterRefs.current.find((c) => c.name == "roange")

                    let allFaces = []
                    doHaveThis(characters.find((c) => c.name == "roange").children, "face", allFaces)
                    const body = {
                        property: allFaces.find((a) => a.name == "body"),
                        ref: roangeRef.getObjectByName("body")
                    }
                    const parent = body.ref.children[0]
                    if (parent?.morphTargetInfluences) parent.morphTargetInfluences[0] = - interval // 0 - (-0.2)

                    roangeRef.children.find((c) => c.name == "eyes").position.x += interval * 2
                }
            }
        }
    })

    return <CharacterRender characters={characters} />
}

export default LoginCharacters