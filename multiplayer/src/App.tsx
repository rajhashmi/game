// @ts-nocheck
import { OrbitControls, Sky, Html } from "@react-three/drei";
import "./App.css";
import Model from "./Components/Model";
import { Physics } from "@react-three/rapier";
import Player from "./Components/Player";
import GameState from "../Store/Game";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Home from "./Components/Home";

function App() {
  const [GameStart, setGameStart] = useState(true);
  const isPlayerDisqualify = GameState((state) => state.isPlayerDisqualify);
  const Restart = GameState((state) => state.reStart);

  const gameRunning = useRef(true);

  const handleRestart = () => {
    setGameStart(true);
    gameRunning.current = true;
    Restart()
  };

  useFrame(({camera}) => {
    
    if (isPlayerDisqualify && gameRunning.current) {
      gameRunning.current = false; 
      setGameStart(false);
    }
   
  });

  return (
    <>
      <Physics>
        {/* <OrbitControls/> */}
        <Model />
        <Home/>
        {/* <directionalLight
            color={'#fbfbc4'}
            intensity={1.5}
            position={[-12, 9, 5]}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.1}
            shadow-camera-far={10}
            shadow-camera-left={-3.5}
            shadow-camera-right={3}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
          /> */}
        {/* {GameStart && <Player />} */}
        {/* {!GameStart && (
          <Html center style={{ ...htmlStyle }}>
            <div style={overlayStyle}>
              <button onClick={handleRestart} style={buttonStyle}>Restart</button>
            </div>
          </Html>
        )} */}
      </Physics>
      {/* <Sky sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      <ambientLight intensity={0.5} />
    </>
  );
}

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1.5rem',
  backgroundColor: '#ff6347',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
};

const htmlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
};

export default App;
