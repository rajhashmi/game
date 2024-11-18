import { OrbitControls, Sky } from '@react-three/drei'
import {io} from 'socket.io-client'
import './App.css'
import Model from './Components/Model'
import { useEffect } from 'react'

const socket = io('https://game-omega-beryl.vercel.app')

function App() {

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    return () => {
        socket.disconnect();
    };
}, []);

  return (
    <>
    <OrbitControls/>
    <Model/>
    <Sky  sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
    <ambientLight intensity={2} />
    <mesh>
      <boxGeometry/>
      <meshNormalMaterial/>
    </mesh>
    </>
  )
}

export default App
