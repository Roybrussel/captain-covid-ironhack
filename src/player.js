// PLAYER: Create new player and add to environment

const playerBody = Bodies.circle(sizeW / 2, sizeH - 80, sizeW / 30, {
    render: {
        sprite: {
            texture: "images/player.png",
            xScale: 0.15,
            yScale: 0.15,
        },
    },
});
playerBody.frictionAir = 0;
playerBody.friction = 0;
World.add(world, playerBody);

// PLAYER MOVEMENT
let xMove = sizeW / 100;
document.addEventListener("keydown", (event) => {
    let { x, y } = playerBody.velocity;
    if (event.code === "ArrowLeft") {
        Body.setVelocity(playerBody, { x: x - xMove, y: 0 });
    } else if (event.code === "ArrowRight") {
        Body.setVelocity(playerBody, { x: x + xMove, y: 0 });
    } else if (event.code === "Space") {
        event.preventDefault();
        laserShot.play();
        let ammo = Bodies.circle(
            playerBody.position.x,
            playerBody.position.y - 50,
            sizeW / 120, {
                render: {
                    sprite: {
                        texture: "images/bullet.png",
                        xScale: 0.05,
                        yScale: 0.05,
                    },
                },
            }
        );
        ammo.frictionAir = 0;
        Body.setVelocity(ammo, { x: 0, y: -(sizeH / 40) });
        World.add(world, ammo);
    }
});
document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        Body.setVelocity(playerBody, { x: 0, y: 0 });
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
        let insertedCheatcode = prompt("Please enter cheatcode");
        if (insertedCheatcode === "donald") {
            djTrump.play();
            playerBody.render.sprite.texture = "images/trump.png";
            playerBody.render.sprite.xScale = 0.1;
            playerBody.render.sprite.yScale = 0.1;
            laserShot = new Audio("sound/bing.mp3");
        }
    }
});