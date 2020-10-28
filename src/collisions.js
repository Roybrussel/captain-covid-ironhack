// MUSIC FILES
var mainTheme = new Audio("sound/captaincovidtheme.mp3");
var levelUpSound = new Audio("sound/levelup.mp3");
var gameOverSound = new Audio("sound/gameover.mp3");

// SCORE COUNT
let scoreCount = 0;
let showHighscore = document.getElementsByClassName("highscore");

// LIVES
let life3 = document.getElementsByClassName("life3");
let life2 = document.getElementsByClassName("life2");
let life1 = document.getElementsByClassName("life1");

// START OF COLLISION:
// COLLISION OF SHIP (ID 3) WITH VIRUS (ID > 3)
Events.on(engine, "collisionStart", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 4 && bodyB.id > 4) {
      playerBody.isStatic = true;
      World.remove(world, bodyB);
      enemiesRemaining--;
    } else if (bodyA.id > 4 && bodyB.id > 4) {
      // COLLISION NEEDLE & VIRUS
      World.remove(world, bodyA);
      World.remove(world, bodyB);
      scoreCount += 5;
      showHighscore[0].innerHTML = scoreCount;
      enemiesRemaining--;
      if (enemiesRemaining <= 0) {
        stopWorld();
      }
      // COLLISION VIRUS & FLOOR
    } else if (bodyA.id === 3 && bodyB.id > 4) {
      World.remove(world, bodyB);
      enemiesRemaining--;
      if (scoreCount > 0) {
        scoreCount -= 5;
        showHighscore[0].innerHTML = scoreCount;
      } else if (enemiesRemaining <= 0) {
        stopWorld();
      }
    }
  });
});

// END OF COLLISION
// COLLISION OF SHIP (ID 3) WITH VIRUS (ID > 3)
Events.on(engine, "collisionEnd", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 4 && bodyB.id > 4) {
      Body.setPosition(playerBody, { x: sizeW / 2, y: sizeH - 80 });
      Body.setVelocity(playerBody, { x: 0, y: 0 });
      playerBody.isStatic = false;
      numLives--;
      if (numLives === 2) {
        life3[0].classList = "far fa-star life3";
      }
      if (numLives === 1) {
        life2[0].classList = "far fa-star life2";
      }
      if (numLives === 0) {
        mainTheme.pause();
        gameOverSound.play();
        life1[0].classList = "far fa-star life1";
        launchBtnIcon[0].classList = "fas fa-skull rocket-icon";
        launchBtnText.innerText = "RETRY";
        stopWorld();
      }
    }
  });
});
