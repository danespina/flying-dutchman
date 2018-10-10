const Util = require("./util");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  RADIUS = 25,
}

class Ghost extends MovingObject {
  constructor(options = {}) {
    options.pos = options.pos || options.game.ghostStart();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || [5, 0];
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Player) {
      this.remove();
      otherObject.remove();
      return true;
    }
    return false;
  }
}

module.exports = Ghost;
