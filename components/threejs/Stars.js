import { useMemo } from "react"
import { BufferAttribute } from "three"

const randomValues = () => {
    const radius = Math.random() * 25 + 25; // Between 25 and 50 (distance from center)
    const u = Math.random(); // random left/right (0-1)
    const v = Math.random(); // random up/down (0-1)
    const theta = 2 * Math.PI * u; // FUll circle * u (0-1) means in which direction to go as angle (left/right)
    const phi = Math.acos(2 * v - 1); // 2 * v - 1: gives value between -1 and 1 (for vertical axis). Acos for spreading equally (no bunch at poles as they cover less area but same angle I think)
    // didn't understand fllowing code well..------------------
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    return [x, y, z]
}


export const Stars = ({ noOfStars }) => {
    const points = useMemo(() => {
        let p = []
        for (let i = 0; i < noOfStars; i++) {
            const [x, y, z] = randomValues()
            p.push(x, y, z)
        }
        return new BufferAttribute(new Float32Array(p), 3)
    }, [noOfStars])
    return <points>
        <bufferGeometry>
            <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
            fog={false}
            size={0.2}
            threshold={0.1}
            color={0xffffff}
        />
    </points>
}