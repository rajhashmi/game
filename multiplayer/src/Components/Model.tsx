import { useGLTF } from "@react-three/drei"
import { useEffect } from "react";

function Model() {
    const {scene} = useGLTF('/the_orange_platform_-_island.glb')
    useEffect(() => {
        scene.scale.set(0.05, 0.05, 0.05);
      }, [scene]);

  return (
    <primitive object={scene}  />
  )
}

export default Model