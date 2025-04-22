import {useGame} from "../hooks/useGame.js";
import Balloon from "./Balloon.jsx";

const Balloons = () => {
  const balloons = useGame((state) => state.balloons)

  return balloons.map(ballon => <Balloon key={ballon.id} {...ballon} />)
}

export default Balloons
