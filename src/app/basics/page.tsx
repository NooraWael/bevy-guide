'use client';

import React from 'react';
import Link from 'next/link';

export default function BasicsHome() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/getting-started" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Getting Started
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Bevy Basics</h1>
      
      <p className="mb-6">
        Welcome to the Basics section of our Bevy guide! Here we&apos;ll cover the fundamental building blocks you need to start creating games with Bevy.
      </p>

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 dark:bg-blue-900 dark:text-blue-200">
        <p className="font-bold">In this section:</p>
        <p>
          We&apos;ll explore the essential components needed to build a 3D scene in Bevy and create our very first playable example.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">Basic Shapes</h2>
          <p className="mb-4">Learn about the core 3D shapes in Bevy and how to use them to create objects in your game world.</p>
          <Link href="/basics/basic-shapes" className="text-blue-500 hover:underline">
            Explore shapes →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">Lighting</h2>
          <p className="mb-4">Discover how to illuminate your 3D scenes with different types of lights to create atmosphere and depth.</p>
          <Link href="/basics/lights" className="text-blue-500 hover:underline">
            Master lighting →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">Camera</h2>
          <p className="mb-4">Set up the perfect view of your game world with Bevy&apos;s camera system and learn common camera techniques.</p>
          <Link href="/basics/camera" className="text-blue-500 hover:underline">
            Understand cameras →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow bg-green-50 dark:bg-green-900">
          <h2 className="text-xl font-bold mb-2">First 3D Scene</h2>
          <p className="mb-4">Put it all together to build your first complete 3D scene with shapes, lights, and a camera!</p>
          <Link href="/basics/first-scene" className="text-blue-500 hover:underline">
            Build your scene →
          </Link>
        </div>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 dark:bg-yellow-900 dark:text-yellow-200">
        <p className="font-bold">Learning Path:</p>
        <p>
          We recommend working through these topics in order. Each builds on the previous concepts to give you a solid foundation in Bevy game development.
        </p>
      </div>

      <p className="mb-6">
        Once you&apos;ve mastered these basics, you&apos;ll be ready to move on to building interactive games with player movement, collectibles, and more in the Ball Game tutorial.
      </p>

      <div className="flex justify-end">
        <Link href="/basics/shapes" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Get Started with Shapes →
        </Link>
      </div>
    </div>
  );
}