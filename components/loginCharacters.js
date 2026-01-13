/* eslint-disable react-hooks/refs */
import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { Vector3 } from 'three'

const LoginCharacters = ({ pointer, raycasterRef, plane }) => {
    // first will have least renderOrder and last will have highest render prder everywhere as r3f does that
    const characterRefs = useRef([])
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
                    properties: { position: [0, 0.5, 0], scale: [0.08, 0.08, 0.01] },
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
    const mouseWorld = new Vector3(0, 0, 0)

    const { camera } = useThree()

    useFrame((_, dt) => {
        if (characterRefs.current.length == 0) return
        raycasterRef.current.setFromCamera(pointer, camera)
        raycasterRef.current.ray.intersectPlane(plane, mouseWorld)
        // console.log(mouseWorld)
        characterRefs.current.forEach((char, idx) => {
            const eyes = char.getObjectByName("eyes")
            const lips = char.getObjectByName("lips")
            const pupils = char.getObjectByName("pupils")

            if (eyes) {
                const eyesWorldPose = new Vector3()
                eyes.getWorldPosition(eyesWorldPose)
                const eyeDirection = new Vector3().subVectors(mouseWorld, eyesWorldPose)
                const eyeLocalDir = eyeDirection.clone()
                eyes.parent.worldToLocal(eyeLocalDir.add(eyesWorldPose))
                eyes.position.x = eyeLocalDir.x * 0.09
                eyes.position.y = eyeLocalDir.y * 0.05 + 1.5
            }

            if (lips) {
                const lipsWorldPose = new Vector3()
                lips.getWorldPosition(lipsWorldPose)
                const lipsDirection = new Vector3().subVectors(mouseWorld, lipsWorldPose)
                const lipsLocalDir = lipsDirection.clone()
                lips.parent.worldToLocal(lipsLocalDir.add(lipsWorldPose))
                lips.position.x = lipsLocalDir.x * 0.09
                lips.position.y = (lipsLocalDir.y * 0.05) + 0.5
            }

            if (pupils) {
                const pupilsWorldPose = new Vector3()
                pupils.getWorldPosition(pupilsWorldPose)
                const pupilsDirection = new Vector3().subVectors(mouseWorld, pupilsWorldPose)
                const pupilsLocalDir = pupilsDirection.clone()
                pupils.parent.worldToLocal(pupilsLocalDir.add(pupilsWorldPose))
                pupils.position.x = pupilsLocalDir.x * 0.01
                pupils.position.y = (pupilsLocalDir.y * 0.01)
            }
        })
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