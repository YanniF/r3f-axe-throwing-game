import {
  CameraControls,
  Environment,
  Grid,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef } from "react";
import {VFXParticles} from "wawa-vfx";
import GradientSky from "./GradientSky";
import AxeController from "./AxeController.jsx";
import Target from "./Target.jsx";
import Balloons from "./Balloons.jsx";

const Experience = () => {
  const controls = useRef();

  return (
    <>
      <CameraControls ref={controls} />
      <GradientSky />
      <AxeController />
      <Balloons />
      <group position-x={20} position-y={-1}>
        <Target />
      </group>
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
      <Environment preset="sunset" environmentIntensity={0.3} />
    </>
  );
};

export default Experience