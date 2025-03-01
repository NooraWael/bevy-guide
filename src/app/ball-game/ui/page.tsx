'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BallGameUI() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/ball-game" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Ball Game
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">UI and Scoring in the Ball Game</h1>
      
      <p className="mb-4">
        Our ball game already tracks the player&apos;s score when they collect coins, but the player can only see this in 
        console output. Let&apos;s implement a proper UI to display the score and make our game feel complete.
      </p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-6">
        <Image
          src="/collectibles.png"
          alt="Ball Game UI"
          width={600}
          height={400}
          className="mx-auto border border-gray-400 dark:border-gray-600"
        />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Our ball game with UI showing the player&apos;s score
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: UI Components in Bevy */}
        <section>
          <h2 className="text-2xl font-bold mb-4">1. UI Components in Bevy</h2>
          
          <p className="mb-4">
            Bevy provides a built-in UI system that makes it easy to create and manage user interfaces.
            The UI is built on entities with special UI components. For our game, we&apos;ll use the following:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Text</strong> - Displays text like our score</li>
            <li><strong>TextFont</strong> - Specifies the font and size</li>
            <li><strong>Node</strong> - Defines the position and layout</li>
          </ul>
          
          <p className="mb-4">
            Let&apos;s first review the UI-related components we&apos;ve already defined:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// Mark our score text entity
#[derive(Component)]
struct ScoreText;

// Resource to track the game state
#[derive(Resource)]
struct GameState {
    score: u32,
}`}</code>
          </pre>
        </section>

        {/* Section 2: Creating the UI in Setup */}
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Setting Up the UI</h2>
          
          <p className="mb-4">
            In our <code>setup</code> function, we&apos;ve already added code to initialize the UI:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`// In the setup function

// Initialize game state
commands.insert_resource(GameState { score: 0 });

