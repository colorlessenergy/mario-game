console.log("player.js logo");

var canvas = document.getElementById("goomba");
var wallArray = [];
var mysteryBlockArray = [];
var brickArray = [];

canvas.width = 480;
canvas.height = 288;

var goomba = new Image();
var tiles = new Image();

tiles.src = "images/tile.png";
goomba.src = "images/sheet.png";

var tickCount = 0;

var map =
[
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
    this.size = "small";
    this.parent = this;
    this.canvas = canvas;
    this.tile = tile;
    this.sprite = sprite;
    this.context = canvas.getContext("2d");
    this.animations = animations;
    this.mushroom = {
      sourceX: 825,
      sourceY: 264,
      sourceWidth: 32,
      sourceHeight: 32,
      desX: 0,
      desY: 10,
      desWidth: 32,
      desHeight: 32
    };

    if (this.size === "small") {
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
    } else if (this.size === "big") {
      this.stand = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 32,
        sourceHeight: 64,
        desX: this.pos.x,
        desY: this.pos.y,
        desWidth: 32,
        desHeight: 64
      }
    }

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

    this.bjumps = {
      sourceX: 222,
      sourceY: 2,
      sourceWidth: 32,
      sourceHeight: 62,
      desX: this.pos.x,
      desY: this.pos.y,
      desWidth: 32,
      desHeight: 62
    }
    if (this.size === "small") {
      this.s = this.jumps;
    } else if (this.size === "big") {
      this.s = this.bjumps;
    }
  }

  gameLoop() {
    var main = player.parent;
    main.context.setTransform(1,0,0,1,0,0);
    main.context.clearRect(0, 0, canvas.width, canvas.height);
    // change value of camx till it looks good

    var camX = main.clamp(-main.pos.x + canvas.width / 2, -1000, 1000 - canvas.width);
    var camY = main.clamp(-main.pos.y + canvas.height/2, 0, 0);
    main.context.translate( camX, camY );


    main.context.fillStyle = "#87ceeb";
    main.context.fillRect(0, 0, 25 * 32, canvas.height - 32);
    main.drawTile();


    window.requestAnimationFrame(player.gameLoop);
    tickCount++;
    animations.update(tickCount, main);
    player.gravity();
    player.collision();
    player.render(player.s);
    goomba.walk();
    goomba.render();

    if (mushroom) {
      mushroom.gravity();
      mushroom.collision();
      mushroom.walk();
      mushroom.render();
    }
  }

  render(pos) {
    if (player.size === "small") {
      if (leftM) {
        this.context.save();

        this.context.scale(-1, 1);
        this.context.drawImage(
          this.sprite,
          pos.sourceX || 194,
          pos.sourceY || 86,
          pos.sourceWidth || 32,
          pos.sourceHeight || 32,
          this.pos.x * -1,
          this.pos.y,
          pos.desWidth || 32,
          pos.desHeight || 32
        );
        this.context.restore();
      } else {
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
      }
    } else if (player.size === "big") {
      console.log(leftM);

      if (leftM) {
        this.context.save();

        this.context.scale(-1, 1);
        this.context.drawImage(
          this.sprite,
          pos.sourceX || 0,
          pos.sourceY || 0,
          pos.sourceWidth || 32,
          pos.sourceHeight || 64,
          this.pos.x * - 1,
          this.pos.y,
          pos.desWidth || 32,
          pos.desHeight || 64
        );
        this.context.restore();
      } else {
        this.context.drawImage(
          this.sprite,
          pos.sourceX || 0,
          pos.sourceY || 0,
          pos.sourceWidth || 32,
          pos.sourceHeight || 64,
          this.pos.x,
          this.pos.y,
          pos.desWidth || 32,
          pos.desHeight || 64
        );
      }

    }
  }

  collision() {
    var goombaValues = {
      x: goomba.pos.x,
      y: goomba.pos.y,
      h: 35,
      w: 32,
      type: "goomba"
    }

    if (mushroom) {
      var mushroomValues = {
        x: mushroom.pos.x,
        y: mushroom.pos.y,
        h: 32,
        w: 32,
        type: "mushroom"
      }
    }

    function entityCollisionDetection(entity) {
      if (player.size === "small") {
        if (player.pos.x < entity.x + entity.w &&
  				player.pos.x + 32 > entity.x &&
  				player.pos.y < entity.y + entity.h && 32 + player.pos.y > entity.y) {

  				handleCollision(entity);
  			}
      } else if (player.size === "big") {
        if (player.pos.x < entity.x + entity.w &&
  				player.pos.x + 32 > entity.x &&
  				player.pos.y < entity.y + entity.h && 64 + player.pos.y > entity.y) {

  				handleCollision(entity);
  			}
      }

    }

    function handleCollision(entity) {
      if (player.size === "small") {
        if (player.pos.y < entity.y && (player.pos.x + 32) > entity.x + 10 &&
            player.pos.x < (entity.x + entity.w) - 10 && player.vel.y >= 0) {
              player.pos.y = entity.y - 32;
              player.vel.y = 0;
          } else if (player.pos.y > entity.y) {
            player.pos.y = entity.y + 32;
          }
      } else if (player.size === "big") {
        if (player.pos.y < entity.y && (player.pos.x + 32) > entity.x + 10 &&
            player.pos.x < (entity.x + entity.w) - 10 && player.vel.y >= 0) {
              player.pos.y = entity.y - 64;
              player.vel.y = 0;
          } else if (player.pos.y > entity.y) {
            player.pos.y = entity.y + 64;
          }
      }

      if (entity.type === "goomba") {
        player.pos.x = 0;
        goomba.pos.x = canvas.width - 32;
      }

      if (entity.type === "mushroom") {
        player.size = "big";
        player.s = animations.marioGrowing[2];
      }

      if (entity.type === "mystery") {
        console.log("touched mystery");
        mushroom = new Mushroom(canvas, tiles, animations);
      }

      if (entity.type === "brick") {
        console.log("touched brick");
      }

    }
    wallArray.forEach(function (wall) {
      entityCollisionDetection(wall)
    });

    mysteryBlockArray.forEach(function (block) {
      entityCollisionDetection(block)
    });


    brickArray.forEach(function(brick) {
      entityCollisionDetection(brick)
    })




    entityCollisionDetection(goombaValues);
    if (mushroom) {
      entityCollisionDetection(mushroomValues);
    }

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
    wallArray = [];
    brickArray = [];
    mysteryBlockArray = [];

    map.forEach(function (e, currentIndex) {
      e.forEach(function (s, value) {
        if (s === 2) {
          parent.context.drawImage(
            parent.tile,
            759,
            0,
            32,
            32,
            value * 32,
            currentIndex * 32,
            32,
            32
          );
          mysteryBlockArray.push({
            x: value * 32,
            y: currentIndex * 32,
            h: 32,
            w: 32,
            type: "mystery"
          });
        } else if (s === 3) {
          parent.context.drawImage(
            parent.tile,
            33,
            0,
            32,
            32,
            value * 32,
            currentIndex * 32,
            32,
            32
          );
          brickArray.push({
            x: value * 32,
            y: currentIndex * 32,
            h: 32,
            w: 32,
            type: "brick"
          });
        } else if (s === 0) {
          parent.context.drawImage(
            parent.tile,
            0,
            0,
            32,
            32,
            value * 32,
            currentIndex * 32,
            32,
            32
          );
          wallArray.push({
            x: value * 32,
            y: currentIndex * 32,
            h: 32,
            w: 32
          });
        }
    });
  });
}
}

var player;
var goomba;
var mushroom;

player = new Player(canvas, goomba, tiles, animations);
goomba = new Goomba(canvas, goomba, animations);


player.gameLoop();
animations.movement = animations.walk(player);
animations.jumping = animations.jumpingDefined(player);
animations.marioGrowing = animations.marioGrowingDefined(player);
animations.bigJumping = animations.bigJumpingDefined(player);
animations.bigMovement = animations.bigMovementDefined(player);
