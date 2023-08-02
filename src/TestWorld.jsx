import { useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useMemo } from "react"
import * as THREE from 'three'

function GridPlane () {

    const gridTexture = useTexture('grid.png')
    gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping
    gridTexture.repeat.set(100, 100)

    return(
        <>
            <RigidBody>
                <mesh rotation={[ -Math.PI/2, 0, 0 ]} scale={100}>
                    <planeGeometry args={[5,5]}/>
                    <meshBasicMaterial map={gridTexture} />
                </mesh>
            </RigidBody>

            <RigidBody>
                <mesh position={[10, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'yellow'} />
                </mesh>
            </RigidBody>

            <RigidBody>
                <mesh position={[-10, 0, 0]}>
                    <boxGeometry args={[4,4,0.1]} />
                    <meshStandardMaterial color={'salmon'} />
                </mesh>
            </RigidBody>
        </>
    )

}

function TestWorld () {

    return (
        <GridPlane />
    )
}
export default TestWorld