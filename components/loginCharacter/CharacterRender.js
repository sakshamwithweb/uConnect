import React from 'react'

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

const CharacterRender = ({ characters }) => {
    return (
        <group>
            {characters.map((char, idx) => {
                return drawCharacterFromJson(char, idx)
            })}
        </group>
    )
}

export default CharacterRender