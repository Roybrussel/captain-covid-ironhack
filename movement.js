// PLAYER MOVEMENT
let xMove = sizeW / 60;
document.addEventListener("keydown", (event) => {
  const { x, y } = playerBody.velocity;
  if (event.code === "ArrowLeft") {
    Body.setVelocity(playerBody, { x: x - xMove, y: 0 });
  } else if (event.code === "ArrowRight") {
    Body.setVelocity(playerBody, { x: x + xMove, y: 0 });
  } else if (event.code === "Space") {
    let ammo = Bodies.circle(
      playerBody.position.x,
      playerBody.position.y - 110,
      sizeW / 120
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
