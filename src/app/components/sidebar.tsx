'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Getting Started",
    href: "/getting-started",
  },
  {
    name: "Basics",
    href: "/basics",
    children: [
      { name: "Basic Shapes", href: "/basics/basic-shapes" },
      { name: "Lighting", href: "/basics/lights" },
      { name: "Camera", href: "/basics/camera" },
      { name: "First 3D Scene", href: "/basics/first-scene" },
    ],
  },
  {
    name: "Ball Game",
    href: "/ball-game",
    children: [
      { name: "Game Setup", href: "/ball-game/setup" },
      { name: "Player Movement", href: "/ball-game/movement" },
      { name: "Collectibles", href: "/ball-game/collectibles" },
      { name: "UI & Scoring", href: "/ball-game/ui" },
    ],
  },
  {
    name: "Full Game Loop",
    href: "/full-game",
    children: [
      { name: "Win Conditions", href: "/full-game/win-conditions" },
      { name: "Game State", href: "/full-game/game-state" },
      { name: "Levels", href: "/full-game/levels" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 h-screen overflow-y-auto">
      <Link
        href="/"
        className="text-lg font-semibold mb-4 block hover:text-blue-600 cursor-pointer"
      >
        Bevy Guide
      </Link>
      <ul className="space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
            
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block py-2 px-3 rounded ${
                  isActive
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
              
              {item.children && item.children.length > 0 && isActive && (
                <ul className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    
                    return (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          className={`block py-1 px-3 ${
                            isChildActive
                              ? "text-blue-800 dark:text-blue-100 font-medium"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}