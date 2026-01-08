import React, { useEffect } from 'react'


const Test = ({ pos }) => {
    return <mesh scale={0.05} position={pos}>
        <boxGeometry />
        <meshBasicMaterial color={"blue"} />
    </mesh>
}

export default Test