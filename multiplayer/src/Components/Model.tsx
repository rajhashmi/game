import { useGLTF } from "@react-three/drei"
import { useEffect } from "react";

function Model() {
    const {scene} = useGLTF('/game.glb')
    useEffect(() => {
      scene.traverse((child)=>{
        console.log(child)
      })
        scene.scale.set(0.05, 0.05, 0.05);
      }, [scene]);

  return (
    <primitive object={scene}  />
  )
}

export default Model