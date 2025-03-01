"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FirstScenePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/basics"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Back to Basics
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">First 3D Scene with Bevy</h1>

      <p className="mb-4">
        Now that we understand the fundamental components in Bevy (shapes, lighting, and cameras), let&apos;s put them all together to create our first complete 3D scene. We&apos;ll build a simple scene with a cube sitting on a circular plane, illuminated by a light source, and viewed through a camera. This example is adapted from the{" "}
        <a
          href="https://github.com/bevyengine/bevy/blob/latest/examples/3d/3d_scene.rs"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          official Bevy example
        </a>.
      </p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/first-scene.png"
          alt="First 3D Scene with Bevy"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Our target: A simple 3D scene with a cube on a circular plane
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: ECS Review */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            1. Review: The Entity Component System
          </h2>

          <p className="mb-4">
            Before we start coding, let&apos;s quickly review how all the elements we&apos;ve learned about fit into Bevy&apos;s Entity Component System (ECS) architecture:
          </p>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Bevy&apos;s ECS Approach:</p>
            <p>
              In our scene, each object (cube, ground, light, camera) will be an <strong>Entity</strong>. 
              Each entity will have <strong>Components</strong> that define its properties (mesh, material, transform).
              Our <strong>setup function</strong> will be a System that creates these entities.
            </p>

            <div className="mt-4 flex justify-center">
              <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2">
                <Image
                  src="/bevyecs.png"
                  alt="Bevy ECS Architecture Diagram"
                  width={500}
                  height={300}
                  className="mx-auto"
                />
                <p className="text-center text-sm text-blue-700 dark:text-blue-300 mt-2">
                  Bevy&apos;s Entity Component System Architecture
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Setting up the Project Structure */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            2. Setting up the Project Structure
          </h2>

          <p className="mb-4">
            Let&apos;s start by setting up the basic structure for our 3D scene:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`//! A simple 3D scene with light shining over a cube sitting on a plane.
use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .run();
}

// We'll define our setup function next
fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // We'll add our scene elements here
}`}</code>
          </pre>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Note:</p>
            <p>This structure is common to most Bevy applications. The <code>setup</code> function runs once when the application starts, and we&apos;ll use it to create all our initial entities.</p>
          </div>
        </section>

        {/* Section 3: Adding Scene Elements */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            3. Building Our Scene Step by Step
          </h2>

          <p className="mb-4">
            Now let&apos;s build our scene by adding elements one by one:
          </p>

          <div className="space-y-6">
            {/* Ground Plane */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Step 1: Add a Circular Ground Plane</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// circular base
commands.spawn((
    Mesh3d(meshes.add(Circle::new(4.0))),
    MeshMaterial3d(materials.add(Color::WHITE)),
    Transform::from_rotation(Quat::from_rotation_x(-std::f32::consts::FRAC_PI_2)),
));`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We create a circular plane with radius 4.0, give it a white material, and rotate it to be horizontal.
              </p>
            </div>

            {/* Cube */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Step 2: Add a Cube</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// cube
commands.spawn((
    Mesh3d(meshes.add(Cuboid::new(1.0, 1.0, 1.0))),
    MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
    Transform::from_xyz(0.0, 0.5, 0.0),
));`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We create a 1×1×1 cube with a light blue color, positioned slightly above the ground plane.
              </p>
            </div>

            {/* Light */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Step 3: Add a Light Source</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// light
commands.spawn((
    PointLight {
        shadows_enabled: true,
        ..default()
    },
    Transform::from_xyz(4.0, 8.0, 4.0),
));`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We add a point light with shadows enabled, positioned above and to the side of our scene.
              </p>
            </div>

            {/* Camera */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Step 4: Add a Camera</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// camera
commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(-2.5, 4.5, 9.0).looking_at(Vec3::ZERO, Vec3::Y),
));`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We create a 3D camera, positioned to view our scene from a good angle, and looking at the center point.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Complete Code */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Complete Code</h2>

          <p className="mb-4">
            Here&apos;s the complete code for our first Bevy 3D scene:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`//! A simple 3D scene with light shining over a cube sitting on a plane.
use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .run();
}

/// set up a simple 3D scene
fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // circular base
    commands.spawn((
        Mesh3d(meshes.add(Circle::new(4.0))),
        MeshMaterial3d(materials.add(Color::WHITE)),
        Transform::from_rotation(Quat::from_rotation_x(-std::f32::consts::FRAC_PI_2)),
    ));
    // cube
    commands.spawn((
        Mesh3d(meshes.add(Cuboid::new(1.0, 1.0, 1.0))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(0.0, 0.5, 0.0),
    ));
    // light
    commands.spawn((
        PointLight {
            shadows_enabled: true,
            ..default()
        },
        Transform::from_xyz(4.0, 8.0, 4.0),
    ));
    // camera
    commands.spawn((
        Camera3d::default(),
        Transform::from_xyz(-2.5, 4.5, 9.0).looking_at(Vec3::ZERO, Vec3::Y),
    ));
}`}</code>
          </pre>

          <p className="mb-4">
            Save this code to your{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">
              main.rs
            </code>{" "}
            file and run it with:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`cargo run`}</code>
          </pre>

          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 dark:bg-green-900 dark:text-green-200">
            <p className="font-bold">Success!</p>
            <p>
              You should now see a window with a blue cube sitting on a white circular plane, with shadows cast by the light source. Congratulations on creating your first 3D scene in Bevy!
            </p>
          </div>
        </section>

        {/* Section 5: Experimenting with the Scene */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Experimenting with Your Scene</h2>
          
          <p className="mb-4">
            Now that you have a working 3D scene, try experimenting with it:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Change the colors of the cube and plane</li>
            <li>Add more cubes or other shapes to the scene</li>
            <li>Move the light to different positions and see how the shadows change</li>
            <li>Change the camera position for different viewpoints</li>
            <li>Try adding a different type of light (like a DirectionalLight)</li>
          </ul>
          
          <p className="mb-4">
            These small experiments will help reinforce your understanding of how Bevy&apos;s 3D components work together.
          </p>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>

          <p className="mb-4">
            Now that you&apos;ve created your first static 3D scene, it&apos;s time to make things more interactive. In the Ball Game tutorial, we&apos;ll learn how to:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Make objects respond to player input</li>
            <li>Add physics and movement</li>
            <li>Create collectible items</li>
            <li>Add UI elements to show scores</li>
          </ul>

          <p className="mb-6">
            With the fundamentals you&apos;ve learned, you&apos;re ready to start building more complex and interactive games!
          </p>

          <div className="flex justify-between items-center">
            <Link
              href="/basics/camera"
              className="text-blue-500 hover:underline"
            >
              ← Camera
            </Link>
            <Link
              href="/ball-game/setup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ball Game Setup →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}