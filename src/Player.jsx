import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier, vec3, CapsuleCollider } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three'
import usePointerLock from "./hooks/usePointerLock";

function Player () {

    const player = useRef()
    const collider = useRef()
    const controller = useRef(null)

    const rapier = useRapier()
    const forward = useKeyboardControls( state => state.forward )
    const left = useKeyboardControls( state => state.left )
    const back = useKeyboardControls( state => state.back )
    const right = useKeyboardControls( state => state.right )

    useEffect(() => {
        const charController = rapier.world.createCharacterController(0.05)
        controller.current = charController
    })

    useFrame((state, delta) => {

        const { camera } = state

        if (player.current) {

            const FORWARD = new THREE.Vector3(0,0,1)

            const cameraDirection = FORWARD.clone().applyQuaternion(camera.quaternion)
            cameraDirection.y = 0
            
            const refObject = new THREE.Object3D();
            refObject.lookAt(cameraDirection);
            const refShift = new THREE.Quaternion().copy(refObject.quaternion);

            // const refShift = new THREE.Quaternion().setFromUnitVectors(FORWARD, cameraDirection)
            const moveDirection = new THREE.Vector3( right - left, -1, back - forward ).applyQuaternion(refShift).normalize()
            moveDirection.multiplyScalar(10 * delta)

            const position = vec3( player.current.translation() );

            controller.current.computeColliderMovement( collider.current, moveDirection )
            const correctedMovement = controller.current.computedMovement()
            position.add( vec3(correctedMovement) )

            player.current.setNextKinematicTranslation(position)
            player.current.setNextKinematicRotation(refObject.quaternion)
            camera.position.copy( position )

        }
    })

    return (
        <RigidBody type={'kinematicPosition'} colliders={false} ref={player} position={[0, 3.0, 0]}>
            <CapsuleCollider ref={collider} args={[1, 1]}>
                <mesh>
                    <capsuleGeometry />
                    <meshNormalMaterial />
                </mesh>
            </CapsuleCollider>
        </RigidBody>
    )
}
export default Player