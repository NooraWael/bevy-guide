import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image 
          className="dark:invert"
          src="/FbrnRO.png"
          alt="Bevy Engine Logo" 
          width={180} 
          height={38} 
          priority
        />
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Step by Step Guide to Bevy
        </h1>
        <p className="text-xl text-center sm:text-left max-w-2xl">
          Learn to build a 3D ball collection game from scratch with the Bevy game engine
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
          <a href="/getting-started" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 bg-white/5 hover:bg-white/10 dark:border-gray-800 transition-all hover:scale-105">
            <h2 className="text-xl font-bold mb-2">Getting Started →</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Setup Bevy and create your first 3D scene
            </p>
          </a>
          <a href="/basic-shapes" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 bg-white/5 hover:bg-white/10 dark:border-gray-800 transition-all hover:scale-105">
            <h2 className="text-xl font-bold mb-2">Basic Shapes →</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Add planes, spheres and cubes to your game
            </p>
          </a>
          <a href="/ball-movement" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 bg-white/5 hover:bg-white/10 dark:border-gray-800 transition-all hover:scale-105">
            <h2 className="text-xl font-bold mb-2">Ball Movement →</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Make the ball move with keyboard controls
            </p>
          </a>
          <a href="/complete-game" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 bg-white/5 hover:bg-white/10 dark:border-gray-800 transition-all hover:scale-105">
            <h2 className="text-xl font-bold mb-2">Complete Game →</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Add scoring, collectible points and a mini-map
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}