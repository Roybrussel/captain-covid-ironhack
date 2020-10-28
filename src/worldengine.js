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
let sizeW = render.options.width;
let sizeH = render.options.height;
let playArea = () => {
    let rand = Math.random();
    return oddEvenCounter % 2 === 0 ?
        sizeW / 10 + rand * (sizeW / 2) :
        sizeW / 2 + rand * (sizeW / 2) - sizeW / 10;
};

// WALLS
const walls = [
    Bodies.rectangle(-250, sizeH / 2, 500, sizeH * 2, {
        isStatic: true,
    }),
    Bodies.rectangle(sizeW + 250, sizeH / 2, 500, sizeH * 2, {
        isStatic: true,
    }),
    Bodies.rectangle(sizeW / 2, sizeH + 250, sizeW, 500),
    {
        isStatic: true,
    },
];
World.add(world, walls);

// Initialize enemies;
let enemies = [];
let enemiesRemaining;
let oddEvenCounter = 0;
let difficulty


// LAUNCH BUTTON FUNCTIONS
let launchBtn = document.querySelector(".launch");
let launchBtnIcon = document.getElementsByClassName("rocket-icon");
let launchBtnText = document.querySelector(".launchText");

launchBtn.addEventListener("click", (event) => {
    if (document.getElementById("dlevel").value == 1) { difficulty = 1 } else if (
        document.getElementById("dlevel").value == 2
    ) { difficulty = 2 } else { difficulty = 3 }
    enemyBuilder();

});

// STOP WORLD ON DEATH
function stopWorld() {
    World.clear(world);
    Engine.clear(engine);
    Render.stop(render);
    // IF PLAYER REACHED END OF GAME
    if (enemiesRemaining <= 0) {
        if (scoreCount === 0) {
            alert(
                `YOU'VE BEEN WORKING FROM HOME TOO LONG! You made it to the end but didn't score any points!`
            );
        } else if (scoreCount > 0 && scoreCount < 200) {
            alert(`YOU MADE IT TO THE END!!! You scored ${scoreCount} points!`);
        } else if (scoreCount > 200) {
            alert(
                `PANDEMIC-FIGHTING SKILLS FOR THE WIN!!! You scored ${scoreCount} points!`
            );
        }

        // IF PLAYER DID NOT REACH END OF GAME
    } else if (enemiesRemaining > 0) {
        if (scoreCount === 0) {
            alert(`GAME OVER! You didn't score any points? Fake news!`);
        } else if (scoreCount > 0 && scoreCount < 100) {
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
}