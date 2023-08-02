import { useEffect, useMemo } from "react";
import * as THREE from "three";

function usePointerLock() {
    const pointerVector = useMemo(() => new THREE.Vector2(), []); 

    const updatePosition = (e) => {
        pointerVector.x = e.movementX;
        pointerVector.y = e.movementY;
    };

    useEffect(() => {
        const canvas = document.getElementById("three-canvas");
        
        const clickHandler = async () => {
            await canvas.requestPointerLock( { unadjustedMovement: true } );
        };

        const lockChange = () => {
            if (document.pointerLockElement === canvas) {
                document.addEventListener("mousemove", updatePosition, false);
            } else {
                document.removeEventListener("mousemove", updatePosition, false);
            }
        };
        
        if (canvas && !document.pointerLockElement) {
            canvas.addEventListener("click", clickHandler);
            document.addEventListener(
                "pointerlockchange",
                lockChange,
                false
            );

            return () => {
                canvas.removeEventListener("click", clickHandler);
                document.removeEventListener(
                    "pointerlockchange",
                    lockChange,
                    false
                );
                document.removeEventListener(
                    "mousemove",
                    updatePosition,
                    false
                );
            };
        }
    }, [pointerVector]);

    return pointerVector;
}

export default usePointerLock;
