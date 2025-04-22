import {useRef, useEffect, useState, useCallback} from "react";
import {PositionalAudio, useGLTF} from "@react-three/drei";
import {ConvexHullCollider, RigidBody} from "@react-three/rapier";
import {balloonMaterials, useGame} from "../hooks/useGame";
import {VFXEmitter} from "wawa-vfx";
import {useFrame} from "@react-three/fiber";
import {randFloat} from "three/src/math/MathUtils.js";
import {AUDIOS} from "../App.jsx";

const Balloon = ({ position, color }) => {
  const { nodes, materials} = useGLTF("models/balloon_modified.glb")

  const rb = useRef();
  const [exploded, setExploded] = useState(false)
  const onBalloonHit = useGame(state => state.onBalloonHit)

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

  useFrame(() => {
    if (rb.current && !exploded) {
      const currentPosition = rb.current.translation()

      if (currentPosition.y > 20) {
        currentPosition.y = randFloat(-20, -5)
        rb.current.setLinvel({
          x: 0,
          y: 0,
          z: 0,
        });
        rb.current.setAngvel({
          x: 0,
          y: 0,
          z: 0,
        });
        rb.current.applyTorqueImpulse(
          {
            x: Math.random() * 0.05,
            y: Math.random() * 0.05,
            z: Math.random() * 0.05,
          },
          true
        )

        rb.current.setTranslation(currentPosition, true)
      }
    }
  })

  // adding to a separate useEffect to avoid counting multiple collisions
  useEffect(() => {
    if (exploded) {
      onBalloonHit()
    }
  }, [exploded])

  // useCallback to avoid the rigid body being created every render
  const onIntersectionEnter = useCallback((e) => {
    if (e.other.rigidBodyObject.name === "axe") {
      setExploded(true)
    }
  })

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
      onIntersectionEnter={onIntersectionEnter}
    >
      {exploded && (
        <>
          <PositionalAudio
            url={AUDIOS.pop}
            autoplay={true}
            loop={false}
            distance={10}
          />
          <VFXEmitter
            emitter="sparks"
            settings={{
              loop: false,
              spawnMode: "burst",
              nbParticles: 180,
              duration: 1,
              size: [0.05, 0.3],
              startPositionMin: [-0.1, -0.1, -0.1],
              startPositionMax: [0.1, 0.1, 0.1],
              rotationSpeedMin: [-1, -1, -10],
              rotationSpeedMax: [1, 1, 10],
              directionMin: [-0.1, 0, -0.1],
              directionMax: [0.1, 0.5, 0.1],
              speed: [1, 6],
              colorStart: [color],
              particlesLifetime: [0.1, 1],
            }}
            debug={false}
          />
        </>
      )}
      <group visible={!exploded} dispose={null} scale={3}>
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
