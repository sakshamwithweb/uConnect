/* eslint-disable react-hooks/refs */
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, Vector3 } from 'three'

const LoginCharacters = ({ pointer, raycasterRef, plane, event }) => {
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
                    properties: { position: [0, 0.5, 0], scale: [0.08, 0.08, 0.01] },
                    interaction: {
                        hover: {
                            yPos: 0.5,
                            offset: { x: 0.09, y: 0.05 }
                        },
                        face: {
                            happy: (obj) => obj.children[0].material.uniforms.uTheta.value = Math.PI,
                            curious: (obj) => obj.children[0].material.uniforms.uTheta.value = Math.PI * 2,
                        }
                    },
                    children: [
                        {
                            type: "mesh",
                            children: [
                                {
                                    type: "geometry",
                                    value: "circleGeometry",
                                    properties: { args: [1.5] },
                                },
                                {
                                    type: "material",
                                    value: "shaderMaterial",
                                    properties: {
                                        color: "black",
                                        uniforms: { uTheta: { value: Math.PI } }, // change this value to change circle
                                        vertexShader: `varying vec2 vUv;
                                            void main() {
                                            vUv = uv;
                                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                          }`,
                                        fragmentShader: `uniform float uTheta;
                                          varying vec2 vUv;

                                          void main() {
                                            vec2 p = vUv - 0.5;
                                            float angle = atan(p.y, p.x) + 3.1415926;

                                            if (angle > uTheta) discard;

                                            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                                          }`
                                    }
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

    useFrame((s, dt) => {
        if (characterRefs.current.length == 0) return
        raycasterRef.current.setFromCamera(pointer.current, camera)
        raycasterRef.current.ray.intersectPlane(plane, mouseWorld)
        characterRefs.current.forEach((char) => {
            let interactions = []
            doHaveThis(characters.find((c) => c.name == char.name).children, "interaction", interactions)
            interactions.forEach((interactObj, idx) => {
                const obj = char.getObjectByName(interactObj.name)
                if (obj) {
                    const { hover, face } = interactObj.interaction
                    if (hover) {
                        const objWorldPose = new Vector3()
                        obj.getWorldPosition(objWorldPose)
                        const objDirection = new Vector3().subVectors(mouseWorld, objWorldPose)
                        const objLocalDir = objDirection.clone()
                        obj.parent.worldToLocal(objLocalDir.add(objWorldPose))
                        obj.position.x = objLocalDir.x * hover.offset.x
                        obj.position.y = objLocalDir.y * hover.offset.y + hover.yPos
                    }
                    if (face) {
                        // obj.children[0].material.uniforms.uTheta.value = Math.PI * (2 - n)
                        if (face.happy) {
                            const t = s.clock.getElapsedTime()
                            if (t < 0.5) {
                                obj.children[0].material.uniforms.uTheta.value = Math.PI * (2 - (t*2))
                            }
                        }
                    }
                }
            })
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