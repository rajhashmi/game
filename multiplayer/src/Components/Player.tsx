import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import GameState from "../../Store/Game.tsx";
import { io } from "socket.io-client";
import { random_color } from "../utils/helper.tsx";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from 'three'

function Player() {
  const bodyRef = useRef(null);
  const meshRef = useRef(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const gameStart = GameState((state) => state.start);
  const insertPlayer = GameState((state) => state.insertPlayer);
  const getPlayers = GameState((state) => state.getPlayerFromServer);
  const [smoothCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10));
  const [smoothCameraTarget] = useState(()=> new THREE.Vector3());

  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      gameStart();
      const playerIdentity = {};
      const meshColor = random_color();
      if (meshRef.current) {
        meshRef.current.material.color.set(meshColor);
      }
      if (bodyRef.current) {
        insertPlayer(bodyRef.current, socket);
        playerIdentity.color = meshColor;
        const position = bodyRef.current.translation();
        playerIdentity.position = {
          x: position.x.toFixed(2), 
          y: position.y.toFixed(2),
          z: position.z.toFixed(2),
        };
        console.log(socket.id);
        
        getPlayers(socket, playerIdentity);
      }
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  useFrame((state,delta)=>{
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.01 * delta;
    if (forward) {
      impulse.z -= impulseStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
    }
    bodyRef.current.applyImpulse(impulse);


    /**
     * Camera
     * */ 
    const bodyPosition = bodyRef.current.translation();
    const cameraNewPosition = new THREE.Vector3();
    cameraNewPosition.copy(bodyPosition);
    cameraNewPosition.z += 1.5
    cameraNewPosition.y += 1.65
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;
        
    smoothCameraPosition.lerp(cameraNewPosition,5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);
  })

  return (
    <RigidBody
      ref={bodyRef}
      position={[-7, 9, 3]}
      restitution={0.2}
      friction={1}
      linearDamping={0.5} 
      angularDamping={0.5}
      type="dynamic"
      colliders="ball"
      canSleep={false}
    >
      <mesh castShadow receiveShadow ref={meshRef}> 
        <icosahedronGeometry args={[0.1, 1]}  />
        <meshStandardMaterial  />
      </mesh>
    </RigidBody>
  );
}

export default Player;
