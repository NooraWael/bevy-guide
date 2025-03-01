'use client';

import React from 'react';
import Link from 'next/link';

export default function Camera() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/basics" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Basics
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Cameras in Bevy</h1>
      
      <p className="mb-4">
        Cameras are your window into the game world. They determine what the player sees and how they see it.
      </p>

      <div className="space-y-8">
        {/* Section 1: Camera Basics */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Camera Basics</h2>
          
          <p className="mb-4">
            A camera in Bevy has two essential components:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Camera Component</strong> - Defines how the scene is projected onto the screen</li>
            <li><strong>Transform Component</strong> - Controls the position and orientation of the camera</li>
          </ul>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Basic 3D camera
commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(-2.5, 4.5, 9.0)
        .looking_at(Vec3::ZERO, Vec3::Y),
));`}</code>
          </pre>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">The <code>looking_at()</code> Method:</p>
            <p>
              <code>looking_at(target, up)</code> is a convenient way to point your camera:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li><code>target</code>: The point to look at (often <code>Vec3::ZERO</code> for the origin)</li>
              <li><code>up</code>: Which direction is &quot;up&quot; (typically <code>Vec3::Y</code> for Y-axis)</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Camera Types */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Camera Types</h2>
          
          <div className="space-y-6 mb-6">
            {/* 3D Camera */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Camera3d</h3>
              <p className="mb-2">
                For 3D games with perspective (objects appear smaller as they get further away).
              </p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`Camera3d::default()`}</code>
              </pre>
            </div>
            
            {/* 2D Camera */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">Camera2d</h3>
              <p className="mb-2">
                For 2D games with orthographic projection (no perspective).
              </p>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-3 overflow-x-auto">
                <code>{`Camera2d::default()`}</code>
              </pre>
            </div>
            
            {/* UI Camera */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">UI Camera</h3>
              <p className="mb-2">
                For UI elements (automatically added by DefaultPlugins).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Common Camera Setups */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Common Camera Setups</h2>
          
          <div className="space-y-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Main Game Camera</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(-2.5, 4.5, 9.0)
        .looking_at(Vec3::ZERO, Vec3::Y),
));`}</code>
              </pre>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Top-Down Camera</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(0.0, 10.0, 0.0)
        .looking_at(Vec3::ZERO, Vec3::Z),
));`}</code>
              </pre>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">First-Person Camera</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Typically attached to player entity
commands.spawn((
    Camera3d::default(),
    Transform::from_xyz(0.0, 1.7, 0.0), // Eye height
));`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Section 4: Following a Player */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Camera Following a Player</h2>
          
          <p className="mb-4">
            Create a system to make the camera follow your player character:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn follow_camera(
    player_query: Query<&Transform, With<Player>>,
    mut camera_query: Query<&mut Transform, With<Camera3d>>,
) {
    let player_transform = player_query.single();
    let mut camera_transform = camera_query.single_mut();
    
    // Position camera behind and above player
    let offset = Vec3::new(0.0, 3.0, 5.0);
    camera_transform.translation = player_transform.translation + offset;
    
    // Look at player
    *camera_transform = camera_transform
        .looking_at(player_transform.translation, Vec3::Y);
}`}</code>
          </pre>
          
          <p className="mb-4">
            Remember to add this system to your App:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`App::new()
    .add_plugins(DefaultPlugins)
    .add_systems(Update, follow_camera)
    .run();`}</code>
          </pre>
        </section>

        {/* Section 5: Camera Effects */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Simple Camera Shake</h2>
          
          <p className="mb-4">
            Here&apos;s a basic camera shake effect:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`#[derive(Component)]
struct CameraShake {
    intensity: f32,
    timer: Timer,
}

fn camera_shake_system(
    time: Res<Time>,
    mut query: Query<(&mut CameraShake, &mut Transform)>,
) {
    for (mut shake, mut transform) in query.iter_mut() {
        if shake.timer.tick(time.delta()).just_finished() {
            // Reset shake
            shake.intensity = 0.0;
            transform.translation.x = transform.translation.x.round();
            transform.translation.y = transform.translation.y.round();
        } else if shake.intensity > 0.0 {
            // Apply random offset
            transform.translation.x += rand::random::<f32>() * shake.intensity - shake.intensity / 2.0;
            transform.translation.y += rand::random::<f32>() * shake.intensity - shake.intensity / 2.0;
        }
    }
}

// Function to trigger shake
fn add_camera_shake(
    intensity: f32, 
    duration: f32,
    mut camera_query: Query<&mut CameraShake>
) {
    if let Ok(mut shake) = camera_query.get_single_mut() {
        shake.intensity = intensity;
        shake.timer = Timer::from_seconds(duration, TimerMode::Once);
    }
}`}</code>
          </pre>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            With your understanding of cameras in Bevy, you&apos;re ready to:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Set up the perfect view for your game</li>
            <li>Create dynamic cameras that follow your players</li>
            <li>Add camera effects for more game feel</li>
          </ul>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/basics/lights" className="text-blue-500 hover:underline">
              ← Lighting in Bevy
            </Link>
            <Link href="/basics/first-scene" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              First 3D Scene →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}