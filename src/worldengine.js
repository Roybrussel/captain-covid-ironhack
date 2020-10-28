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
  element: document.body,
  engine: engine,
  options: {
    width: 1000,
    height: 500,
    wireframes: false,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);
const launchBtn = document.querySelector(".launch");
let launchText = document.querySelector(".launchText");
launchBtn.addEventListener("click", (event) => {
  // mainTheme.play();
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
  World.clear(world);
  Engine.clear(engine);
  Render.stop(render);
  if (enemiesRemaining <= 0) {
    alert(
      `PANDEMIC-FIGHTING SKILLS FOR THE WIN!!! You scored ${scoreCount} points!`
    );
  } else if (enemiesRemaining > 0) {
    if (scoreCount === 0) {
      alert(`GAME OVER! You didn't score any points? Fake news!`);
    }
    if (scoreCount > 0 && scoreCount < 100) {
      alert(
        `GAME OVER! Lockdown must be getting to your head. You only scored ${scoreCount} points!`
      );
    } else if (scoreCount > 100 && scoreCount < 200) {
      alert(
        `GAME OVER! Nice social distancing skills! You scored ${scoreCount} points!`
      );
    } else if (scoreCount > 200) {
      alert(
        `GAME OVER! Wow, your vaccine delivery skills are off the charts! You scored ${scoreCount} points!`
      );
    }
  }
  clearInterval(offScreenCheck);
}
