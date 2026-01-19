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

const LoginCharacters = ({ pointer, raycasterRef, plane, states }) => {
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

    // Setup Morph with 0 influence by default for later use
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
    useFrame((s, delta) => {
        const elapsedTime = s.clock.getElapsedTime()
        if (characterRefs.current.length == 0) return
        raycasterRef.current.setFromCamera(pointer.current, camera)
        raycasterRef.current.ray.intersectPlane(plane, mouseWorld)
        characterRefs.current.forEach((char) => {
            let interactions = allInteractions[char.name]
            const bodyObj = char.getObjectByName("body")
            const bodyMesh = bodyObj.children[0]
            interactions.forEach((interactObj) => {
                const obj = char.getObjectByName(interactObj.name)
                if (obj) {
                    const { hover, customs } = interactObj.interaction
                    if (hover) {
                        const objWorldPose = new Vector3()
                        obj.getWorldPosition(objWorldPose)
                        const objDirection = new Vector3().subVectors(mouseWorld, objWorldPose)
                        const objLocalDir = objDirection.clone()
                        obj.parent.worldToLocal(objLocalDir.add(objWorldPose))
                        const x = objLocalDir.x * hover.offset.x
                        const y = objLocalDir.y * hover.offset.y + hover.yPos
                        obj.position.lerp(new Vector3(x, y, objLocalDir.z), 0.1)

                        if (obj.name == "eyes" && bodyMesh?.morphTargetInfluences) {
                            const normalizedX = Math.max(-1, Math.min(1, objLocalDir.x * 0.3))
                            if (normalizedX < 0) {
                                // Stretch left
                                bodyMesh.morphTargetInfluences[1] = Math.abs(normalizedX) * 0.05
                                bodyMesh.morphTargetInfluences[2] = 0
                            } else {
                                // Stretch right
                                bodyMesh.morphTargetInfluences[2] = normalizedX * 0.05
                                bodyMesh.morphTargetInfluences[1] = 0
                            }
                        }
                    }
                    if (customs) {
                        customs.forEach((custom) => {
                            const { trigger, action, interval } = custom
                            if (trigger.type == "state") {
                                const condition = states[trigger.state] == trigger.value
                                if (condition) {
                                    if (!elapsedTimeRef.current[states[trigger.state]]) {
                                        elapsedTimeRef.current[states[trigger.state]] = elapsedTime
                                    } else {
                                        const ourInterval = elapsedTime - elapsedTimeRef.current[states[trigger.state]]
                                        if (ourInterval < interval) action(obj, ourInterval / interval)
                                    }
                                }
                            }
                        })
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
            const mesh = lips.ref.children[0]
            if (mesh?.morphTargetInfluences) mesh.morphTargetInfluences[0] = elapsedTime * 2
        }
    })

    return <CharacterRender characters={characters} />
}

export default LoginCharacters