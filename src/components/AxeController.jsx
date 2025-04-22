import {Gltf} from "@react-three/drei";
import {quat, RigidBody} from "@react-three/rapier";
import {useGame} from "../hooks/useGame.js";
import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {VFXEmitter} from "wawa-vfx";

const AxeController = () => {
  const rigidBody = useRef()

  const [impact, setImpact] = useState(undefined)

  const axeLaunched = useGame((state) => state.axeLaunched)
  const launchAxe = useGame((state) => state.launchAxe)
  const onTargetHit = useGame((state) => state.onTargetHit)

  useEffect(() => {
    const onPointerUp = () => launchAxe()

    window.addEventListener("pointerup", onPointerUp)

    return () => window.removeEventListener("pointerup", onPointerUp)
  }, [])

  useEffect(() => {
    if (axeLaunched) {
      rigidBody.current.setBodyType(0) // 0 = dynamic
      rigidBody.current.applyImpulse({x: 1, y: .5, z: 0}, true)
      rigidBody.current.applyTorqueImpulse({x: 0, y: 0, z: -.2}, true)
    }
    else {
      setImpact(false)
    }
  }, [axeLaunched])

  useEffect(() => {
    if(impact) {
      onTargetHit()
    }
  }, [impact])

  useFrame(({pointer}) => {
    if (rigidBody.current && !axeLaunched) {
      // remove rotation
      rigidBody.current.setRotation(quat(0, 0, 0, 1), true)
      rigidBody.current.setLinvel({x: 0, y: 0, z: 0})
      rigidBody.current.setAngvel({x: 0, y: 0, z: 0})

      // follow mouse
      rigidBody.current.setTranslation({
        x: 1,
        y: -0.2 + pointer.y * .5,
        z: pointer.x * .5,
      })
    }
  })

  const collisionEnterHandler = (e) => {
    if (e.other.rigidBodyObject.name === "target") {
      rigidBody.current.setBodyType(2) // 2 = kinematicPosition
      rigidBody.current.setLinvel({x: 0, y: 0, z: 0})
      rigidBody.current.setAngvel({x: 0, y: 0, z: 0})

      setImpact(rigidBody.current.translation())
    }
  }

  return (
    <>
      {impact && (
        <group position={[impact.x, impact.y, impact.z]}>
          <VFXEmitter
            emitter="sparks"
            settings={{
              spawnMode: 'burst',
              duration: 4,
              delay: 0,
              nbParticles: 2000,
              loop: false,
              startPositionMin: [0, -1, 0],
              startPositionMax: [0, -1, 0],
              startRotationMin: [0, 0, 0],
              startRotationMax: [0, 0, 0],
              particlesLifetime: [0.1, 1],
              speed: [5, 20],
              directionMin: [-1, -1, -1],
              directionMax: [1, 1, 1],
              rotationSpeedMin: [0, 0, 0],
              rotationSpeedMax: [0, 0, 0],
              colorStart: ['#d339a1', '#b493d9', '#446ecc'],
              colorEnd: ['#d339a1', '#b493d9', '#446ecc'],
              size: [0.01, 1]
            }}
            debug={false}
          />
        </group>
      )}
      <RigidBody
        ref={rigidBody}
        name="axe"
        colliders="hull"
        type="kinematicPosition"
        sensor={true}
        onIntersectionEnter={e => collisionEnterHandler(e)}
      >
        <Gltf src="models/Axe Small.glb" position-y={-.3}/>

        {axeLaunched && !impact && (
          <group>
            <VFXEmitter
              position-y={-0.3}
              emitter="axes"
              settings={{
                spawnMode: "time",
                loop: true,
                nbParticles: 50,
                particlesLifetime: [1, 1],
                duration: 0.5,
                size: [1, 1],
                startPositionMin: [0, 0, 0],
                startPositionMax: [0, 0, 0],
                directionMin: [0, 0, 0],
                directionMax: [0, 0, 0],
                startRotationMin: [0, 0, 0],
                startRotationMax: [0, 0, 0],
                speed: [0.1, 2],
                colorStart: ["#37374c"],
              }}
              debug={false}
            />
          </group>
        )}
      </RigidBody>
    </>
  )
}

export default AxeController
