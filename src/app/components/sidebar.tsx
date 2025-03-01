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
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 h-screen overflow-y-auto flex flex-col justify-between">
      <div>
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
      
      {/* Social links at the bottom */}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-center space-x-4">
          <a 
            href="https://nqasim.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a 
            href="http://www.linkedin.com/in/nooraqasim" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Built by Noora Qasim
        </p>
      </div>
    </div>
  );
}