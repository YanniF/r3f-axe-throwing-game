import {useRef, useEffect, useState} from "react";
import {useGLTF} from "@react-three/drei";
import {ConvexHullCollider, RigidBody} from "@react-three/rapier";
import { balloonMaterials } from "../hooks/useGame";

const Balloon = ({ position, color }) => {
  const { nodes, materials} = useGLTF("models/balloon_modified.glb")

  const rb = useRef();
  const [exploded, setExploded] = useState(false)

  useEffect(() => {
    if (rb.current) {
      rb.current.applyTorqueImpulse(
        {
          x: Math.random() * .05,
          y: Math.random() * .05,
          z: Math.random() * .05,
        },
        true
      );
    }
  }, []);

  return (
    <RigidBody
      ref={rb}
      type="dynamic"
      position={position}
      gravityScale={-0.1}
      mass={0.1}
      linearDamping={.2}
      angularDamping={.2}
      restitution={1}
      onIntersectionEnter={() => {}}
    >
      <group dispose={null} visible={!exploded} scale={3}>
        <ConvexHullCollider
          args={[nodes.Balloon.geometry.attributes.position.array]}
        />
        <mesh
          geometry={nodes.Balloon.geometry}
          material={balloonMaterials[color]}
        />
        <mesh geometry={nodes.Logo.geometry} material={materials.Logo} />
        <mesh
          geometry={nodes.String.geometry}
          material={balloonMaterials[color]}
        />
      </group>
    </RigidBody>
  )
}

export default Balloon
