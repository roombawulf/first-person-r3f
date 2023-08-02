import { Canvas } from "@react-three/fiber";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import TestWorld from "./TestWorld";
import Player from "./Player";
import { Suspense, useMemo } from "react";
import { Cabin } from "./Cabin";


const Controls = {
    forward: 'forward',
    left: 'left',
    back: 'back',
    right: 'right'
}

function App() {
    
    const map = useMemo(() => [
        { name: Controls.forward, keys: ['KeyW'] },
        { name: Controls.left, keys: ['KeyA'] },
        { name: Controls.back, keys: ['KeyS'] },
        { name: Controls.right, keys: ['KeyD'] }
    ])
    
    return (

        <KeyboardControls map={map}>
            <Canvas id={'three-canvas'}>

                <Suspense>
                    <Physics timeStep={'vary'} debug>

                        <TestWorld />

                        <Player />

                        <RigidBody>
                            <Cabin />
                        </RigidBody>

                    </Physics>
                </Suspense>

                <pointLight color={'red'}/>
                <ambientLight color={'orange'}/>

                <PointerLockControls />

            </Canvas>
        </KeyboardControls>
    )
}
export default App;
