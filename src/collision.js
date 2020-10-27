// OFF-SCREEN DETECTION & DELETION
const isOffScreen = function () {
  let offScreenCheck = setInterval(() => {
    if (world.bodies.length === 3) {
      clearInterval(offScreenCheck);
    }
    for (i = 3; i < world.bodies.length; i++) {
      if (world.bodies[i].position.y > sizeH) {
        World.remove(world, world.bodies[i]);
        if (scoreCount > 0) {
          scoreCount -= 5;
          showHighscore[0].innerHTML = scoreCount;
        }
      }  else if (world.bodies[i].position.y < -200) {
        World.remove(world, world.bodies[i]);
      }
    }
  }, 1000);
};
isOffScreen();

// SCORE COUNT
let scoreCount = 0;
let showHighscore = document.getElementsByClassName("highscore");

// COLLISION LASER <-> VIRUS DETECTION
Events.on(engine, "collisionStart", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 3 && bodyB.id > 3) {
      playerBody.isStatic = true;
      World.remove(world, bodyB);
    } else if (bodyA.id > 3 && bodyB.id > 3) {
      World.remove(world, bodyA);
      World.remove(world, bodyB);
      scoreCount += 5;
      showHighscore[0].innerHTML = scoreCount;
    }
  });
});

// LIVES
let life3 = document.getElementsByClassName("life3");
let life2 = document.getElementsByClassName("life2");
let life1 = document.getElementsByClassName("life1");

// LAUNCH BUTTON
let launchBtnIcon = document.getElementsByClassName("rocket-icon");
let launchBtnText = document.querySelector(".launchText")

// COLLISION PLAYER <-> VIRUS DETECTION
Events.on(engine, "collisionEnd", ({ pairs }) => {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.id === 3 && bodyB.id > 3) {
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
        life1[0].classList = "far fa-star life1";
        launchBtnIcon[0].classList = "fas fa-skull rocket-icon";
        launchBtnText.innerText = "RETRY";
      }
    }
  });
});
