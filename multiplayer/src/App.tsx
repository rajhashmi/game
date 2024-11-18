import { OrbitControls, Sky } from '@react-three/drei'
import {io} from 'socket.io-client'
import './App.css'
import Model from './Components/Model'

const socket = io('http://localhost:3000')

function App() {

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
