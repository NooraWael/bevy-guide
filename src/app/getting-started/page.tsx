"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Getting Started with Bevy</h1>

      <p className="mb-4">
        Bevy is a refreshingly simple data-driven game engine built in Rust. Let
        us start with, setting up a new Bevy project and create a simple Hello
        World application.
      </p>

      <div className="space-y-8">
        {/* Section 1: Creating a new Rust project */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            1. Creating a new Rust project
          </h2>

          <p className="mb-4">
            First, let&apos;s create a new Rust project using Cargo, Rust&apos;s
            package manager:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`cargo new bevy_ball_game
cd bevy_ball_game`}</code>
          </pre>

          <p>This creates a new Rust project with a basic structure:</p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`bevy_ball_game/
├── Cargo.toml
└── src/
    └── main.rs`}</code>
          </pre>
        </section>

        {/* Section 2: Adding Bevy as a dependency */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            2. Adding Bevy as a dependency
          </h2>

          <p className="mb-4">
            Add Bevy as a dependency using Cargo&apos;s command line:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`cargo add bevy`}</code>
          </pre>

          <p className="mb-4">
            This will update your{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">
              Cargo.toml
            </code>{" "}
            file to include Bevy:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`[package]
name = "bevy_ball_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
bevy = "0.15.3"

# Enable a small amount of optimization in debug mode
[profile.dev]
opt-level = 1

# Enable high optimizations for dependencies (incl. Bevy), but not for our code:
[profile.dev.package."*"]
opt-level = 3`}</code>
          </pre>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Note:</p>
            <p>
              The additional profile settings will improve compile times and
              runtime performance during development.
            </p>
          </div>
        </section>

        {/* Section 3: Empty Bevy Application */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            3. Creating an Empty Bevy Application
          </h2>

          <p className="mb-4">
            Let&apos;s start by creating an empty Bevy application. Open{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">
              src/main.rs
            </code>{" "}
            and replace its contents with:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .run();
}`}</code>
          </pre>

          <p className="mb-4">
            This creates a core Bevy application with the default plugins. Run
            it with:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`cargo run`}</code>
          </pre>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">DefaultPlugins:</p>
            <p className="mb-2">
              <code>DefaultPlugins</code> is a collection of standard plugins
              that provide core functionality for the game engine.:
            </p>
          </div>

          <p className="mb-4">
            You should see an empty window appear. This means Bevy is working
            correctly!
          </p>

          <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-4">
            <Image
              src="/empty.png"
              alt="Empty Bevy Window"
              width={600}
              height={400}
              className="mx-auto border border-gray-400 dark:border-gray-600"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              An empty Bevy window
            </p>
          </div>
        </section>

        {/* Section 4: Basic Hello World */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            4. Adding a Hello World Message
          </h2>

          <p className="mb-4">
            Now, let&apos;s modify our application to print a &quot;Hello,
            Bevy!&quot; message to the console:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`use bevy::prelude::*;

fn main() {
    println!("Hello, Bevy!");
    
    App::new()
        .add_plugins(DefaultPlugins)
        .run();
}`}</code>
          </pre>

          <p className="mb-4">
            Run it again with{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">
              cargo run
            </code>
            . You should see &quot;Hello, Bevy!&quot; printed to the console
            before the window appears.
          </p>
        </section>

        {/* Section 5: Using Systems */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Using Bevy Systems</h2>

          <p className="mb-4">
            Now let&apos;s create proper Bevy systems that run at startup and
            during updates:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, startup_system)  // Runs once when the app starts
        .add_systems(Update, update_system)    // Runs every frame
        .run();
}

fn startup_system() {
    println!("Hello from startup system!");
}

fn update_system() {
    // This will print every frame, which is too much!
    // Let's comment it out for now
    // println!("Hello from update system!");
}`}</code>
          </pre>

          <p className="mb-4">
            When you run this, you&apos;ll see &quot;Hello from startup
            system!&quot; printed once when the app starts.
          </p>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Understanding Bevy Systems:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Startup systems</strong> run once when the app starts
              </li>
              <li>
                <strong>Update systems</strong> run every frame
              </li>
              <li>
                Systems are just regular Rust functions that can interact with
                Bevy&apos;s ECS (Entity Component System)
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Running Counter Example */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Adding a Frame Counter</h2>

          <p className="mb-4">
            Let&apos;s modify our example to track and display the frame count:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-6 overflow-x-auto">
            <code>{`use bevy::prelude::*;

// Define a resource to store our counter
#[derive(Resource)]
struct FrameCount {
    count: u32,
}

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .init_resource::<FrameCount>() // Initialize our resource
        .add_systems(Startup, startup_system)
        .add_systems(Update, update_counter_system)
        .run();
}

fn startup_system() {
    println!("Starting Bevy application!");
}

fn update_counter_system(mut frame_count: ResMut<FrameCount>) {
    frame_count.count += 1;
    
    // Only print every 60 frames (roughly once per second)
    if frame_count.count % 60 == 0 {
        println!("Frame count: {}", frame_count.count);
    }
}

// Default implementation for our resource
impl Default for FrameCount {
    fn default() -> Self {
        FrameCount { count: 0 }
    }
}`}</code>
          </pre>

          <p className="mb-4">
            Now when you run the application, you&apos;ll see the frame count
            printed approximately once per second!
          </p>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>

          <p className="mb-4">
            Congratulations! You&apos;ve created your first Bevy application and
            learned about:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Create a basic scene</li>
            <li>Movement</li>
            <li>Collectibles</li>
            <li>Game loop</li>
          </ul>

          <p className="mb-6">
            In the next section, we&apos;ll learn how to creates shapes
          </p>

          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-500 hover:underline">
              ← Home
            </Link>
            <Link
              href="/basic-shapes"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Basic Shapes →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
