/* eslint-disable react-hooks/refs */
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { DoubleSide, Float32BufferAttribute, Vector3 } from 'three'

const LoginCharacters = ({ pointer, raycasterRef, plane, event }) => {
    // first will have least renderOrder and last will have highest render prder everywhere as r3f does that
    const characterRefs = useRef([])
    const elapsedTimeRef = useRef({})

    const characters = useMemo(() => [
        {
            name: "purpie",
            type: "group",
            properties: { ref: (el) => characterRefs.current[0] = el },
            children: [
                {
                    name: "body",
                    type: "group",
                    children: [
                        {
                            type: "mesh",
                            properties: { scale: [2, 3.7, 1] },
                            children: [
                                {
                                    type: "geometry",
                                    value: "boxGeometry"
                                },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: 0xAF5DCF }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "eyes",
                    properties: { position: [0, 1.5, 0] },
                    interaction: {
                        hover: {
                            yPos: 1.5,
                            offset: { x: 0.09, y: 0.05 }
                        }
                    },
                    type: "group",
                    children: [
                        {
                            name: "sclera",
                            type: "group",
                            children: [
                                {
                                    name: "left",
                                    type: "mesh",
                                    properties: { position: [-0.2, 0, 0], scale: [0.06, 0.06, 0.06] },
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "white" }
                                        }
                                    ]
                                },
                                {
                                    name: "right",
                                    type: "mesh",
                                    properties: { position: [0.2, 0, 0], scale: [0.06, 0.06, 0.06] },
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "white" }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            name: "pupils",
                            type: "group",
                            interaction: {
                                hover: {
                                    yPos: 0,
                                    offset: { x: 0.01, y: 0.01 }
                                }
                            },
                            children: [
                                {
                                    type: "mesh",
                                    name: "left",
                                    properties: { position: [-0.2, 0, 0], scale: [0.02, 0.02, 0.02] },
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "black" }
                                        }
                                    ]
                                },
                                {
                                    type: "mesh",
                                    name: "right",
                                    properties: { position: [0.2, 0, 0], scale: [0.02, 0.02, 0.02] },
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "black" }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "lips",
                    type: "group",
                    interaction: {
                        hover: {
                            yPos: 1,
                            offset: { x: 0.09, y: 0.05 }
                        }
                    },
                    properties: { position: [0, 1.2, 0], scale: [0.1, 0.01, 0.01] },
                    children: [
                        {
                            type: "mesh",
                            children: [
                                {
                                    type: "geometry",
                                    value: "circleGeometry"
                                },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: "black" }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "blake",
            type: "group",
            properties: { position: [1.2, -0.6, 0], ref: (el) => characterRefs.current[1] = el },
            children: [
                {
                    name: "body",
                    type: "group",
                    children: [
                        {
                            type: "mesh",
                            properties: { scale: [0.75, 2.5, 1] },
                            children: [
                                {
                                    type: "geometry",
                                    value: "boxGeometry"
                                },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: "black" }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "eyes",
                    properties: { position: [0, 0.9, 0] },
                    type: "group",
                    interaction: {
                        hover: {
                            yPos: 1,
                            offset: { x: 0.03, y: 0.03 }
                        }
                    },
                    children: [
                        {
                            type: "group",
                            name: "sclera",
                            children: [
                                {
                                    name: "left",
                                    properties: { position: [-0.15, 0, 0], scale: [0.1, 0.1, 0.1] },
                                    type: "mesh",
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "white" }
                                        }
                                    ]
                                },
                                {
                                    name: "right",
                                    properties: { position: [0.15, 0, 0], scale: [0.1, 0.1, 0.1] },
                                    type: "mesh",
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "white" }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "group",
                            name: "pupils",
                            interaction: {
                                hover: {
                                    yPos: 0,
                                    offset: { x: 0.015, y: 0.015 }
                                }
                            },
                            children: [
                                {
                                    name: "left",
                                    properties: { position: [-0.15, 0, 0], scale: [0.04, 0.04, 0.04] },
                                    type: "mesh",
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "black" }
                                        }
                                    ]
                                },
                                {
                                    name: "right",
                                    properties: { position: [0.15, 0, 0], scale: [0.04, 0.04, 0.04] },
                                    type: "mesh",
                                    children: [
                                        {
                                            type: "geometry",
                                            value: "circleGeometry"
                                        },
                                        {
                                            type: "material",
                                            value: "meshBasicMaterial",
                                            properties: { color: "black" }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "roange",
            type: "group",
            properties: { position: [-1.2, -1.85, 0], ref: (el) => characterRefs.current[2] = el },
            children: [
                {
                    name: "body",
                    type: "group",
                    children: [
                        {
                            type: "mesh",
                            children: [
                                {
                                    type: "geometry",
                                    value: "circleGeometry",
                                    properties: { args: [1.5, 32, 0, Math.PI] }
                                },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: 0xed802d }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "eyes",
                    type: "group",
                    properties: { position: [0, 0.7, 0] },
                    interaction: {
                        hover: {
                            yPos: 1,
                            offset: { x: 0.09, y: 0.05 }
                        }
                    },
                    children: [
                        {
                            type: "mesh",
                            name: "left",
                            properties: { position: [-0.2, 0, 0], scale: [0.06, 0.06, 0.06] },
                            children: [
                                { type: "geometry", value: "circleGeometry" },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: "black" }
                                }
                            ]
                        },
                        {
                            type: "mesh",
                            name: "right",
                            properties: { position: [0.2, 0, 0], scale: [0.06, 0.06, 0.06] },
                            children: [
                                { type: "geometry", value: "circleGeometry" },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: "black" }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "lips",
                    type: "group",
                    face: {
                        happy: [
                            0,
                            -0.75,
                            0,
                            1.5,
                            0,
                            0,
                            1.4711779356002808,
                            -0.29263543913288875,
                            0,
                            1.3858193159103394,
                            -0.5740251306367756,
                            0,
                            1.2472044229507446,
                            -0.8333553549914812,
                            0,
                            1.0606601238250732,
                            -1.06066017177982,
                            0,
                            0.8333553671836853,
                            -1.247204414804174,
                            0,
                            0.5740251541137695,
                            -1.3858193061858506,
                            0,
                            0.2926354706287384,
                            -1.471177929335368,
                            0,
                            9.184850732644269e-17,
                            -1.5,
                            0,
                            -0.2926354706287384,
                            -1.471177929335368,
                            0,
                            -0.5740251541137695,
                            -1.3858193061858506,
                            0,
                            -0.8333553671836853,
                            -1.247204414804174,
                            0,
                            -1.0606601238250732,
                            -1.06066017177982,
                            0,
                            -1.2472044229507446,
                            -0.8333553549914812,
                            0,
                            -1.3858193159103394,
                            -0.5740251306367756,
                            0,
                            -1.4711779356002808,
                            -0.29263543913288875,
                            0,
                            -1.5,
                            0,
                            0,
                            -1.4711779356002808,
                            3.1495849567297896e-8,
                            0,
                            -1.3858193159103394,
                            2.347699384896984e-8,
                            0,
                            -1.2472044229507446,
                            1.2192204246197491e-8,
                            0,
                            -1.0606601238250732,
                            -4.795474695118429e-8,
                            0,
                            -0.8333553671836853,
                            8.146570529277142e-9,
                            0,
                            -0.5740251541137695,
                            9.724488880813453e-9,
                            0,
                            -0.2926354706287384,
                            6.264913032794084e-9,
                            0,
                            -2.7554553521421787e-16,
                            0,
                            0,
                            0.2926354706287384,
                            6.264913032794084e-9,
                            0,
                            0.5740251541137695,
                            9.724488880813453e-9,
                            0,
                            0.8333553671836853,
                            8.146570529277142e-9,
                            0,
                            1.0606601238250732,
                            -4.795474695118429e-8,
                            0,
                            1.2472044229507446,
                            1.2192204246197491e-8,
                            0,
                            1.3858193159103394,
                            2.347699384896984e-8,
                            0,
                            1.4711779356002808,
                            3.1495849567297896e-8,
                            0,
                            1.5,
                            0,
                            0
                        ],
                        sad: []
                    },
                    properties: { position: [0, 0.5, 0], scale: [0.08, 0.08, 0.01] },
                    interaction: {
                        hover: {
                            yPos: 0.5,
                            offset: { x: 0.09, y: 0.05 }
                        }
                    },
                    children: [
                        {
                            type: "mesh",
                            children: [
                                {
                                    type: "geometry",
                                    value: "circleGeometry",
                                    properties: { args: [1.5, 32] },
                                },
                                {
                                    type: "material",
                                    value: "meshBasicMaterial",
                                    properties: { color: "black", side: DoubleSide }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ], [])

    const drawCharacterFromJson = (obj, key) => {
        if (obj.type == "group" || obj.type == "mesh") {
            const { name, type: Type, properties, children } = obj
            return <Type key={key} {...properties} {...(name && { name: name })}>
                {children.map((child, idx) => drawCharacterFromJson(child, idx))}
            </Type>
        } else {
            const { value: Value, type, properties } = obj
            return <Value key={key} {...properties} {...(type == "material" && { depthTest: false })} />
        }
    }

    const doHaveThis = (arr, key, putInArr) => {
        arr.forEach((c) => {
            if (c[key]) putInArr.push(c)
            if (c["children"]) doHaveThis(c["children"], key, putInArr)
        })
    }

    const mouseWorld = new Vector3(0, 0, 0)

    const { camera } = useThree()

    useFrame(() => {
        if (characterRefs.current.length == 0) return
        raycasterRef.current.setFromCamera(pointer.current, camera)
        raycasterRef.current.ray.intersectPlane(plane, mouseWorld)
        characterRefs.current.forEach((char) => {
            let interactions = []
            doHaveThis(characters.find((c) => c.name == char.name).children, "interaction", interactions)
            interactions.forEach((interactObj, idx) => {
                const obj = char.getObjectByName(interactObj.name)
                if (obj) {
                    const { hover } = interactObj.interaction
                    if (hover) {
                        const objWorldPose = new Vector3()
                        obj.getWorldPosition(objWorldPose)
                        const objDirection = new Vector3().subVectors(mouseWorld, objWorldPose)
                        const objLocalDir = objDirection.clone()
                        obj.parent.worldToLocal(objLocalDir.add(objWorldPose))
                        obj.position.x = objLocalDir.x * hover.offset.x
                        obj.position.y = objLocalDir.y * hover.offset.y + hover.yPos
                    }
                }
            })
        })
    })

    useEffect(() => {
        if (characterRefs.current.length > 0) {
            characterRefs.current.map((char) => {
                let faces = []
                doHaveThis(characters.find((c) => c.name == char.name).children, "face", faces)
                faces.forEach((faceObj, idx) => {
                    const obj = char.getObjectByName(faceObj.name)
                    if (obj) {
                        const { happy } = faceObj.face
                        if (happy) {
                            const parent = obj.children[0]
                            parent.geometry.morphAttributes.position = []
                            parent.geometry.morphAttributes.position[0] = new Float32BufferAttribute(happy, 3)

                            parent.morphTargetInfluences = []
                            parent.morphTargetInfluences[0] = 0
                        }
                    }
                })
            })
        }
    }, [])

    useFrame((s, dt) => {
        const elapsedTime = s.clock.getElapsedTime()

        // Beginning O to smile for roange
        if (elapsedTime < 0.5) {
            let allFaces = []
            doHaveThis(characters.find((c) => c.name == "roange").children, "face", allFaces)
            const lips = {
                property: allFaces.find((a) => a.name == "lips"),
                ref: characterRefs.current.find((c) => c.name == "roange").getObjectByName("lips")
            }
            const parent = lips.ref.children[0]
            if (parent?.morphTargetInfluences) parent.morphTargetInfluences[0] = elapsedTime * 2
        }

        if (event == "emailInput") {
            if (!elapsedTimeRef[event]) {
                console.log("I am new here")
                elapsedTimeRef[event] = elapsedTime
            } else {
                console.log("old one")
            }
        }
    })

    return (
        <group>
            {characters.map((char, idx) => {
                return drawCharacterFromJson(char, idx)
            })}
        </group>
    )
}

export default LoginCharacters