'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BallGameMovement() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/ball-game" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Ball Game
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Player Movement in the Ball Game</h1>
      
      <p className="mb-4">
        Now that we&apos;ve set up our game arena, let&apos;s implement player movement to make our ball 
        controllable. We&apos;ll add systems for keyboard input, horizontal movement, jumping, and gravity.
      </p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/movement.png"
          alt="Ball Movement in Bevy"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Our player ball responding to keyboard input and physics
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Understanding Movement Components */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Understanding Movement Components</h2>
          
          <p className="mb-4">
            Before implementing movement, let&apos;s review our <code>Player</code> component that handles movement state:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`#[derive(Component)]
struct Player {
    velocity_y: f32,   // Vertical velocity for jumping and falling
    is_jumping: bool,  // Whether the player is currently in a jump
}`}</code>
          </pre>
          
          <p className="mb-4">
            This component stores:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>velocity_y</strong> - The vertical velocity, positive when jumping up, negative when falling</li>
            <li><strong>is_jumping</strong> - A flag to track if the player is mid-jump</li>
          </ul>
          
          <p className="mb-4">
            We don&apos;t store horizontal velocity because we&apos;ll directly move the player based on keyboard input.
          </p>
        </section>

        {/* Section 2: Implementing Player Movement */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Implementing Player Movement</h2>
          
          <p className="mb-4">
            Let&apos;s implement the <code>player_movement</code> system that will handle keyboard input, 
            horizontal movement, jumping, and gravity:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn player_movement(
    keyboard_input: Res<ButtonInput<KeyCode>>,
    time: Res<Time>,
    mut query: Query<(&mut Player, &mut Transform)>,
) {
    let (mut player, mut player_transform) = query.single_mut();
    let mut direction = Vec3::ZERO;

    // Get player input for horizontal movement
    if keyboard_input.pressed(KeyCode::KeyW) {
        direction.z -= 1.0;
    }
    if keyboard_input.pressed(KeyCode::KeyS) {
        direction.z += 1.0;
    }
    if keyboard_input.pressed(KeyCode::KeyA) {
        direction.x -= 1.0;
    }
    if keyboard_input.pressed(KeyCode::KeyD) {
        direction.x += 1.0;
    }

    // Handle jumping
    let is_on_ground = player_transform.translation.y <= 0.5;
    
    if is_on_ground {
        player.velocity_y = 0.0;
        player.is_jumping = false;
        player_transform.translation.y = 0.5; // Ensure player is exactly on the ground
    }

    // Check for jump input (Space key)
    if keyboard_input.just_pressed(KeyCode::Space) && is_on_ground {
        player.velocity_y = 10.0; // Initial jump velocity
        player.is_jumping = true;
    }

    // Apply gravity and update vertical position
    if player.is_jumping || !is_on_ground {
        // Apply gravity
        player.velocity_y -= 20.0 * time.delta_secs(); // Gravity constant
        
        // Update vertical position
        player_transform.translation.y += player.velocity_y * time.delta_secs();
        
        // Prevent going below the ground
        if player_transform.translation.y < 0.5 {
            player_transform.translation.y = 0.5;
            player.is_jumping = false;
        }
    }

    // Normalize direction and apply horizontal movement
    if direction != Vec3::ZERO {
        direction = direction.normalize();
        
        // Apply horizontal movement
        player_transform.translation.x += direction.x * 5.0 * time.delta_secs();
        player_transform.translation.z += direction.z * 5.0 * time.delta_secs();
        
        // Keep the player within bounds
        let arena_size = 8.5; // Slightly smaller than the walls
        player_transform.translation.x = player_transform.translation.x.clamp(-arena_size, arena_size);
        player_transform.translation.z = player_transform.translation.z.clamp(-arena_size, arena_size);
    }
}`}</code>
          </pre>
        </section>

        {/* Section 3: Breaking Down the Movement System */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Breaking Down the Movement System</h2>
          
          <p className="mb-4">
            Let&apos;s understand the movement system in detail:
          </p>
          
          <div className="space-y-6">
            {/* Keyboard Input */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Keyboard Input</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Get player input for horizontal movement
if keyboard_input.pressed(KeyCode::KeyW) {
    direction.z -= 1.0;
}
if keyboard_input.pressed(KeyCode::KeyS) {
    direction.z += 1.0;
}
if keyboard_input.pressed(KeyCode::KeyA) {
    direction.x -= 1.0;
}
if keyboard_input.pressed(KeyCode::KeyD) {
    direction.x += 1.0;
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We check for WASD keys to determine movement direction. W/S move forward/backward (negative/positive Z), 
                and A/D move left/right (negative/positive X).
              </p>
            </div>
            
            {/* Jumping */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Jumping Logic</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Handle jumping
let is_on_ground = player_transform.translation.y <= 0.5;

if is_on_ground {
    player.velocity_y = 0.0;
    player.is_jumping = false;
    player_transform.translation.y = 0.5; // Ensure player is exactly on the ground
}

// Check for jump input (Space key)
if keyboard_input.just_pressed(KeyCode::Space) && is_on_ground {
    player.velocity_y = 10.0; // Initial jump velocity
    player.is_jumping = true;
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We first check if the player is on the ground (y position ≤ 0.5). If on the ground, we reset velocity and jumping state. 
                If the space key is pressed while on the ground, we set an upward velocity to start a jump.
              </p>
            </div>
            
            {/* Gravity */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Gravity and Vertical Movement</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Apply gravity and update vertical position
if player.is_jumping || !is_on_ground {
    // Apply gravity
    player.velocity_y -= 20.0 * time.delta_secs(); // Gravity constant
    
    // Update vertical position
    player_transform.translation.y += player.velocity_y * time.delta_secs();
    
    // Prevent going below the ground
    if player_transform.translation.y < 0.5 {
        player_transform.translation.y = 0.5;
        player.is_jumping = false;
    }
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If the player is jumping or in the air, we apply gravity by decreasing vertical velocity over time. 
                We then update the y position based on that velocity, and prevent the player from falling through the floor.
              </p>
            </div>
            
            {/* Horizontal Movement */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Horizontal Movement and Boundaries</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Normalize direction and apply horizontal movement
if direction != Vec3::ZERO {
    direction = direction.normalize();
    
    // Apply horizontal movement
    player_transform.translation.x += direction.x * 5.0 * time.delta_secs();
    player_transform.translation.z += direction.z * 5.0 * time.delta_secs();
    
    // Keep the player within bounds
    let arena_size = 8.5; // Slightly smaller than the walls
    player_transform.translation.x = player_transform.translation.x.clamp(-arena_size, arena_size);
    player_transform.translation.z = player_transform.translation.z.clamp(-arena_size, arena_size);
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If there is any input direction, we normalize it (to prevent faster diagonal movement) and 
                apply it to the player&apos;s position. We then clamp the position to keep the player within the arena boundaries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Movement Constants and Tuning */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Tuning the Movement Parameters</h2>
          
          <p className="mb-4">
            Our movement system uses several constants that you can adjust to change how the game feels:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-2 px-4 border-b">Constant</th>
                  <th className="py-2 px-4 border-b">Value</th>
                  <th className="py-2 px-4 border-b">Purpose</th>
                  <th className="py-2 px-4 border-b">Effect When Increased</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Initial Jump Velocity</td>
                  <td className="py-2 px-4 border-b"><code>10.0</code></td>
                  <td className="py-2 px-4 border-b">Starting upward force when jumping</td>
                  <td className="py-2 px-4 border-b">Higher jumps</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Gravity Constant</td>
                  <td className="py-2 px-4 border-b"><code>20.0</code></td>
                  <td className="py-2 px-4 border-b">Downward acceleration</td>
                  <td className="py-2 px-4 border-b">Faster falling, shorter jumps</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Movement Speed</td>
                  <td className="py-2 px-4 border-b"><code>5.0</code></td>
                  <td className="py-2 px-4 border-b">Horizontal speed multiplier</td>
                  <td className="py-2 px-4 border-b">Faster horizontal movement</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Arena Size Clamp</td>
                  <td className="py-2 px-4 border-b"><code>8.5</code></td>
                  <td className="py-2 px-4 border-b">Maximum distance from center</td>
                  <td className="py-2 px-4 border-b">More room to move within arena</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Tuning Tip:</p>
            <p>
              Feel free to adjust these values to change the game feel. Higher jump velocity with higher gravity 
              creates snappier jumps, while lower values create floatier physics.
            </p>
          </div>
        </section>

        {/* Section 5: Testing Movement */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Testing the Movement System</h2>
          
          <p className="mb-4">
            With the movement system in place, you can now test your game. Run it with:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`cargo run`}</code>
          </pre>
          
          <p className="mb-4">
            You should be able to:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Move the ball with WASD keys</li>
            <li>Jump by pressing the spacebar</li>
            <li>See the ball fall back to the ground due to gravity</li>
            <li>Be confined within the arena walls</li>
          </ul>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Debugging Movement:</p>
            <p>
              If your movement doesn&apos;t work as expected, check:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>That you&apos;ve added the <code>player_movement</code> system to your <code>App</code></li>
              <li>That your <code>Player</code> component is correctly attached to the player entity</li>
              <li>That your ground height and player starting position match the constants in the code</li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            Now that we have a controllable player, the next step is to implement coin collection so 
            we can actually play the game!
          </p>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/ball-game/setup" className="text-blue-500 hover:underline">
              ← Game Setup
            </Link>
            <Link href="/ball-game/collectibles" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Collectibles →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}