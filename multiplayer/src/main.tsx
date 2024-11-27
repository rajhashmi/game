import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader, OrbitControls } from '@react-three/drei';
import { Perf } from "r3f-perf";
import { Suspense, useRef, useState } from 'react';
import Home from './Components/Home.tsx';

function AudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/beach.mp3" loop />

      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
        <button
          style={{
            padding: '10px 20px',
            background: isPlaying ? 'red' : 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={toggleAudio}
        >
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AudioController />
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas shadows camera={{ position: [-2.30, 4.70, -6.6], fov: 50,  rotation: [ -2.96,  -0.035, -3.13]}} >
        <Suspense fallback={null}>
          {/* <OrbitControls/> */}
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
          {/* <Home/> */}
          <App />
        </Suspense>
        <Perf/>
      </Canvas>
      <Loader />
    </KeyboardControls>
  </>
);

// x
// : 
// -2.2342183142960628
// y
// : 
// 4.654858322338956
// z
// : 
// -6.370732648038911


// x: -2.3099970405700927, y: 4.305415643538112, z: -5.670904738195977} _Euler {isEuler: true, _x: -2.968230085784684, _y: -0.03524633692810774, _z: -3.1354216542559756,