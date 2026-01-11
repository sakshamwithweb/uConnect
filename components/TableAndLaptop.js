import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React from 'react'
import { FrontSide } from 'three'
import { MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const TableAndLaptop = ({ tableAndLaptopRef, progress }) => {
    const glbModel = useLoader(GLTFLoader, '/glbs/Table_everything.glb')
    const ideTexture = useTexture("/media/ide.png", (t) => t.name = "ide")
    const discordTexture = useTexture("/media/discord.png", (t) => t.name == "discord")
    const discordMsgTextures = useTexture(["/media/discord_msg/1.png", "/media/discord_msg/2.png", "/media/discord_msg/3.png", "/media/discord_msg/4.png"], (t) => t.map((v, i) => v.name = `${i + 1}`))

    const seg = (idx) => progress.current[idx]
    const isBetween = (val, min, max) => val > min && val < max

    const checkAndApplyTexture = (screen, name, newTexture) => {
        if (screen.material?.map?.name != name) {
            screen.material = new MeshStandardMaterial({
                map: newTexture,
                side: FrontSide
            })
            screen.material.needsUpdate = true;
        }
    }

    useFrame(() => {
        const screen = glbModel.scene.getObjectByName("Screen")
        if (!screen) return

        if (isBetween(seg(6), 0, 1)) {
            checkAndApplyTexture(screen, "ide", ideTexture)
        } else if (isBetween(seg(7), 0, 1)) {
            checkAndApplyTexture(screen, "discord", discordTexture)
        } else if (isBetween(seg(8), 0, 1)) {
            if (isBetween(seg(8), 0, 0.5)) checkAndApplyTexture(screen, "1", discordMsgTextures[0])
            else checkAndApplyTexture(screen, "2", discordMsgTextures[1])
        } else if (isBetween(seg(9), 0, 1)) {
            if (isBetween(seg(9), 0, 0.5)) checkAndApplyTexture(screen, "3", discordMsgTextures[2])
            else checkAndApplyTexture(screen, "4", discordMsgTextures[3])
        }
    })
    return <primitive ref={tableAndLaptopRef} position={[0, -5, -0.3]} object={glbModel.scene} />
}

export default TableAndLaptop