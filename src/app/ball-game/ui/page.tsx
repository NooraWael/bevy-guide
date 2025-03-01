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
                update_score_text
            )
        )
        .run();
}`}</code>
          </pre>
          
          <p className="mb-4">
            Notice that we&apos;ve added <code>update_score_text</code> to the <code>Update</code> schedule alongside
            our other systems. This ensures the score text is updated every frame.
          </p>
        </section>

        {/* Section 5: Enhancing the UI */}
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Enhancing the UI</h2>
          
          <p className="mb-4">
            Our basic score display works, but we can enhance it to make it more appealing:
          </p>
          
          <div className="space-y-6">
            {/* Styling the Text */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Styling the Text</h3>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Update the score text command in setup
commands.spawn((
    Text::new("Score: 0"),
    TextFont {
        font: asset_server.load("fonts/FiraSans-Bold.ttf"),
        font_size: 30.0,
        ..default()
    },
    TextStyle {
        color: Color::srgb(1.0, 0.9, 0.0),  // Gold color
        ..default()
    },
    TextShadow {
        color: Color::srgb(0.0, 0.0, 0.0),  // Black shadow
        offset: Vec2::new(1.0, 1.0),        // Shadow offset
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
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This adds styling to make the text gold with a black shadow, making it more visible and thematic
                for a coin collection game.
              </p>
            </div>
            
            {/* Score Animation */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Score Change Animation</h3>
              
              <p className="mb-2">
                We can animate the score text when it changes to provide visual feedback:
              </p>
              
              <pre className="bg-gray-900 text-gray-100 rounded-md p-3 mb-2 overflow-x-auto">
                <code>{`// Add a new component to track score changes
#[derive(Component)]
struct ScoreAnimation {
    timer: Timer,
    scale: f32,
}

// Modify the update_score_text system
fn update_score_text(
    game_state: Res<GameState>, 
    mut query: Query<(&mut Text, &mut ScoreAnimation), With<ScoreText>>
) {
    if let Ok((mut text, mut animation)) = query.get_single_mut() {
        // Update the text
        **text = format!("Score: {}", game_state.score);
        
        // Start animation when score changes
        animation.scale = 1.5;  // Enlarged scale
        animation.timer.reset();
    }
}

// Add a system to animate the score text
fn animate_score_text(
    time: Res<Time>,
    mut query: Query<(&mut Node, &mut ScoreAnimation)>,
) {
    for (mut node, mut animation) in query.iter_mut() {
        animation.timer.tick(time.delta());
        
        // Gradually reduce scale back to normal
        if animation.scale > 1.0 {
            animation.scale = 1.0 + 
                (1.5 - 1.0) * (1.0 - animation.timer.percent());
            
            // Apply the scale to the node
            node.scale = Vec2::splat(animation.scale);
        }
    }
}`}</code>
              </pre>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a more advanced feature that would make the score text briefly enlarge when it changes,
                then smoothly return to normal size.
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
          </ol>
          
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 dark:bg-green-900 dark:text-green-200">
            <p className="font-bold">Congratulations!</p>
            <p>
              You&apos;ve successfully created a complete 3D ball game with Bevy! This game includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>A 3D arena with walls</li>
              <li>Player-controlled ball with movement and jumping</li>
              <li>Collectible coins</li>
              <li>UI for score tracking</li>
            </ul>
            <p className="mt-2">
              These fundamentals can be expanded to create more complex games and experiences.
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