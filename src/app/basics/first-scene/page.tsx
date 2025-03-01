"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FirstScenePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/getting-started"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Back to Getting Started
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">First 3D Scene with Bevy</h1>

      <p className="mb-4">
        Let&apos;s create our first 3D scene in Bevy! We&apos;ll build a simple
        scene with a cube sitting on a circular plane, illuminated by a light
        source, and viewed through a camera. The code for this example is
        adapted from the{" "}
        <a
          href="https://github.com/bevyengine/bevy/blob/latest/examples/3d/3d_scene.rs"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          official Bevy example
        </a>
        .
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
        {/* Section 1: Understanding Components of a 3D Scene */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            1. Understanding Components of a 3D Scene
          </h2>

          <p className="mb-4">
            Before we start coding, let&apos;s understand the basic elements we
            need for our 3D scene:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Meshes</strong> - 3D models that define the shape of
              objects (cube, plane)
            </li>
            <li>
              <strong>Materials</strong> - Define how objects look (color,
              texture, reflectivity)
            </li>
            <li>
              <strong>Lights</strong> - Illuminate the scene:
              <ul className="list-disc pl-6 mt-1 mb-1">
                <li>
                  <strong>PointLight</strong> - Emits light in all directions
                  from a single point, like a light bulb
                </li>
                <li>
                  <strong>DirectionalLight</strong> - Emits parallel light rays
                  in one direction, like sunlight
                </li>
                <li>
                  <strong>SpotLight</strong> - Emits light in a cone shape, like
                  a flashlight or spotlight
                </li>
                <li>
                  <strong>AmbientLight</strong> - Provides uniform illumination
                  to all objects regardless of their orientation
                </li>
              </ul>
            </li>
            <li>
              <strong>Camera</strong> - Provides the viewpoint from which we see
              the scene
            </li>
            <li>
              <strong>Transforms</strong> - Define the position, rotation, and
              scale of objects
            </li>
          </ul>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Bevy&apos;s ECS Approach:</p>
            <p>
              In Bevy, all these elements are represented using the Entity
              Component System (ECS). Each object in our scene is an{" "}
              <strong>Entity</strong> with various <strong>Components</strong>{" "}
              attached to it. Our <strong>Systems</strong> (like the setup
              function) create and manipulate these entities.
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
            Let&apos;s start by updating our{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">
              main.rs
            </code>{" "}
            file with a new structure for our 3D scene:
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
            <p>The setup function takes three parameters:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <code>commands</code> - Used to create entities
              </li>
              <li>
                <code>meshes</code> - Repository for all mesh assets
              </li>
              <li>
                <code>materials</code> - Repository for all material assets
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Adding a Circular Plane */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            3. Adding a Circular Plane
          </h2>

          <p className="mb-4">
            Let&apos;s start by adding a circular plane to our scene. This will
            serve as the ground for our cube:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Inside the setup function

// circular base
commands.spawn((
    Mesh3d(meshes.add(Circle::new(4.0))),
    MeshMaterial3d(materials.add(Color::WHITE)),
    Transform::from_rotation(Quat::from_rotation_x(-std::f32::consts::FRAC_PI_2)),
));`}</code>
          </pre>

          <p className="mb-4">Here&apos;s what&apos;s happening:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              We&apos;re creating a new entity with{" "}
              <code>commands.spawn()</code>
            </li>
            <li>
              We add a <code>Mesh3d</code> component with a circular shape of
              radius 4.0
            </li>
            <li>
              We add a <code>MeshMaterial3d</code> component with a white color
            </li>
            <li>
              We rotate the circle 90 degrees around the X-axis to make it
              horizontal using a <code>Transform</code> component
            </li>
          </ol>
        </section>

        {/* Section 4: Adding a Cube */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Adding a Cube</h2>

          <p className="mb-4">
            Next, let&apos;s add a cube that sits on top of our circular plane:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Inside the setup function

// cube
commands.spawn((
    Mesh3d(meshes.add(Cuboid::new(1.0, 1.0, 1.0))),
    MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
    Transform::from_xyz(0.0, 0.5, 0.0),
));`}</code>
          </pre>

          <p className="mb-4">Here&apos;s what&apos;s happening:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              We create a cube using <code>Cuboid::new(1.0, 1.0, 1.0)</code>{" "}
              with dimensions 1x1x1
            </li>
            <li>We give it a light blue color using RGB values</li>
            <li>
              We position it at coordinates (0, 0.5, 0) - slightly above the
              plane
            </li>
          </ol>
        </section>

        {/* Section 5: Adding Light */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Adding Light</h2>

          <p className="mb-4">
            Now let&apos;s add a light source to illuminate our scene:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Inside the setup function

// light
commands.spawn((
    PointLight {
        shadows_enabled: true,
        ..default()
    },
    Transform::from_xyz(4.0, 8.0, 4.0),
));`}</code>
          </pre>

          <p className="mb-4">Here&apos;s what&apos;s happening:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              We&apos;re creating a <code>PointLight</code> that emits light in
              all directions
            </li>
            <li>
              We enable shadows with <code>shadows_enabled: true</code>
            </li>
            <li>
              We use <code>..default()</code> to set all other light properties
              to default values
            </li>
            <li>
              We position the light at coordinates (4, 8, 4) - above and to the
              side of our scene
            </li>
          </ol>
        </section>

        {/* Section 6: Adding Camera */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Adding Camera</h2>

          <p className="mb-4">
            Finally, let&apos;s add a camera to view our scene:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Inside the setup function

// camera
commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(-2.5, 4.5, 9.0).looking_at(Vec3::ZERO, Vec3::Y),
));`}</code>
          </pre>

          <p className="mb-4">Here&apos;s what&apos;s happening:</p>

          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>We&apos;re creating a 3D camera with default settings</li>
            <li>
              We position it at coordinates (-2.5, 4.5, 9.0) - back and to the
              side
            </li>
            <li>
              We use <code>looking_at(Vec3::ZERO, Vec3::Y)</code> to point the
              camera at the center of our scene (0,0,0)
            </li>
            <li>
              The <code>Vec3::Y</code> parameter defines &quot;up&quot; as the
              Y-axis
            </li>
          </ol>
        </section>

        {/* Section 7: Complete Code */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Complete Code</h2>

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

          <p className="mb-4">
            You should see a window with a blue cube sitting on a white circular
            plane, with shadows from the light source!
          </p>
        </section>

        {/* Section 8: Explanation of Components */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            8. Understanding the Components
          </h2>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold mb-2">Key Components in this Example:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Circle</strong>: Creates a circular mesh with the
                specified radius
              </li>
              <li>
                <strong>Cuboid</strong>: Creates a cube or rectangular prism
                with specified dimensions
              </li>
              <li>
                <strong>Transform</strong>: Positions, rotates, and scales
                entities in 3D space
              </li>
              <li>
                <strong>PointLight</strong>: Emits light in all directions from
                a single point
              </li>
              <li>
                <strong>Camera3d</strong>: Provides a viewpoint for rendering
                the 3D scene
              </li>
              <li>
                <strong>Color</strong>: Defines the appearance of materials
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>

          <p className="mb-4">
            Congratulations! You&apos;ve created your first 3D scene in Bevy.
            From here, you can:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Add more shapes and objects to your scene</li>
            <li>Experiment with different materials and colors</li>
            <li>Add movement and animation to your objects</li>
            <li>Implement user interaction with keyboard and mouse</li>
          </ul>

          <p className="mb-6">
            In the next tutorial, we&apos;ll learn how to add movement and
            interaction to our scene.
          </p>

          <div className="flex justify-between items-center">
            <Link
              href="/getting-started"
              className="text-blue-500 hover:underline"
            >
              ← Getting Started
            </Link>
            <Link
              href="/movement-and-interaction"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Movement and Interaction →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
