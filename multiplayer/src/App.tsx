import { OrbitControls } from '@react-three/drei'
import {io} from 'socket.io-client'
import './App.css'
import Model from './Components/Model'

const socket = io('http://localhost:3000')

function App() {

  return (
    <>
    <OrbitControls/>
    <Model/>
    <ambientLight intensity={10} />
    <mesh>
      <boxGeometry/>
      <meshNormalMaterial/>
    </mesh>
    </>
  )
}

export default App
