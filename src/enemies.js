//  LEVELS
let difficulty = 1;
let numLives = 3;
let interval, numEnemies, enemiesForce;

// LOW DIFFICULTY
if (difficulty === 1) {
  interval = 1500;
  numEnemies = 50;
  enemiesForce = 0.0009;
}
// MEDIUM DIFFICULTY
else if (difficulty === 2) {
  interval = 1000;
  numEnemies = 100;
  enemiesForce = 0.0011;

  // HIGH DIFFICULTY
} else if (difficulty === 3) {
  interval = 750;
  numEnemies = 150;
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
          texture: "images/covid.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    })
  );
}
let enemiesRemaining = enemies.length;

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
