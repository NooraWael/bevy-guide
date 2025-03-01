'use client';

import React from 'react';
import Link from 'next/link';

export default function Lights() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/basics" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Basics
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Lighting in Bevy</h1>
      
      <p className="mb-4">
        Lighting is crucial for creating atmosphere and visual depth in a 3D scene. Bevy provides several types of lights to illuminate your game world, each with different properties and uses.
      </p>

      <div className="space-y-8">
        {/* Section 1: Why Lighting Matters */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Why Lighting Matters</h2>
          
          <p className="mb-4">
            Proper lighting in a 3D scene serves several important purposes:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Visibility</strong> - Makes objects visible and highlights important elements</li>
            <li><strong>Atmosphere</strong> - Creates mood and ambiance (warm, cold, eerie, cheerful)</li>
            <li><strong>Depth</strong> - Helps convey the three-dimensional nature of objects</li>
            <li><strong>Focus</strong> - Directs the player&apos;s attention to important areas</li>
            <li><strong>Realism</strong> - Makes the virtual world feel more believable</li>
          </ul>
        </section>

        {/* Section 2: Light Components in Bevy */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Light Components in Bevy</h2>
          
          <p className="mb-4">
            In Bevy, lights are entities with specific light components and a Transform component to position them in 3D space.
          </p>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Common Light Properties:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Color</strong> - The color of the light (default is white)</li>
              <li><strong>Intensity</strong> - How bright the light is</li>
              <li><strong>Range</strong> - How far the light reaches (for point and spot lights)</li>
              <li><strong>Shadows</strong> - Whether the light casts shadows</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Types of Lights */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Types of Lights in Bevy</h2>
          
          <p className="mb-4">
            Bevy provides four main types of lights, each with different behaviors and use cases:
          </p>
          
          <div className="space-y-6 mb-6">
            {/* Point Light */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Point Light</h3>
              
              <p className="mb-2">
                A point light emits light in all directions from a single point, similar to a light bulb or a torch.
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`// Basic point light
commands.spawn((
    PointLight {
        shadows_enabled: true,
        ..default()
    },
    Transform::from_xyz(4.0, 8.0, 4.0),
));

`}</code>
              </pre>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Best uses:</strong> Interior lighting, torches, lamps, explosions, magical effects</p>
                <p><strong>Note:</strong> Multiple point lights can impact performance, especially with shadows enabled</p>
              </div>
            </div>
            
            {/* Directional Light */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Directional Light</h3>
              
              <p className="mb-2">
                A directional light emits parallel rays in a single direction, like sunlight. It affects all objects in the scene regardless of the light&apos;s position.
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`// Basic directional light (sun)
commands.spawn((
    DirectionalLight {
        shadows_enabled: true,
        illuminance: 10000.0,  // Brightness
        ..default()
    },
    // The position doesn't matter, only the direction
    Transform::from_xyz(0.0, 10.0, 0.0)
        .looking_at(Vec3::new(-1.0, -1.0, -1.0), Vec3::Y),
));`}</code>
              </pre>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Best uses:</strong> Sunlight, moonlight, any large distant light source</p>
                <p><strong>Note:</strong> The transform.translation doesn&apos;t affect the light, only the direction it points</p>
              </div>
            </div>
            
            {/* Spot Light */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Spot Light</h3>
              
              <p className="mb-2">
                A spot light emits light in a cone shape from a single point, like a flashlight or spotlight.
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`// Flashlight-like spot light
commands.spawn((
    SpotLight {
        color: Color::WHITE,
        intensity: 2000.0,
        range: 30.0,
        radius: 0.2,             // Size of the light source
        shadows_enabled: true,
        outer_angle: 0.6,        // Width of the light cone
        inner_angle: 0.4,        // Inner cone with no falloff
        ..default()
    },
    Transform::from_xyz(0.0, 5.0, 0.0)
        .looking_at(Vec3::new(0.0, 0.0, 0.0), Vec3::Y),
));`}</code>
              </pre>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Best uses:</strong> Flashlights, searchlights, headlights, focused lighting</p>
                <p><strong>Note:</strong> Both position and rotation matter for spot lights</p>
              </div>
            </div>
            
            {/* Ambient Light */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Ambient Light</h3>
              
              <p className="mb-2">
                Ambient light provides a base level of illumination to all objects in the scene, regardless of position or orientation.
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`// Add global ambient light
commands.insert_resource(AmbientLight {
    color: Color::srgb(0.1, 0.1, 0.1),  // Dim, bluish ambient light
    brightness: 0.2,                   // Low intensity
});`}</code>
              </pre>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Best uses:</strong> Base illumination, night scenes, indoor areas</p>
                <p><strong>Note:</strong> This is a resource, not an entity with components</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Shadows */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Working with Shadows</h2>
          
          <p className="mb-4">
            Shadows add depth and realism to your scene. In Bevy, you can enable shadows for most light types:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Enable shadows for a point light
PointLight {
    shadows_enabled: true,
    shadow_depth_bias: 0.02,       // Prevents shadow acne
    shadow_normal_bias: 0.6,       // Further reduces artifacts
    ..default()
},`}</code>
          </pre>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Note:</p>
            <p>
              Shadows can be computationally expensive. For better performance:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Only enable shadows on important lights</li>
              <li>Use fewer lights with shadows in your scene</li>
              <li>Consider using baked lighting for static scenes</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Lighting Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Lighting Tips</h2>
          
          <p className="mb-4">
            Here are some tips for effective lighting in your Bevy games:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Three-Point Lighting</strong> - Use a main light, a fill light, and a back light for balanced illumination</li>
            <li><strong>Color Contrast</strong> - Use complementary colors for different light sources</li>
            <li><strong>Light Position</strong> - Place lights at different heights for natural-looking shadows</li>
            <li><strong>Performance</strong> - Start with ambient light and add specific lights as needed</li>
            <li><strong>Atmosphere</strong> - Use colored lights to set the mood (blue for night, orange for sunset)</li>
          </ul>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            Now that you understand lighting in Bevy, you&apos;re ready to:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Experiment with different light types and settings</li>
            <li>Create mood and atmosphere in your scenes</li>
            <li>Learn about cameras to view your well-lit scenes</li>
          </ul>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/basics/shapes" className="text-blue-500 hover:underline">
              ← Basic Shapes
            </Link>
            <Link href="/basics/camera" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Camera →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}