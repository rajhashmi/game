import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Canvas 
  camera={{
    position: [0,5,-5],
  }
  }
  >
    <Perf/>
    <App />
    </Canvas>
)
