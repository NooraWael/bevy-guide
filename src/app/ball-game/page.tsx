'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BallGameOverview() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Building a 3D Ball Game with Bevy</h1>
      
      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/initalGame.png"
          alt="3D Ball Game with Bevy"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Our completed ball game with 3D arena, player ball, collectible coins, and score display
        </p>
      </div>
      
      <p className="mb-6">
        In this tutorial series, we&apos;ll build a complete 3D ball game using the Bevy game engine. 
        You&apos;ll learn how to create a game with player movement, physics, collectible items, and a user interface.
      </p>

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 dark:bg-blue-900 dark:text-blue-200">
        <p className="font-bold">Game Features:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>3D arena with walls and floor</li>
          <li>Player-controlled ball with WASD movement</li>
          <li>Jumping mechanics with gravity</li>
          <li>Collectible coins that increase your score</li>
          <li>UI displaying your current score</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">1. Game Setup</h2>
          <p className="mb-4">Learn how to set up the game arena, player ball, collectible coins, and the basic game structure.</p>
          <Link href="/ball-game/setup" className="text-blue-500 hover:underline">
            Start with game setup →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">2. Player Movement</h2>
          <p className="mb-4">Implement player controls, jumping mechanics, and physics to create responsive ball movement.</p>
          <Link href="/ball-game/movement" className="text-blue-500 hover:underline">
            Explore movement systems →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">3. Collectibles</h2>
          <p className="mb-4">Create collectible coins that the player can gather, with collision detection and score tracking.</p>
          <Link href="/ball-game/collectibles" className="text-blue-500 hover:underline">
            Add collectible items →
          </Link>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold mb-2">4. UI & Scoring</h2>
          <p className="mb-4">Display the player&apos;s score on screen and learn how to update UI elements in response to game events.</p>
          <Link href="/ball-game/ui" className="text-blue-500 hover:underline">
            Implement UI elements →
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
      
      <p className="mb-4">
        Throughout this tutorial series, you&apos;ll gain practical experience with several important game development concepts:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Bevy ECS</h3>
          <p>Learn how to use Bevy&apos;s Entity Component System to structure your game logic in a clean, maintainable way.</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">3D Game Physics</h3>
          <p>Implement movement, jumping, gravity, and collision detection for a satisfying gameplay experience.</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">User Interface</h3>
          <p>Create and update UI elements to display game information to the player.</p>
        </div>
      </div>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 dark:bg-yellow-900 dark:text-yellow-200">
        <p className="font-bold">Prerequisites:</p>
        <p>
          This tutorial assumes you have:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Basic knowledge of Rust programming</li>
          <li>Bevy engine installed (version 0.15 or later)</li>
          <li>Completed the &quot;Basics&quot; section of this guide</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4">Complete Game Code</h2>
      
      <p className="mb-4">
        By the end of this tutorial series, you&apos;ll have built a complete game with the following code structure:
      </p>
      
      <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-6 overflow-x-auto">
        <code>{`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, (player_movement, coin_collection, update_score_text))
        .run();
}

// Components
#[derive(Component)]
struct Player {
    velocity_y: f32,
    is_jumping: bool,
}

#[derive(Component)]
struct Coin;

#[derive(Component)]
struct Wall;

#[derive(Component)]
struct ScoreText;

// Resource
#[derive(Resource)]
struct GameState {
    score: u32,
}

// Setup the game
fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
    asset_server: Res<AssetServer>,
) {
    // Initialize game state
    commands.insert_resource(GameState { score: 0 });
    
    // Setup arena, player, coins, light, camera, and UI
    // ...
}

// Game systems
fn player_movement(
    keyboard_input: Res<ButtonInput<KeyCode>>,
    time: Res<Time>,
    mut query: Query<(&mut Player, &mut Transform)>,
) {
    // Handle keyboard input, movement, jumping, and gravity
    // ...
}

fn coin_collection(
    mut commands: Commands,
    mut game_state: ResMut<GameState>,
    player_query: Query<&Transform, With<Player>>,
    coin_query: Query<(Entity, &Transform), With<Coin>>,
) {
    // Detect collisions between player and coins
    // ...
}

fn update_score_text(
    game_state: Res<GameState>,
    mut query: Query<&mut Text, With<ScoreText>>,
) {
    // Update UI with current score
    // ...
}`}</code>
      </pre>
      
      <div className="flex justify-between items-center">
        <Link href="/basics/first-scene" className="text-blue-500 hover:underline">
          ← First 3D Scene
        </Link>
        <Link href="/ball-game/setup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Start Building →
        </Link>
      </div>
    </div>
  );
}