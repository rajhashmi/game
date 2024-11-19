import { OrbitControls, Sky } from "@react-three/drei";
import "./App.css";
import Model from "./Components/Model";
import { Physics } from "@react-three/rapier";
import Player from "./Components/Player";



function App() {


  return (
    <>
      <OrbitControls />
      <Physics  >
        <Model />
        <Player/>
      </Physics>
      <Sky sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <ambientLight intensity={1} />
    </>
  );
}

export default App;
