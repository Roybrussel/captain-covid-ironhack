//  LIVES
let numLives = 3;

// CREATE ENEMIES
const enemies = [];
function enemyStart() {
  for (let i = 0; i < numEnemies; i++) {
    oddEvenCounter++;
    enemies.push(
      Bodies.circle(playArea(), 0, sizeW / 40, {
        render: {
          sprite: {
            texture: "images/covid.png",
            xScale: 0.7,
            yScale: 0.7,
          },
        },
      })
    );
    enemiesRemaining = enemies.length;
  }
  enemyLaunch();
}

function enemyLaunch() {
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
}
