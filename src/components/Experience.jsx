import {
  CameraControls,
  Environment, Gltf,
  Grid,
  PerspectiveCamera, useGLTF,
} from "@react-three/drei";
import {useEffect, useRef} from "react";
import {degToRad} from "three/src/math/MathUtils.js";
import {VFXEmitter, VFXParticles} from "wawa-vfx";
import GradientSky from "./GradientSky";
import AxeController from "./AxeController.jsx";
import Target from "./Target.jsx";
import Balloons from "./Balloons.jsx";
import Walls from "./Walls.jsx";
import {useGame} from "../hooks/useGame.js";

const Experience = () => {
  const { nodes } = useGLTF('models/Axe Small Applied.glb');

  const cameraControls = useRef();
  const axeLaunched = useGame(state => state.axeLaunched);

  useEffect(() => {
    if(axeLaunched) {
      cameraControls.current.setLookAt(10, 0, 30, 10, 0, 0, true)
    }
    else {
      cameraControls.current.setLookAt(-0.1, 0, 0, 0, 0, 0, true)
    }
  }, [axeLaunched]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <GradientSky />
      <AxeController />
      <Walls />
      <Balloons />
      <group position-x={20} position-y={-1}>
        <Target />
      </group>
      <Gltf
        src="models/AncientRuins-v1.glb"
        castShadow
        receiveShadow
        scale={3}
        rotation-y={degToRad(-90)}
        position-x={10}
        position-y={-8}
      />
      <Grid
        position-y={-10}
        infiniteGrid
        sectionColor="#999"
        cellColor="#555"
        fadeStrength={5}
      />
      <directionalLight
        position={[30, 15, 30]}
        castShadow
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.005}
      >
        <PerspectiveCamera
          attach="shadow-camera"
          near={10}
          far={50}
          fov={80}
        />
      </directionalLight>

      <VFXParticles
        name="sparks"
        settings={{
          fadeAlpha: [0, 1],
          fadeSize: [0, 0],
          gravity: [0, -10, 0],
          intensity: 8,
          nbParticles: 100000,
          renderMode: "billboard",
        }}
      />

      <VFXParticles
        name="stars"
        geometry={<circleGeometry args={[0.2, 20]} />}
        settings={{
          fadeAlpha: [0.5, 0.5],
          fadeSize: [0.5, 0.5],
          intensity: 5,
          nbParticles: 4000,
          renderMode: "billboard",
        }}
      />

      <VFXEmitter
        emitter="stars"
        settings={{
          spawnMode: "time",
          loop: true,
          duration: 10,
          delay: 0,
          nbParticles: 4000,
          startPositionMin: [-20, -20, -20],
          startPositionMax: [20, 20, 20],
          startRotationMin: [0, 0, 0],
          startRotationMax: [0, 0, 0],
          particlesLifetime: [4, 10],
          speed: [0, 0.1],
          directionMin: [-1, -1, -1],
          directionMax: [1, 1, 1],
          rotationSpeedMin: [0, 0, 0],
          rotationSpeedMax: [0, 0, 0],
          colorStart: ["#fff", "#81c0f2", "#f199ca"],
          size: [0.01, 0.06],
        }}
        debug={false}
      />

      <VFXParticles
        name="axes"
        geometry={<primitive object={nodes.Axe_small.geometry} />}
        settings={{
          fadeAlpha: [0, 0],
          fadeSize: [0, 1],
          intensity: 2,
          nbParticles: 200,
          renderMode: "mesh",
        }}
      />

      <Environment preset="sunset" environmentIntensity={0.3} />
    </>
  );
};

export default Experience