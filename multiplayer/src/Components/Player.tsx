// @ts-nocheck
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import GameState from "../../Store/Game.tsx";
import { io } from "socket.io-client";
import { random_color } from "../utils/helper.tsx";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from 'three'
import Oppnent from "./Oppnent.tsx";

function Player() {
  const bodyRef = useRef(null);
  const meshRef = useRef(null);
  const previousPosition = useRef({x: 0, y: 0, z: 0});
  const [,  getKeys] = useKeyboardControls();
  const gameStart = GameState((state) => state.start);
  const insertPlayer = GameState((state) => state.insertPlayer);
  const getPlayers = GameState((state) => state.getPlayerFromServer);
  const setPlayer = GameState((state) => state.setPlayer);
  const sendPlayerLocationtoServer = GameState((statle) => statle.sendNewPositionToServer)
  const playerServerIdlePosition = GameState((state) => state.playerIdlePosition)
  const playerDisqualify = GameState((state) => state.playerDisqualify);
  const isPlayerDisqualify = GameState((state) => state.isPlayerDisqualify);
  const [smoothCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10));
  const [smoothCameraTarget] = useState(()=> new THREE.Vector3());
  const playerOppoenent = GameState((state) => state.isOpponentReady);
  const [isOpponentReadyToLoad, setIsOpponentReadyToLoad] = useState(false);
  const socket = io("https://game-backend-tau.vercel.app");

  useEffect(() => {
    const handleUnload = (event) => {
      if (meshRef.current) {
        const color = `#${meshRef.current.material.color.getHexString().toUpperCase()}`;
        socket.emit("userDisconnect", { color });
      }
      event.preventDefault();
      event.returnValue = "";  
    };
  
    socket.on("connect", () => {
      gameStart();
      const playerIdentity = {};
      const meshColor = random_color();
      if (meshRef.current) {
        meshRef.current.material.color.set(meshColor);
      }
      if (bodyRef.current) { 
        playerIdentity.color = meshColor;
        const position = bodyRef.current.translation();
        playerIdentity.position = {
          x: position.x.toFixed(3), 
          y: position.y.toFixed(3),
          z: position.z.toFixed(3),
        };
        
        setPlayer(meshRef)
        insertPlayer([meshColor, playerIdentity.position ], socket);
        getPlayers(socket, playerIdentity);

         
      
        window.addEventListener("beforeunload", handleUnload);
      }
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(()=>{
    if(playerOppoenent){
      setIsOpponentReadyToLoad(true);
    }
  },[playerOppoenent])

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
    
    const bodyPosition = bodyRef.current.translation();  
 
    
    bodyRef.current.applyImpulse(impulse);
    /**
     * Camera
     * */ 
    
    if(bodyPosition.y < 5 && !isPlayerDisqualify ){
      const playerColor = `#${meshRef.current.material.color.getHexString().toUpperCase()}`
      playerDisqualify(socket, playerColor);  
      
    }

    /**
     * Sending data to server
     *
     * */ 

    const bodyNewPosition = {
      color: meshRef.current.material.color.getHexString().toUpperCase(),
      position: {
        x:bodyPosition.x.toFixed(3),
        y:bodyPosition.y.toFixed(3),
        z:bodyPosition.z.toFixed(3),
      }
    }

    
    sendPlayerLocationtoServer(socket, bodyNewPosition)

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
    <>
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
      {playerOppoenent &&
      <Oppnent player={meshRef}/>
      }
    </>
  );
}

export default Player;
