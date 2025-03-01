'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BallGameCollectibles() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/ball-game" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Ball Game
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Collectibles in the Ball Game</h1>
      
      <p className="mb-4">
        With our player movement system in place, let&apos;s implement collectible coins that the player can gather
        to earn points. We&apos;ll create a system that detects when the player touches a coin and updates the score.
      </p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/collectibles.png"
          alt="Coin Collectibles in Bevy"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Collectible coins in our ball game
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Reviewing Coin Setup */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Reviewing Coin Setup</h2>
          
          <p className="mb-4">
            Before we implement coin collection, let&apos;s review how we set up the coins in our game.
            We defined a <code>Coin</code> component and created a <code>spawn_coins</code> function in our setup:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`#[derive(Component)]
struct Coin;

fn spawn_coins(
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
            Each coin has a:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Coin component</strong> - Marks the entity as a coin</li>
            <li><strong>Mesh</strong> - Cylinder shape that looks like a coin</li>
            <li><strong>Material</strong> - Gold color</li>
            <li><strong>Transform</strong> - Position in the game world</li>
          </ul>
          
          <p className="mb-4">
            We also defined a <code>GameState</code> resource to track the player&apos;s score:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`#[derive(Resource)]
struct GameState {
    score: u32,
}`}</code>
          </pre>
        </section>

        {/* Section 2: Implementing Coin Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Implementing Coin Collection</h2>
          
          <p className="mb-4">
            Now, let&apos;s implement a system that handles coin collection. This system will:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Check the distance between the player and each coin</li>
            <li>Collect (despawn) coins when the player gets close enough</li>
            <li>Update the score when a coin is collected</li>
          </ol>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn coin_collection(
    mut commands: Commands,
    mut game_state: ResMut<GameState>,
    player_query: Query<&Transform, With<Player>>,
    coin_query: Query<(Entity, &Transform), With<Coin>>,
) {
    let player_transform = player_query.single();
    
    for (coin_entity, coin_transform) in coin_query.iter() {
        // Check distance between player and coin
        let distance = player_transform.translation.distance(coin_transform.translation);
        
        // If close enough, collect the coin
        if distance < 1.0 {
            commands.entity(coin_entity).despawn();
            game_state.score += 1;
            println!("Coin collected! Score: {}", game_state.score);
        }
    }
}`}</code>
          </pre>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">How It Works:</p>
            <p>
              This system queries for both the player transform and all coin entities with their transforms.
              It then calculates the distance between the player and each coin. If the distance is less than 1.0 unit
              (the player&apos;s diameter is 1.0, and we&apos;re measuring from center to center), 
              the coin is considered collected.
            </p>
          </div>
        </section>

        {/* Section 3: Breaking Down the Collection System */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Breaking Down the Collection System</h2>
          
          <p className="mb-4">
            Let&apos;s examine the components of our <code>coin_collection</code> system:
          </p>
          
          <div className="space-y-6">
            {/* System Parameters */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">System Parameters</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`fn coin_collection(
    mut commands: Commands,
    mut game_state: ResMut<GameState>,
    player_query: Query<&Transform, With<Player>>,
    coin_query: Query<(Entity, &Transform), With<Coin>>,
)`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>commands</strong> - Used to despawn coin entities</li>
                  <li><strong>game_state</strong> - Mutable access to update the score</li>
                  <li><strong>player_query</strong> - Query to get the player&apos;s position</li>
                  <li><strong>coin_query</strong> - Query to get all coins and their positions</li>
                </ul>
              </p>
            </div>
            
            {/* Distance Calculation */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Distance Calculation</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`let player_transform = player_query.single();

for (coin_entity, coin_transform) in coin_query.iter() {
    // Check distance between player and coin
    let distance = player_transform.translation.distance(coin_transform.translation);`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We get the player&apos;s transform and then iterate through all coins. For each coin, we calculate 
                the 3D distance between the player&apos;s position and the coin&apos;s position.
              </p>
            </div>
            
            {/* Collection Logic */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Collection Logic</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// If close enough, collect the coin
if distance < 1.0 {
    commands.entity(coin_entity).despawn();
    game_state.score += 1;
    println!("Coin collected! Score: {}", game_state.score);
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When the distance is less than 1.0 (collision detected), we:
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use commands to despawn the coin entity</li>
                  <li>Increment the score in the game state</li>
                  <li>Print a debug message (this will be replaced by UI updates)</li>
                </ul>
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Adjusting Collection Distance:</p>
            <p>
              The value <code>1.0</code> used for distance checking is based on our game&apos;s scale. If you find it 
              too easy or too hard to collect coins, you can adjust this value. Lower values make collection more precise, 
              while higher values make it more forgiving.
            </p>
          </div>
        </section>

        {/* Section 4: Enhancing the Coin Collection Experience */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Enhancing the Coin Collection Experience</h2>
          
          <p className="mb-4">
            Our basic coin collection system works, but we can enhance it with some additional features:
          </p>
          
          <div className="space-y-6">
            {/* Coin Rotation */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Coin Rotation Animation</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Add this component to coins
#[derive(Component)]
struct Rotating {
    speed: f32,
}

// In your spawn_coins function, add this component
commands.spawn((
    Coin,
    Rotating { speed: 2.0 },
    Mesh3d(coin_mesh.clone()),
    MeshMaterial3d(coin_material.clone()),
    Transform::from_translation(*position),
));

// Add this system to rotate the coins
fn rotate_coins(time: Res<Time>, mut query: Query<(&Rotating, &mut Transform)>) {
    for (rotating, mut transform) in query.iter_mut() {
        // Rotate around the Y axis
        transform.rotate_y(rotating.speed * time.delta_seconds());
    }
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This system adds a rotating animation to all coins, making them more visually interesting. 
                Remember to add <code>rotate_coins</code> to your <code>App</code> update systems.
              </p>
            </div>
            
            {/* Collection Effects */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Collection Sound or Visual Effect</h3>
              
              <p className="mb-2">
                You could also add sound effects or visual effects when collecting coins. Here&apos;s a simplified example:
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// In your setup function, load a sound asset
let coin_sound = asset_server.load("sounds/coin_collect.ogg");

// In your coin_collection system
if distance < 1.0 {
    commands.entity(coin_entity).despawn();
    game_state.score += 1;
    
    // Spawn a visual effect at the coin's position
    commands.spawn((
        Mesh3d(meshes.add(Sphere::new(0.2))),
        MeshMaterial3d(materials.add(Color::srgb(1.0, 1.0, 0.2))),
        Transform::from_translation(coin_transform.translation),
        CollectionEffect { timer: Timer::from_seconds(0.3, TimerMode::Once) },
    ));
    
    // Play a sound effect
    commands.spawn(AudioBundle {
        source: coin_sound.clone(),
        ..default()
    });
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a more advanced feature that would require additional components and systems, but 
                it shows how you could enhance the collection experience with visual and audio feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Respawning Coins */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Respawning Coins</h2>
          
          <p className="mb-4">
            To make our game more replayable, we might want to respawn coins after they&apos;ve all been collected.
            Here&apos;s a simple system to do that:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn check_respawn_coins(
    coin_query: Query<&Coin>,
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // If no coins are left, respawn them
    if coin_query.iter().count() == 0 {
        println!("Respawning coins!");
        spawn_coins(&mut commands, &mut meshes, &mut materials);
    }
}`}</code>
          </pre>
          
          <p className="mb-4">
            This system checks if there are any coins left in the world. If not, it calls our <code>spawn_coins</code> function
            to create a new set of coins.
          </p>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Adding a Delay:</p>
            <p>
              In a more complex game, you might want to add a delay before respawning coins, or create a level
              progression system where new coins appear in different patterns after each collection round.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            Now that we can collect coins and update our score, let&apos;s implement the UI to display the score
            to the player!
          </p>
          
          <div className="flex justify-between items-center mt-8">
            <Link href="/ball-game/movement" className="text-blue-500 hover:underline">
              ← Player Movement
            </Link>
            <Link href="/ball-game/ui" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              UI & Scoring →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}