// ... (rest of setup code)

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
));`}</code>
          </pre>
          
          <p className="mb-4">
            This creates a text entity with:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Initial text content &quot;Score: 0&quot;</li>
            <li>The FiraSans-Bold font at 30px size</li>
            <li>Absolute positioning at the top-left corner of the screen</li>
            <li>The <code>ScoreText</code> component so we can identify it later</li>
          </ul>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Font File:</p>
            <p>
              Don&apos;t forget to place the <code>FiraSans-Bold.ttf</code> (or any other font) file in the 
              <code>assets/fonts/</code> directory. Bevy will look for assets relative to your project&apos;s root directory.
            </p>
          </div>
        </section>

        {/* Section 3: Updating the Score Text */}
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Updating the Score Text</h2>
          
          <p className="mb-4">
            Now we need a system that updates the text UI whenever the score changes. Here&apos;s the system:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn update_score_text(
    game_state: Res<GameState>, 
    mut query: Query<&mut Text, With<ScoreText>>
) {
    if let Ok(mut text) = query.get_single_mut() {
        **text = format!("Score: {}", game_state.score);
    }
}`}</code>
          </pre>
          
          <p className="mb-4">
            This system:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Accesses the <code>GameState</code> resource to read the current score</li>
            <li>Queries for any <code>Text</code> component that belongs to an entity with the <code>ScoreText</code> component</li>
            <li>Updates the text content to reflect the current score</li>
          </ol>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Understanding the Syntax:</p>
            <p>
              <code>**text = format!(&quot;Score: {}&quot;, game_state.score)</code> might look unusual. 
              In Bevy, the <code>Text</code> type is an alias for <code>String</code>, but it&apos;s wrapped in a smart pointer. 
              The <code>**</code> is used to dereference it twice to replace its contents.
            </p>
          </div>
        </section>

        {/* Section 4: Adding the System to the App */}
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Adding the UI System to the App</h2>
          
          <p className="mb-4">
            We need to make sure our <code>update_score_text</code> system is added to the app. Here&apos;s what our
            <code>main</code> function should look like:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(
            Update, 
            (
                player_movement, 
                coin_collection, 
                update_score_text,
                check_respawn_coins
            )
        )
        .run();
}`}</code>
          </pre>
          
          <p className="mb-4">
            Notice that we&apos;ve added <code>update_score_text</code> to the <code>Update</code> schedule alongside
            our other systems. This ensures the score text is updated every frame. We also added the <code>check_respawn_coins</code>
            system to respawn coins when they&apos;re all collected.
          </p>
        </section>

        {/* Section 5: Enhancing the UI */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Enhancing </h2>
          
          <p className="mb-4">
            Our basic score display works, let us add some polishes to the game 
          </p>
          
          <div className="space-y-6">
         

            {/* Coin Respawning */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Coin Respawning</h3>
              
              <p className="mb-2">
                Let&apos;s implement a system to respawn all coins once they&apos;ve been collected:
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
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
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This system checks if there are any coins left in the world. If not, it calls our <code>spawn_coins</code> function
                to create a new set of coins, allowing the player to continue playing.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4 mb-4 dark:bg-yellow-900 dark:text-yellow-200">
            <p className="font-bold">Further UI Enhancements:</p>
            <p>
              For a more polished game, you might want to add:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A game title</li>
              <li>A timer or countdown</li>
              <li>A game over screen when a certain score is reached</li>
              <li>A pause menu</li>
              <li>Instructions for controls</li>
            </ul>
            <p className="mt-2">
              These would follow similar patterns to what we&apos;ve shown, but with more UI elements and states.
            </p>
          </div>
        </section>

        {/* Section 6: Testing the Complete Game */}
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Testing the Complete Game</h2>
          
          <p className="mb-4">
            Now that we&apos;ve implemented all the components of our ball game, let&apos;s test the entire experience:
          </p>
          
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Run the game with <code>cargo run</code></li>
            <li>Use WASD to move the ball around the arena</li>
            <li>Press spacebar to jump</li>
            <li>Collect the coins by moving the ball over them</li>
            <li>Watch the score update in the UI as you collect coins</li>
            <li>After collecting all coins, watch them respawn for continued play</li>
          </ol>
          
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 dark:bg-green-900 dark:text-green-200">
            <p className="font-bold">Congratulations!</p>
            <p>
              You&apos;ve successfully created a complete 3D ball game with Bevy! This game includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A 3D arena with walls</li>
              <li>Player-controlled ball with movement and jumping</li>
              <li>Collectible coins that respawn when all are collected</li>
              <li>UI for score tracking</li>
            </ul>
            <p className="mt-2">
              These fundamentals can be expanded to create more complex games and experiences.
            </p>
          </div>
        </section>

        {/* Section 7: Full Game Code */}
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Full Game Code</h2>
          
          <p className="mb-4">
            Here&apos;s the complete code for our ball game, including all the features we&apos;ve implemented:
          </p>
          
          <pre className="bg-gray-900 text-gray-100 rounded-md p-4 mb-4 overflow-x-auto">
            <code>{`use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(
            Update, 
            (
                player_movement, 
                coin_collection, 
                update_score_text,
                check_respawn_coins
            )
        )
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

// Set up the game arena, player, lights, camera, and UI
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
}

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
}

fn player_movement(
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
}

fn coin_collection(
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
}

fn update_score_text(
    game_state: Res<GameState>, 
    mut query: Query<&mut Text, With<ScoreText>>
) {
    if let Ok(mut text) = query.get_single_mut() {
        **text = format!("Score: {}", game_state.score);
    }
}

fn check_respawn_coins(
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
          
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
            <p className="font-bold">Adding More Features:</p>
            <p>
              This code provides a complete game with all the features we&apos;ve discussed. You can use it as a foundation
              to build more complex games by adding new features, mechanics, and polish.
            </p>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          
          <p className="mb-4">
            Now that you&apos;ve built a complete game, consider these next steps to expand your Bevy knowledge:
          </p>
          
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Add audio with Bevy&apos;s audio system</li>
            <li>Implement game states (menu, playing, game over)</li>
            <li>Create levels with different layouts</li>
            <li>Add enemies or obstacles</li>
            <li>Implement a timer or countdown</li>
            <li>Add particle effects for collecting coins</li>
          </ul>
          
          <p className="mb-6">
            You now have the foundation to explore and build more advanced games with Bevy!
          </p>
          
          <div className="flex justify-between items-center">
            <Link href="/ball-game/collectibles" className="text-blue-500 hover:underline">
              ← Collectibles
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}