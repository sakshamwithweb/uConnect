/* eslint-disable react-hooks/rules-of-hooks */


// lips for roange
useEffect(() => {
    if (!started) return

    const mesh = meshRef.current
    const geometry = mesh.geometry

    geometry.morphAttributes.position = []

    const pos = geometry.attributes.position
    const semiPositions = []

    const r = 1.5

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = pos.getZ(i)
        const h = Math.sqrt(Math.max(0, r * r - x * x))
        const newY = h === 0 ? 0 : -((y + h) / (2 * h)) * h
        semiPositions.push(x, newY, z)
    }

    geometry.morphAttributes.position[0] = new Float32BufferAttribute(semiPositions, 3)
    mesh.morphTargetInfluences = []
    mesh.morphTargetInfluences = [1]

}, [started])

