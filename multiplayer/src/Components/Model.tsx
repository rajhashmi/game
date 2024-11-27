import { useGLTF } from "@react-three/drei"
import { useEffect } from "react";
import {  CuboidCollider,  } from "@react-three/rapier";

function Model() {
    const {scene} = useGLTF('/game1.glb')
    useEffect(() => {
      scene.traverse((child)=>{
        if (child.name === "PLATDORM_platform-A_0") {
          
          child.receiveShadow = true; 
        }
      })
        scene.scale.set(0.05, 0.05, 0.05);      
      }, [scene]);

  return (
    <>
    <primitive object={scene}  />
    {/* <CuboidCollider args={[2.9,0.2,2.9]} position={[-7,5,2.8]}/> */}
    </>
  )
}

export default Model