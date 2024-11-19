import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';

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
      <Canvas shadows camera={{ position: [-7, 9, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <directionalLight
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
          />
          <Perf />
          <App />
        </Suspense>
      </Canvas>
      <Loader />
    </KeyboardControls>
  </>
);
