'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BallGameSetup() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/ball-game" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Ball Game
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Setting Up the Ball Game</h1>
      
      <p className="mb-4">
        Now that we understand the basics of Bevy, let&apos;s create a simple but fun 3D ball game. 
        In this game, you&apos;ll control a rolling ball to collect coins inside an arena. The game will 
        feature player movement, jumping, collectible items, and a score display.
      </p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/initalGame.png"
          alt="Ball Game in Bevy"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Our ball game with arena, player ball, and collectible coins
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Project Structure */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Project Structure</h2>
          
          <p className="mb-4">
            Let&apos;s start by setting up our project structure. Our game will need:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Components</strong> - For the player, walls, coins, and score</li>
            <li><strong>Resources</strong> - To track game state like score</li>
            <li><strong>Systems</strong> - For player movement, coin collection, and UI updates</li>
            <li><strong>Assets</strong> - For the font used in our score display</li>
          </ul>
          
          <p className="mb-4">First, let&apos;s create a folder structure for our game:</p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
            <pre className="text-sm">
              {`assets/
  └── fonts/
      └── FiraSans-Bold.ttf  (Download this font or use another font)
src/
  └── main.rs`}
            </pre>
          </div>
          
          <p className="mb-4">
            You&apos;ll need a font file for the score display. You can download Fira Sans Bold or use any other font you prefer.
          </p>
        </section>

        {/* Section 2: Define Game Components */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Define Game Components</h2>
          
          <p className="mb-4">
            Let&apos;s start by defining the components and resources we&apos;ll need for our game:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, (player_movement, coin_collection, update_score_text))
        .run();
}

#[derive(Component)]
struct Player {
    velocity_y: f32,
    is_jumping: bool,
}

#[derive(Component)]
struct Coin;

#[derive(Component)]
struct Wall;

#[derive(Resource)]
struct GameState {
    score: u32,
}

#[derive(Component)]
struct ScoreText;`}</code>
          </pre>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Component Breakdown:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Player</strong> - Has properties for vertical velocity and jump state</li>
              <li><strong>Coin</strong> - Marker component for collectible items</li>
              <li><strong>Wall</strong> - Marker component for arena boundaries</li>
              <li><strong>GameState</strong> - Resource to track the player&apos;s score</li>
              <li><strong>ScoreText</strong> - Marker component for the UI text showing the score</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Setting Up the Arena */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Setting Up the Arena</h2>
          
          <p className="mb-4">
            Now, let&apos;s implement the <code>setup</code> function to create our game arena, player, and initial coins:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`/// Set up the game arena, player, lights, camera, and UI
