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
      player.s = player.stand;
    } else if (player.vel.y > 1) {
      player.s = animations.jumping;
    }

    if (animations.isDown(39)) {
      if (player.vel.y !== 0) {
        player.s = animations.jumping;
        player.pos.x += player.vel.x;
      } else {
        player.pos.x += player.vel.x;
        if (frames % 5 === 0) {
          player.s = animations.movement[animations.currentFrame];
          animations.currentFrame++;
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
    if (frames % 5 === 0) {
      if (player.vel.y === 0) {
        player.s = animations.jumping;
        player.vel.y -= 12;
      }
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
  down: {},
}
