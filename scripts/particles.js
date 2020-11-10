const { fill, rect } = require("./toolbox.js");

export let particles = [];

export function removeDeadParticles() {}

class partice {
  lifetime;
  xVelocity;
  yVelocity;
  color;
  alive = true;
  lifetimeCounter = 0;
  x;
  y;
  constructor(
    spawnx,
    spawny,
    minlifetime,
    maxlifetime,
    xVelocity,
    yVelocity,
    color
  ) {
    this.x = spawnx;
    this.y = spawny;
    this.lifetime = Math.round(Math.random() * maxlifetime) + minlifetime;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.color = color;
  }
  render() {
    fill(this.color);
    rect(this.x, this.y, 5, 5);
  }
  update() {
    this.lifetimeCounter++;
    if (this.lifetimeCounter > this.lifetime) {
      this.alive = false;
    }
    this.x += this.xVelocity;
  }
}
