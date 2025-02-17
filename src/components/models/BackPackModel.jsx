import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Backpack({ materialType, metalColor, bodyColor }) {
  const { nodes } = useGLTF("/models/backpack-transformed.glb");

  const textures = useTexture({
    map: `/textures/${materialType}_baseColor.jpg`,
    normalMap: `/textures/${materialType}_normal.jpg`,
    roughnessMap: `/textures/${materialType}_occlusionRoughnessMetallic.jpg`,
  });

  return (
    <group dispose={null} scale={0.005} position={[0, -1, 0]}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh.geometry}>
        <meshStandardMaterial
          map={textures.map}
          normalMap={textures.normalMap}
          roughnessMap={textures.roughnessMap}
          color={bodyColor}
        />
      </mesh>

      <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry}>
        <meshStandardMaterial color={metalColor} metalness={1} roughness={0.4} />
      </mesh>

      <mesh castShadow receiveShadow geometry={nodes.Mesh_2.geometry}>
        <meshStandardMaterial
          map={textures.map}
          normalMap={textures.normalMap}
          roughnessMap={textures.roughnessMap}
          color={bodyColor}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/backpack-transformed.glb");
