console.log("animations loaded");

var animations = {
  currentFrame: 0,

  update: function (frames, player) {


    document.addEventListener("keydown", function(event) {
			animations.down[event.keyCode] = true;
		});

		document.addEventListener("keyup", function(event) {
			delete animations.down[event.keyCode];
			delete animations.pressed[event.keyCode];
		});


    if (player.vel.y === 0 && !animations.isDown(39)) {
      if (player.size === "small") {
        player.s = player.stand;
      } else if (player.size === "big") {
        player.s = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 32,
        sourceHeight: 64,
        desX: player.pos.x,
        desY: player.pos.y,
        desWidth: 32,
        desHeight: 64
      }
      }
    } else if (player.vel.y > 1) {
      if (player.size === "small") {
        player.s = animations.jumping;
      } else if (player.size === "big") {
        player.s = animations.bigJumping
      }
    }

    if (animations.isDown(39)) {
      if (player.vel.y !== 0) {
        if (player.size === "small") {
          player.s = animations.jumping;
        } else if (player.size === "big") {
          player.s = animations.bigJumping;
        }
        player.pos.x += player.vel.x;
      } else {
        player.pos.x += player.vel.x;
        if (frames % 5 === 0) {
          if (player.size === "small") {
            player.s = animations.movement[animations.currentFrame];
            animations.currentFrame++;
          } else if (player.size === "big") {
            player.s = animations.bigMovement[animations.currentFrame];
            animations.currentFrame++;
          }
          if (animations.currentFrame > 2) {
            animations.currentFrame = 0;
          }
        }
      }
  }

  if (animations.isDown(37)) {
    if (player.vel.y !== 0) {
      player.s = animations.jumping;
      player.pos.x -= player.vel.x;
    } else {
      player.pos.x -= player.vel.x;
      if (frames % 5 === 0) {
        player.s = animations.movement[animations.currentFrame];
        animations.currentFrame++;
        if (animations.currentFrame > 2) {
          animations.currentFrame = 0;
        }
      }
    }
}

  if (animations.isDown(38)) {
      if (player.vel.y === 0) {
        if (player.size === "small") {
          player.s = animations.jumping;
        } else if (player.size === "big") {
          player.s = animations.bigJumping;
          console.log(player.s);
        }
        player.vel.y -= 12;
    }
  }

},

movement: undefined,

  walk: function (main) {
    return [walk = {
      sourceX: 68,
      sourceY: 88,
      sourceWidth: 24,
      sourceHeight: 30,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 24,
      desHeight: 30
    },

    two = {
      sourceX: 98,
      sourceY: 86,
      sourceWidth: 22,
      sourceHeight: 32,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 22,
      desHeight: 32
    },

    three = {
      sourceX: 126,
      sourceY: 86,
      sourceWidth: 30,
      sourceHeight: 32,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 30,
      desHeight: 32
    }
  ];
  },

  jumping: undefined,

  jumpingDefined: function (main) {
    return jump = {
      sourceX: 194,
      sourceY: 86,
      sourceWidth: 32,
      sourceHeight: 32,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 32,
      desHeight: 32
    }
  },

  bigJumping: undefined,

  bigJumpingDefined: function (main) {
    return {
      sourceX: 222,
      sourceY: 2,
      sourceWidth: 32,
      sourceHeight: 64,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 32,
      desHeight: 64
    }
  },

  marioGrowing: undefined,

  marioGrowingDefined: function (main) {
    return [grow = {
      sourceX: 38,
      sourceY: 86,
      sourceWidth: 24,
      sourceHeight: 32,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 24,
      desHeight: 32
    },
    grow2 = {
      sourceX: 456,
      sourceY: 90,
      sourceWidth: 28,
      sourceHeight: 28,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 28,
      desHeight: 28
    },
    grow3 = {
      sourceX: 76,
      sourceY: 4,
      sourceWidth: 32,
      sourceHeight: 60,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 32,
      desHeight: 60
    }];
  },

  bigMovement: undefined,

  bigMovementDefined: function(main) {
    return [{
      sourceX: 76,
      sourceY: 4,
      sourceWidth: 32,
      sourceHeight: 60,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 32,
      desHeight: 60
    },
    {
      sourceX: 116,
      sourceY: 2,
      sourceWidth: 28,
      sourceHeight: 62,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 28,
      desHeight: 62
    },
    {
      sourceX: 146,
      sourceY: 0,
      sourceWidth: 32,
      sourceHeight: 64,
      desX: main.pos.x,
      desY: main.pos.y,
      desWidth: 32,
      desHeight: 64
    }];
  },


  isDown: function (code) {
    return animations.down[code];
  },

  isPressed: function (code) {
    if (animations.pressed[code]) {
      return false
    } else if (animations.down[code]) {
      animations.down[code] = true;
    }

    return false;
  },

  pressed: {},
  down: {}
}
