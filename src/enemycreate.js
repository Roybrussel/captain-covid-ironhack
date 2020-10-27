//  LEVEL
//  LEVEL 1
let numLives = 3;
let interval = 1500;
let difficulty = 1;
let numEnemies = 75;
let enemiesForce = 0.0009;
// HIGHER DIFFICULTIES
if (difficulty === 2) {
  interval = 1000;
  numEnemies = 125;
  enemiesForce = 0.0011;
} else if (difficulty === 3) {
  interval = 750;
  numEnemies = 200;
  enemiesForce = 0.0013;
}

// CREATE ENEMIES
const enemies = [];
for (let i = 0; i < numEnemies; i++) {
  oddEvenCounter++;
  enemies.push(
    Bodies.circle(playArea(), 0, sizeW / 40, {
      render: {
        sprite: {
          texture: "/images/covid.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    })
  );
}

// ADD ENEMIES TO WORLD AND LAUNCH ATTACK
enemies.forEach((enemy, index) => {
  enemy.frictionAir = 0;
  setTimeout(() => {
    World.add(world, enemy);
    Body.applyForce(
      enemy,
      { x: enemy.position.x, y: enemy.position.y },
      { x: 0, y: (sizeW / 100) * enemiesForce }
    );
  }, index * interval);
});

// STOP WORLD ON DEATH

// event.preventDefault();
// World.clear(world);
// Engine.clear(engine);
// Render.stop(render);
// Runner.stop(runner);
// render.canvas.remove();
// render.canvas = null;
// render.context = null;
// render.textures = {};
// console.log("reset clicked");
// document.querySelector(".winner").classList.add("hidden");
// document.querySelector(".options").classList.remove("hidden");
