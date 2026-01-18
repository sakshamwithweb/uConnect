import { DoubleSide } from "three";

export const charactersData = [
    {
        name: "purpie",
        type: "group",
        properties: {},
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
        properties: { position: [1.2, -0.6, 0] },
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
        properties: { position: [-1.2, -1.85, 0] },
        children: [
            {
                name: "body",
                type: "group",
                face: {
                    emailInput: [
                        -0.75,
                        0,
                        0,
                        0,
                        0,
                        0,
                        -0.07386683527730413,
                        0.1470257043838501,
                        0,
                        -0.1491291875025534,
                        0.2926354706287384,
                        0,
                        -0.22708817645816487,
                        0.4354270100593567,
                        0,
                        -0.3088601035302663,
                        0.5740251541137695,
                        0,
                        -0.3952939772725761,
                        0.7070950865745544,
                        0,
                        -0.48690053184851717,
                        0.8333553671836853,
                        0,
                        -0.5837954273404611,
                        0.9515899419784546,
                        0,
                        -0.6856601717798216,
                        1.0606601238250732,
                        0,
                        -0.7917212206732742,
                        1.1595157384872437,
                        0,
                        -0.900749586049755,
                        1.2472044229507446,
                        0,
                        -1.0110808230283506,
                        1.3228819370269775,
                        0,
                        -1.1206542611108277,
                        1.3858193159103394,
                        0,
                        -1.227071667615742,
                        1.435410499572754,
                        0,
                        -1.3276716480365904,
                        1.4711779356002808,
                        0,
                        -1.4196182321331126,
                        1.4927771091461182,
                        0,
                        -1.5,
                        1.5,
                        0,
                        -1.5659359676231315,
                        1.4927771091461182,
                        0,
                        -1.6146842106341455,
                        1.4711779356002808,
                        0,
                        -1.6437493373215115,
                        1.435410499572754,
                        0,
                        -1.6509843512608735,
                        1.3858193159103394,
                        0,
                        -1.6346830204975111,
                        1.3228819370269775,
                        0,
                        -1.5936592435585932,
                        1.2472044229507446,
                        0,
                        -1.5273101849463462,
                        1.1595157384872437,
                        0,
                        -1.4356601717798185,
                        1.0606601238250732,
                        0,
                        -1.3193843696702874,
                        0.9515899419784546,
                        0,
                        -1.1798101781344452,
                        0.8333553671836853,
                        0,
                        -1.0188961387624829,
                        0.7070950865745544,
                        0,
                        -0.839190157743285,
                        0.5740251541137695,
                        0,
                        -0.643765862753376,
                        0.4354270100593567,
                        0,
                        -0.43614169076322407,
                        0.2926354706287384,
                        0,
                        -0.22018438529118112,
                        0.1470257043838501,
                        0,
                        0,
                        1.8369701465288538e-16,
                        0
                    ]
                },
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
]