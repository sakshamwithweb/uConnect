"use client"
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='w-[40%]'>
        <Canvas>
          {/* <group name="blake">
            <group name='body'>
              <mesh scale={[0.75, 2.5, 1]}>
                <boxGeometry />
                <meshBasicMaterial color={"black"} />
              </mesh>
            </group>
            <group position={[0, 0.9, 0]} name='eyes'>
              <group renderOrder={1} name='sclera'>
                <mesh position={[-0.15, 0, 0]} scale={[0.1, 0.1, 0.1]} name='left' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"white"} />
                </mesh>
                <mesh position={[0.15, 0, 0]} scale={[0.1, 0.1, 0.1]} name='right' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"white"} />
                </mesh>
              </group>
              <group renderOrder={2} name='pupils'>
                <mesh position={[-0.15, 0, 0]} scale={[0.04, 0.04, 0.04]} name='left' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"black"} />
                </mesh>
                <mesh position={[0.15, 0, 0]} scale={[0.04, 0.04, 0.04]} name='right' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"black"} />
                </mesh>
              </group>
            </group>
          </group> */}

          {/* <group name="purpie">
            <group name='body'>
              <mesh scale={[2, 3.7, 1]}>
                <boxGeometry />
                <meshBasicMaterial color={0xAF5DCF} />
              </mesh>
            </group>
            <group position={[0, 1.5, 0]} name='eyes'>
              <group renderOrder={1} name='sclera'>
                <mesh position={[-0.2, 0, 0]} scale={[0.06, 0.06, 0.06]} name='left' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"white"} />
                </mesh>
                <mesh position={[0.2, 0, 0]} scale={[0.06, 0.06, 0.06]} name='right' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"white"} />
                </mesh>
              </group>
              <group renderOrder={2} name='pupils'>
                <mesh position={[-0.2, 0, 0]} scale={[0.02, 0.02, 0.02]} name='left' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"black"} />
                </mesh>
                <mesh position={[0.2, 0, 0]} scale={[0.02, 0.02, 0.02]} name='right' >
                  <circleGeometry />
                  <meshBasicMaterial depthTest={false} color={"black"} />
                </mesh>
              </group>
            </group>
            <group renderOrder={1} position={[0,1.2,0]} scale={[0.1,0.01,0.01]} name='lips'>
              <mesh>
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
            </group>
          </group> */}

          {/* <group name="roange">
            <group name='body'>
              <mesh>
                <circleGeometry args={[1.5, 32, 0, Math.PI]} />
                <meshBasicMaterial color={0xed802d} />
              </mesh>
            </group>
            <group position={[0, 0.7, 0]} name='eyes'>
              <mesh position={[-0.2, 0, 0]} scale={[0.06, 0.06, 0.06]} name='left' >
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
              <mesh position={[0.2, 0, 0]} scale={[0.06, 0.06, 0.06]} name='right' >
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
            </group>
            <group renderOrder={1} position={[0, 0.5, 0]} scale={[0.08, 0.08, 0.01]} name='lips'>
              <mesh>
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
            </group>
          </group> */}

          {/* // No idea how to do lol
          <group name="yullow">
            <group name='body'>
              <mesh>
                <sphereGeometry args={[0.59, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshBasicMaterial color={0xfaba25} />
              </mesh>
              <mesh position={[0, -0.75, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 1.5, 18, 4]} />
                <meshBasicMaterial color={0xfaba25} />
              </mesh>
            </group>
            <group position={[0, 0.2, 0.4]} name='eyes'>
              <mesh position={[-0.4, 0, 0]} scale={[0.03, 0.03, 0.03]} name='left' >
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
              <mesh position={[0.4, 0, 0]} scale={[0.03, 0.03, 0.03]} name='right' >
                <circleGeometry />
                <meshBasicMaterial depthTest={false} color={"black"} />
              </mesh>
            </group>
          </group> */}

          <ambientLight />
          <OrthographicCamera args={[-5, 5, 5, -5, 0.1, 100]} zoom={100} position={[0, 0, 10]} makeDefault />
        </Canvas>
      </div>
      <div className='w-[60%] border'>

      </div>
    </div>
  )
}

export default page