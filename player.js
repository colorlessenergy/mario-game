console.log("player.js logo");

var canvas = document.getElementById("goomba");
var wallArray = [];

canvas.width = 500;
canvas.height = 300;

var goomba = new Image();
var tiles = new Image();

tiles.src = "images/tile.png"
goomba.src = "images/sheet.png";

var tickCount = 0;

var map =
[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class Player {

  constructor(canvas, sprite, tile, animations) {
    this.vel = {
      x: 3.8,
      y: 0
    },
    this.pos = {
      x: 0,
      y: 0
    }
    this.parent = this;
    this.canvas = canvas;
    this.tile = tile;
    this.sprite = sprite;
    this.context = canvas.getContext("2d");
    this.animations = animations;
    this.stand = {
      sourceX: 38,
      sourceY: 86,
      sourceWidth: 24,
      sourceHeight: 32,
      desX: this.pos.x,
      desY: this.pos.y,
      desWidth: 24,
      desHeight: 32
    };

    this.jumps = {
      sourceX: 194,
      sourceY: 86,
      sourceWidth: 32,
      sourceHeight: 32,
      desX: this.pos.x,
      desY: this.pos.y,
      desWidth: 32,
      desHeight: 32
    }
    this.s = this.jumps;
  }

  gameLoop() {
    var main = player.parent;
    main.context.setTransform(1,0,0,1,0,0);
    main.context.clearRect(0, 0, canvas.width, canvas.height);
    // change value of camx till it looks good

    var camX = main.clamp(-main.pos.x + canvas.width / 130, -1000, 1000 - canvas.width);
    var camY = main.clamp(-main.pos.y + canvas.height/2, 0, 0);
    main.context.translate( camX, camY );


    main.context.fillStyle = "#87ceeb";
    main.context.fillRect(0, 0, canvas.width, canvas.height - 32);
    main.drawTile();


    window.requestAnimationFrame(player.gameLoop);
    tickCount++;
    animations.update(tickCount, main);
    player.gravity();
    player.collision();
    player.render(player.s);
  }

  render(pos) {
    this.context.drawImage(
      this.sprite,
      pos.sourceX || 194,
      pos.sourceY || 86,
      pos.sourceWidth || 32,
      pos.sourceHeight || 32,
      this.pos.x,
      this.pos.y,
      pos.desWidth || 32,
      pos.desHeight || 32
    );
    goomba.walk();
    goomba.render();
  }

  collision() {
    var goombaValues = {
      x: goomba.pos.x,
      y: goomba.pos.y,
      h: 35,
      w: 32,
      type: "goomba"
    }

    function entityCollisionDetection(entity) {
      if (player.pos.x < entity.x + entity.w &&
				player.pos.x + 32 > entity.x &&
				player.pos.y < entity.y + entity.h && 32 + player.pos.y > entity.y) {
				handleCollision(entity);
			}
    }

    function handleCollision(entity) {
      if (player.pos.y < entity.y && (player.pos.x + 32) > entity.x + 10 &&
				player.pos.x < (entity.x + entity.w) - 10 && player.vel.y >= 0) {
				  player.pos.y = entity.y - 32;
				  player.vel.y = 0;
			}

      if (entity.type === "goomba") {
        player.pos.x = 0;
        goomba.pos.x = canvas.width - 32;
      }
    }

    wallArray.forEach(function (wall) {
      entityCollisionDetection(wall)
    });

    entityCollisionDetection(goombaValues)
  }

  clamp(value, min, max){
    if(value < min) {
      return min;
    }
    else if(value > max) {
      return max;
    }
    return value;
}

  gravity() {
    player.vel.y += 0.6;
    player.pos.y += player.vel.y;
  }

  drawTile() {
    var parent = this;
    var tileX = 0;
    var tileY = 0;
    wallArray = [];


    map.forEach(function (e, currentIndex) {
      e.forEach(function (s, value) {
        if (tileX === 25) {
          tileX = 0;
        }
        if (s === 0 && currentIndex === 0) {
          parent.context.drawImage(
            parent.tile,
            0,
            0,
            32,
            32,
            tileX * 32,
            canvas.height - 32,
            32,
            32
          );
          wallArray.push({
            x: tileX * 32,
            y: canvas.height - 32,
            h: 32,
            w: 32
          });
          tileX++;
        } else if (s === 0 && currentIndex === 1) {
          parent.context.drawImage(
            parent.tile,
            0,
            0,
            32,
            32,
            tileX * 32,
            canvas.height - 64,
            32,
            32
          );
          wallArray.push({
            x: tileX * 32,
            y: canvas.height - 64,
            h: 32,
            w: 32
          });
          tileX++;
        }
    });
  });
}
}

var player;
var goomba;

goomba.onload = function () {
  tiles.onload = function () {
    player = new Player(canvas, goomba, tiles, animations);
    goomba = new Goomba(canvas, goomba, animations);

    player.gameLoop();
    animations.movement = animations.walk(player);
    animations.jumping = animations.jumpingDefined(player);
  }
}
