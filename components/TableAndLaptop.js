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

        const seg6 = progress.current[6]
        const seg7 = progress.current[7]
        const seg8 = progress.current[8]
        const seg9 = progress.current[9]

        if (seg6 > 0 && seg6 < 1) {
            checkAndApplyTexture(screen, "ide", ideTexture)
        } else if (seg7 > 0 && seg7 < 1) {
            checkAndApplyTexture(screen, "discord", discordTexture)
        } else if (seg8 > 0 && seg8 < 1) {
            if (seg8 < 0.5) checkAndApplyTexture(screen, "1", discordMsgTextures[0])
            else checkAndApplyTexture(screen, "2", discordMsgTextures[1])
        } else if (seg9 > 0 && seg9 < 1) {
            if (seg9 < 0.5) checkAndApplyTexture(screen, "3", discordMsgTextures[2])
            else checkAndApplyTexture(screen, "4", discordMsgTextures[3])
        }
    })
    return <primitive ref={tableAndLaptopRef} position={[0, -5, -0.3]} object={glbModel.scene} />
}

export default TableAndLaptop