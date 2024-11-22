import { OrbitControls, Sky, Html } from "@react-three/drei";
import "./App.css";
import Model from "./Components/Model";
import { Physics } from "@react-three/rapier";
import Player from "./Components/Player";
import GameState from "../Store/Game";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function App() {
  const [GameStart, setGameStart] = useState(true);
  const isPlayerDisqualify = GameState((state) => state.isPlayerDisqualify);

  const gameRunning = useRef(true);

  const handleRestart = () => {
    console.log("hello");
    setGameStart(true);
    gameRunning.current = true;
  };

  useFrame(({camera}) => {
    if (isPlayerDisqualify && gameRunning.current) {
      console.log("delePlayer");
      gameRunning.current = false; 
      setGameStart(false);
    }
   
  });

  return (
    <>
      <Physics debug>
        <OrbitControls/>
        <Model />
        {GameStart && <Player />}
        {!GameStart && (
          <Html center style={{ ...htmlStyle }}>
            <div style={overlayStyle}>
              <button onClick={handleRestart} style={buttonStyle}>Restart</button>
            </div>
          </Html>
        )}
      </Physics>
      <Sky sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <ambientLight intensity={1} />
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