fn setup(
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
    asset_server: Res<AssetServer>,
) {
    // Initialize game state
    commands.insert_resource(GameState { score: 0 });

    let arena_size = 9.0;
    
    // Floor (thin cube)
    commands.spawn((
        Mesh3d(meshes.add(Cuboid::new(arena_size * 2.0, 0.1, arena_size * 2.0))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(0.0, -0.05, 0.0),
    ));

    // Walls
    let wall_height = 1.0;
    let wall_thickness = 0.2;

    // North wall
    commands.spawn((
        Wall,
        Mesh3d(meshes.add(Cuboid::new(arena_size * 2.0, wall_height, wall_thickness))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(0.0, wall_height / 2.0, -arena_size),
    ));

    // South wall
    commands.spawn((
        Wall,
        Mesh3d(meshes.add(Cuboid::new(arena_size * 2.0, wall_height, wall_thickness))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(0.0, wall_height / 2.0, arena_size),
    ));

    // East wall
    commands.spawn((
        Wall,
        Mesh3d(meshes.add(Cuboid::new(wall_thickness, wall_height, arena_size * 2.0))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(arena_size, wall_height / 2.0, 0.0),
    ));

    // West wall
    commands.spawn((
        Wall,
        Mesh3d(meshes.add(Cuboid::new(wall_thickness, wall_height, arena_size * 2.0))),
        MeshMaterial3d(materials.add(Color::srgb_u8(124, 144, 255))),
        Transform::from_xyz(-arena_size, wall_height / 2.0, 0.0),
    ));

    // Player (ball)
    commands.spawn((
        Player {
            velocity_y: 0.0,
            is_jumping: false,
        },
        Mesh3d(meshes.add(Sphere::new(0.5))),
        MeshMaterial3d(materials.add(Color::srgb_u8(255, 100, 100))),
        Transform::from_xyz(0.0, 0.5, 0.0),
    ));

    // Light
    commands.spawn((
        PointLight {
            shadows_enabled: true,
            ..default()
        },
        Transform::from_xyz(4.0, 8.0, 4.0),
    ));
    
    // Camera - positioned for a top-down view
    commands.spawn((
        Camera3d::default(),
        Transform::from_xyz(0.0, 15.0, 15.0).looking_at(Vec3::ZERO, Vec3::Y),
    ));
    
    // Score Text
    commands.spawn((
        Text::new("Score: 0"),
        TextFont {
            font: asset_server.load("fonts/FiraSans-Bold.ttf"),
            font_size: 30.0,
            ..default()
        },
        Node {
            position_type: PositionType::Absolute,
            top: Val::Px(10.0),
            left: Val::Px(10.0),
            ..default()
        },
        ScoreText,
    ));
    
    // Spawn initial coins
    spawn_coins(&mut commands, &mut meshes, &mut materials);
}`}</code>
          </pre>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Arena Structure:</p>
            <p>
              We&apos;ve created a square arena with:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A blue floor (18×0.1×18 units)</li>
              <li>Four walls (north, south, east, west) with height of 1 unit</li>
              <li>A red player ball at the center</li>
              <li>A point light above the arena</li>
              <li>A camera positioned for a good view of the gameplay</li>
              <li>UI text for displaying the score</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Spawning Coins */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Spawning Coins to Collect</h2>
          
          <p className="mb-4">
            Now let&apos;s implement the function to spawn collectible coins in our arena:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn spawn_coins(
    commands: &mut Commands,
    meshes: &mut ResMut<Assets<Mesh>>,
    materials: &mut ResMut<Assets<StandardMaterial>>,
) {
    // Create a shared mesh and material for all coins
    let coin_mesh = meshes.add(Cylinder::new(0.2, 0.05));
    let coin_material = materials.add(Color::srgb_u8(255, 255, 0)); // Gold color
    
    // Define coin positions
    let positions = [
        Vec3::new(3.0, 0.2, 3.0),
        Vec3::new(-3.0, 0.2, 3.0),
        Vec3::new(3.0, 0.2, -3.0),
        Vec3::new(-3.0, 0.2, -3.0),
        Vec3::new(0.0, 0.2, 0.0),
    ];
    
    // Spawn each coin
    for position in positions.iter() {
        commands.spawn((
            Coin,
            Mesh3d(coin_mesh.clone()),
            MeshMaterial3d(coin_material.clone()),
            Transform::from_translation(*position),
        ));
    }
}`}</code>
          </pre>
          
          <p className="mb-4">
            Our coins are represented as thin yellow cylinders (like actual coins) positioned at various points in the arena. 
            We use the same mesh and material for all coins to improve performance.
          </p>
        </section>

        {/* Section 5: Placeholder for Game Systems */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. What&apos;s Next?</h2>
          
          <p className="mb-4">
            Now that we have our game arena set up with a player ball and coins, we need to implement the game systems:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Player Movement</strong> - To control the ball with keyboard input</li>
            <li><strong>Coin Collection</strong> - To detect when the player touches a coin</li>
            <li><strong>Score Updates</strong> - To update the UI when coins are collected</li>
          </ol>
          
          <p className="mb-4">
            We&apos;ll implement these systems in the next sections of this tutorial.
          </p>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Test Your Setup:</p>
            <p>
              At this point, if you run the game with <code>cargo run</code>, you should see your arena with the player
              ball and coins, but nothing will move yet since we haven&apos;t implemented the movement system.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            In the next part of this tutorial, we&apos;ll implement player movement with keyboard controls 
            and jumping mechanics.
          </p>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/basics/first-scene" className="text-blue-500 hover:underline">
              ← First 3D Scene
            </Link>
            <Link href="/ball-game/movement" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Player Movement →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}