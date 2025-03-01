'use client';

import React from 'react';
import Link from 'next/link';

export default function BasicShapes() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/basics" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Basics
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Basic Shapes in Bevy</h1>
      
      <p className="mb-4">
        3D game engines like Bevy represent objects in a scene using meshes and materials. Understanding how to create and manipulate basic shapes is fundamental to building any 3D game or application.
      </p>

      <div className="space-y-8">
        {/* Section 1: What are Meshes? */}
        <section>
          <h2 className="text-2xl font-bold mb-4">What are Meshes?</h2>
          
          <p className="mb-4">
            In computer graphics, a <strong>mesh</strong> is a collection of vertices, edges, and faces that define the shape of a 3D object. In Bevy:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Vertices</strong> are points in 3D space that define the corners of your shape</li>
            <li><strong>Edges</strong> connect vertices to form the wireframe of your shape</li>
            <li><strong>Faces</strong> (usually triangles) fill in the wireframe to create solid surfaces</li>
          </ul>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Note:</p>
            <p>
              In Bevy, meshes are stored in the <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Assets&lt;Mesh&gt;</code> collection, which manages loading, storing, and accessing all mesh data.
            </p>
          </div>
        </section>

        {/* Section 2: The Mesh3d Component */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Mesh3d Component</h2>
          
          <p className="mb-4">
            In Bevy, 3D shapes are represented using the <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Mesh3d</code> component, which tells the renderer what shape to draw.
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Creating a mesh component
Mesh3d(meshes.add(Sphere::new(1.0)))`}</code>
          </pre>
          
          <p className="mb-4">
            When creating a 3D object, you typically combine three essential components:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Mesh3d</strong> - The shape of the object (geometry)</li>
            <li><strong>MeshMaterial3d</strong> - The visual appearance (color, texture, etc.)</li>
            <li><strong>Transform</strong> - The position, rotation, and scale in 3D space</li>
          </ol>
        </section>

        {/* Section 3: Basic Shape Types */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Basic Shape Types in Bevy</h2>
          
          <p className="mb-4">
            Bevy provides several built-in primitives that you can use to create common shapes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Cube/Cuboid */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Cuboid</h3>
              <p className="mb-2">Creates a box shape with specified dimensions.</p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Create a 1x1x1 cube
Cuboid::new(1.0, 1.0, 1.0)

// Create a rectangular prism
Cuboid::new(2.0, 1.0, 3.0)`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Parameters represent width, height, and depth.
              </p>
            </div>

            {/* Sphere */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Sphere</h3>
              <p className="mb-2">Creates a spherical shape with specified radius.</p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Create a sphere with radius 1.0
Sphere::new(1.0)

// More detailed sphere with custom subdivisions
Sphere::new(2.0).with_subdivisions(32)`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Higher subdivisions create smoother spheres but use more resources.
              </p>
            </div>

            {/* Circle */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Circle</h3>
              <p className="mb-2">Creates a flat circular shape.</p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Create a circle with radius 4.0
Circle::new(4.0)

// Circle with custom subdivisions
Circle::new(4.0).subdivisions(36)`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                By default, circles are created on the XY plane and need to be rotated for ground planes.
              </p>
            </div>

            {/* Cylinder */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Cylinder</h3>
              <p className="mb-2">Creates a cylindrical shape.</p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Cylinder with radius 1.0 and height 2.0
Cylinder::new(1.0, 2.0)

// Coin-like cylinder
Cylinder::new(0.5, 0.1)`}</code>
              </pre>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Parameters represent radius and height.
              </p>
            </div>
          </div>

          <p className="mb-4">
            Bevy also supports more complex primitives like <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Capsule</code>, <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Torus</code>, <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Plane</code>, and <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">RegularPolygon</code>.
          </p>
        </section>

        {/* Section 4: Creating and Positioning Shapes */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Creating and Positioning Shapes</h2>
          
          <p className="mb-4">
            To add shapes to your Bevy scene, you&apos;ll follow this pattern:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Create a mesh from a shape primitive</li>
            <li>Add a material to define its appearance</li>
            <li>Set its position, rotation, and scale with a Transform</li>
            <li>Spawn an entity with these components</li>
          </ol>
          
          <p className="mb-4">
            Here&apos;s a complete example of adding a circle (as a floor) and a cube to your scene:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Add a circular floor
commands.spawn((
    Mesh3d(meshes.add(Circle::new(4.0))),
    MeshMaterial3d(materials.add(Color::WHITE)),
    Transform::from_rotation(Quat::from_rotation_x(-std::f32::consts::FRAC_PI_2)),
));

// Add a cube
commands.spawn((
    Mesh3d(meshes.add(Cuboid::new(1.0, 1.0, 1.0))),
    MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
    Transform::from_xyz(0.0, 0.5, 0.0),
));`}</code>
          </pre>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Understanding the Transform:</p>
            <p className="mb-2">
              In the circular floor example, we use <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Transform::from_rotation(Quat::from_rotation_x(-std::f32::consts::FRAC_PI_2))</code> to rotate the circle 90 degrees around the X-axis, making it horizontal.
            </p>
            <p>
              For the cube, we use <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">Transform::from_xyz(0.0, 0.5, 0.0)</code> to position it at coordinates (0, 0.5, 0), which places it slightly above the floor.
            </p>
          </div>
        </section>

        {/* Section 5: Materials */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Materials</h2>
          
          <p className="mb-4">
            Materials define how objects look under lighting. In Bevy, the <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-100">StandardMaterial</code> type provides properties for common visual characteristics:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Color</strong> - Basic color of the material</li>
            <li><strong>Metallic</strong> - How metallic the surface appears (0.0 to 1.0)</li>
            <li><strong>Roughness</strong> - How rough or smooth the surface is (0.0 to 1.0)</li>
            <li><strong>Emissive</strong> - Light emitted by the material</li>
          </ul>
          
          <p className="mb-4">
            You can create materials with different colors:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// White material
materials.add(Color::WHITE)

// Blue material using RGB values
materials.add(Color::srgb_u8(124, 144, 255))

// Red semi-transparent material
materials.add(Color::rgba(1.0, 0.0, 0.0, 0.5))

// Custom material with metallic and roughness properties
materials.add(StandardMaterial {
    base_color: Color::GREEN,
    metallic: 0.7,
    roughness: 0.2,
    ..default()
})`}</code>
          </pre>
        </section>



        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            Now that you understand the basics of shapes in Bevy, you can:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Explore more complex shapes and custom meshes</li>
            <li>Learn how to add textures to your materials</li>
            <li>Create composite objects by combining multiple shapes</li>
            <li>Build a complete 3D scene with various objects</li>
          </ul>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/basics" className="text-blue-500 hover:underline">
              ← Basics
            </Link>
            <Link href="/basics/lights" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Lighting →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}