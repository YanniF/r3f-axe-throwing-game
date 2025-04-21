import {useGame} from "../hooks/useGame.js";

const UI = () => {
  const startGame = useGame(state => state.startGame)

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="absolute top-4 left-4 md:top-8 md:left-14 opacity-0 animate-fade-in-down animation-delay-200 pointer-events-auto">
        <a href="https://yannifraga.com" target="_blank" className="flex items-center gap-1">
          <span className="text-4xl">🪓</span>
          <h1 className="text-2xl text-white/80">YANNI</h1>
          <span className="text-4xl rotate-y-180">🪓</span>
        </a>
      </div>
      <div
        className={`p-4 flex flex-col items-center gap-2 md:gap-4 mt-[50vh] animate-fade-in-up opacity-0 animation-delay-1000`}
      >
        <h1 className="bold text-white/80 text-4xl md:text-5xl font-extrabold text-center">
          🪓 Training Center
        </h1>
        <p className="text-white/70 text-sm">
          Become an axe master and break the curse of the temple by exploding
          balloons. 🎈 <br />
        </p>
        <button onClick={startGame} className="bg-white/80 text-black font-bold px-4 py-2 rounded-lg shadow-md hover:bg-white/100 transition duration-200 pointer-events-auto cursor-pointer">
          Start Game
        </button>
      </div>
    </section>
  );
};

export default UI;