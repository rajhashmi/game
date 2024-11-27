import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Perf } from "r3f-perf";
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
      <Canvas shadows camera={{ position: [-2.30, 4.70, -6.6], fov: 50,  rotation: [ -2.96,  -0.035, -3.13]}} >
        <Suspense fallback={null}>
          
          {/* <Home/> */}
          <App />
        </Suspense>
        <Perf/>
      </Canvas>
      <Loader />
    </KeyboardControls>
  </>
);
