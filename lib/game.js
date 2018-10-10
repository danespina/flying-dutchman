const Ghost = require("./ghost");
const Player = require("./player");
const Util = require("./util");

class Game {
  constructor() {
    this.ghosts = [];
    this.players = [];

    this.addGhost();
  }

  add(object) {
    if (object instanceof Ghost) {
      this.ghosts.push(object);
    } else if (object instanceof Player) {
      this.players.push(object);
    } else {
      throw new Error("unknown type!");
    }
  }

  addGhost() {
    this.add(new Ghost({ game: this }));
  }

  addPlayer() {
    const player = new Player({
      pos: Game.playerStart,
      game: this
    });

    this.add(ship);
    return ship;
  }

  allObjects() {
    return [].concat(this.players, this.ghosts);
  }

  checkCollisions() {
    const player = this.players[0];
    const allGhosts = this.ghosts;
    for (let i = 0; i < allGhosts.length; i++) {
      const ghost = allGhosts[i];
      if (ghost.isCollidedWith(player)) {
        const collision = ghost.collideWith(player);
        if (collision) return;
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  isOutOfBounds(pos) {
    return(pos[0] < 0 || pos[0] > Game.DIM_X);
  }

  remove(object) {
    if (object instanceof Ghost) {
      this.ghosts.splice(this.ghosts.indexOf(object), 1);
    } else if (object instanceof Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else {
      throw new Error("unknown type!");
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }
}

Game.DIM_X = 900;
Game.DIM_Y = 320;
Game.FPS = 30;
Game.MAX_GHOSTS = 5;

module.exports = Game;
