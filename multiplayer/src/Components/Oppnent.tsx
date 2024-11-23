// @ts-nocheck
import { useEffect, useState } from "react";
import GameState from "../../Store/Game";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

function Opponent() {
    
  const gamePlayer = GameState((state) => state.playerIdentity);
  const playerInRoom = GameState((state) => state.playerInRoom);
  const isPlayerDisqualify = GameState((state) => state.isPlayerDisqualify);
  const [loadEnemies, setLoadEnemies] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [frameCounter, setFrameCounter] = useState(0);  

  useEffect(() => {
    if(!isPlayerDisqualify){
      return
    }
    const playerBall = gamePlayer.current?.material.color.getHexString().toUpperCase();

    if (gamePlayer && playerInRoom && playerInRoom.size > 1) {
      const playersArray = Array.from(playerInRoom.entries());
      setEnemies(
        playersArray.filter(
          ([key]) => key !== `#${playerBall}`
        )
      );
      setLoadEnemies(true);
    }
  }, [gamePlayer, playerInRoom]);

  useFrame(() => {
    
    
      if (gamePlayer && playerInRoom && playerInRoom.size > 1 && !isPlayerDisqualify) {
        const playersArray = Array.from(playerInRoom.entries());
    const playerBall = gamePlayer.current.material.color.getHexString().toUpperCase();

        setEnemies(
          playersArray.filter(
            ([key]) => key !== `#${playerBall}`
          )
        );
        setLoadEnemies(true);
      }

    setFrameCounter((prev) => prev + 1);
  });


  return (
    <>
      {loadEnemies &&
        enemies.map(([id, position]) => (
          <RigidBody
            key={id}
            position={[position.x, position.y, position.z]}
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            type="dynamic"
            colliders="ball"
            canSleep={false}
          >
            <mesh castShadow receiveShadow>
              <icosahedronGeometry args={[0.1, 1]} />
              <meshStandardMaterial color={id} />
            </mesh>
          </RigidBody>
        ))}
    </>
  );
}

export default Opponent;
