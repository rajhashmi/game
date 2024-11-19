import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { KeyboardControls, Loader } from '@react-three/drei';
import { Suspense } from 'react';
 

 

ReactDOM.createRoot(document.getElementById('root')!).render(
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
     color={"#fbfbc4"}
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
    <Loader/>
  </KeyboardControls>
);
