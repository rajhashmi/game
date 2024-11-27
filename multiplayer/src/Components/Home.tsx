import React from 'react'
import { Html, Text, Float, Sky, Sparkles, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Home() {

  let time = 0;
  useFrame(({camera}, delta)=>{
    time += delta * 0.8;
    console.log()
    camera.position.y = 4.70 + Math.sin(time) * 0.03; 


  })

  return (
    <>
    <pointLight
     position={[-1, 6, -4]}
     color="#f1c232"  
     intensity={15} 
     distance={10}  
     decay={2}  
     castShadow={true}  
     shadow-mapSize-width={1024}  
     shadow-mapSize-height={1024}
    />
    <Sky 
        sunPosition={[0, 0, 0]} 
        inclination={0}         
        azimuth={0.25}           
        distance={200}           
        turbidity={10}           
        rayleigh={0.1}           
      />
    <Float floatIntensity={ 0.15 } rotationIntensity={ 0.15 }>
    <Text
  scale={[0.15, 0.15, 0.15]}
  position={[-1, 5, -4]}
  font="./bebas-neue-v9-latin-regular.woff"
  color="#a5c90f"
  anchorX="center"
  anchorY="middle"
  rotation={[0, Math.PI, 0]}
  fontSize={2}
  letterSpacing={0.05}
>
  Knockout Roll
  <meshStandardMaterial emissive="#a5c90f" emissiveIntensity={0.5} toneMapped={false} />
</Text>

    </Float>
    <Sparkles
    position={[-1, 5, -4]}
    size={1.5}
    speed={0.6}
    scale={[1.2,0.5,1]}
    count={15}
    />
    <Sparkles
    position={[4, 9,25]}
    scale={[30,10,5]}
    size={6}
    speed={0.01}
    />
    </>
  )
}

export default Home