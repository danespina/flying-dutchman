const MovingObject = require("./moving_object");
const Util = require("./util");

class Player extends MovingObject {
  constructor(options) {
    options.radius = Player.Radius;
    options.vel = options.vel || [0,0];
    super(options);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  draw(ctx) {

  }
}

Player.Radius = 25;

module.exports = Player;
