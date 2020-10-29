// ENVIRONMENT
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Detector,
  Events,
} = Matter;
const engine = Engine.create();
engine.world.gravity.y = 0;
Body.frictionStatic = 0;
const { world } = engine;
const render = Render.create({
  canvas: document.querySelector("#canvas-area"),
  // element: document.body,
  engine: engine,
  options: {
    width: 1000,
    height: 500,
    wireframes: false,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// MUTE BUTTON
const muteBtn = document.querySelector(".volume-icon");
const volumeIcon = document.getElementsByClassName("volume-icon");
const muteIcon = document.getElementsByClassName("mute-icon");
let muted = false;
muteBtn.addEventListener("click", (event) => {
  if (muted === false) {
    mainTheme.pause();
    muted = true;
    volumeIcon[0].classList.remove = "fas fa-volume-up volume-icon";
    volumeIcon[0].classList.add = "fas fa-volume-mute mute-icon";
  } else {
    mainTheme.play();
    muted = false;
    muteIcon[0].classList = "fas fa-volume-up volume-icon";
  }
});

const launchBtn = document.querySelector(".launch");
let launchText = document.querySelector(".launchText");
let difficulty, interval, numEnemies, enemiesForce, enemiesRemaining;
let launchClicked = false;

launchBtn.addEventListener("click", (event) => {
  if (launchClicked === false) {
    launchClicked = true;
    mainTheme.play();
    difficulty = document.getElementById("dlevel").value;
    if (difficulty == 1) {
      interval = 1500;
      numEnemies = 50;
      enemiesForce = 0.0009;
    } else if (difficulty == 2) {
      interval = 900;
      numEnemies = 75;
      enemiesForce = 0.0013;
    } else if (difficulty == 3) {
      interval = 750;
      numEnemies = 100;
      enemiesForce = 0.0015;
    }
    document.querySelector(".level").style.visibility = "hidden";
    document.querySelector(".story").style.visibility = "hidden";
    launchText.innerText = "RESET";
    enemyStart();
  } else {
    window.location.reload();
  }
});
let sizeW = render.options.width;
let sizeH = render.options.height;
let oddEvenCounter = 0;
let playArea = () => {
  let rand = Math.random();
  return oddEvenCounter % 2 === 0
    ? sizeW / 10 + rand * (sizeW / 2)
    : sizeW / 2 + rand * (sizeW / 2) - sizeW / 10;
};

// WALLS
const walls = [
  Bodies.rectangle(-250, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
  Bodies.rectangle(sizeW + 250, sizeH / 2, 500, sizeH * 2, {
    isStatic: true,
  }),
];
World.add(world, walls);

// STOP WORLD ON DEATH
let offScreenCheck = 0;
function stopWorld() {
  clearInterval(offScreenCheck);
  World.clear(world);
  Engine.clear(engine);
  Render.stop(render);
  // PLAYER REACHED END OF GAME
  if (enemiesRemaining <= 0) {
    mainTheme.pause();
    levelUpSound.play();
  }
  setTimeout(() => {
    if (enemiesRemaining === 0) {
      if (scoreCount === 0) {
        alert(
          `CAPTAIN, YOU'VE BEEN WORKING FROM HOME TOO LONG! You made it to the end but didn't score any points!`
        );
      } else if (scoreCount > 0 && scoreCount < 200) {
        alert(
          `CAPTAIN, YOU'VE MADE IT TO THE END AND HAVE HELPED HUMANITY'S FIGHT AGAINST THE VIRUS!!! You scored ${scoreCount} points!`
        );
      } else if (scoreCount > 200) {
        alert(
          `PANDEMIC-FIGHTING SKILLS FOR THE WIN, CAPTAIN!!! You scored ${scoreCount} points!`
        );
      }
    } else if (enemiesRemaining > 0) {
      if (scoreCount === 0) {
        alert(
          `GAME OVER! Captain, you didn't score any points? Must be fake news!`
        );
      } else if (scoreCount > 0 && scoreCount < 100) {
        alert(
          `GAME OVER! Captain, lockdown must be getting to your head. You only scored ${scoreCount} points!`
        );
      } else if (scoreCount > 100 && scoreCount < 200) {
        alert(
          `GAME OVER! Nice social distancing skills, Captain! You scored ${scoreCount} points!`
        );
      } else if (scoreCount > 200) {
        alert(
          `GAME OVER! Wow, Captain, your vaccine delivery skills are off the charts! You scored ${scoreCount} points!`
        );
      }
    }
  }, 1200);
}
