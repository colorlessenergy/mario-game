class Mushroom {
  constructor (canvas, sprite, animations) {
    this.canvas = canvas;
    this.sprite = sprite;
    this.animations = animations;
    this.context = canvas.getContext("2d");
    this.width = 32;
    this.height = 32;

    this.vel = {
      x: 0.5,
      y: 0
    }

    this.pos = {
      x: 320,
      y: 128 - 32
    }

    this.frames = [
     {
        sourceX: 825,
        sourceY: 264,
        sourceWidth: 32,
        sourceHeight: 32,
        desX: this.pos.x,
        desY: this.pos.y,
        desWidth: 32,
        desHeight: 32
      }
  ];
  this.currentFrame = 0;
  this.currentPos = this.frames[this.currentFrame];

  }


  render(current) {
    mushroom.walk();
    mushroom.context.drawImage(
      mushroom.sprite,
      this.currentPos.sourceX,
      this.currentPos.sourceY,
      this.currentPos.sourceWidth,
      this.currentPos.sourceHeight,
      this.pos.x,
      this.pos.y,
      this.currentPos.desWidth,
      this.currentPos.desHeight);
  }

  walk() {
    this.pos.x += this.vel.x;
  }

  collision () {
    function entityCollisionDetection(entity) {
        if (mushroom.pos.x < entity.x + entity.w &&
          mushroom.pos.x + 32 > entity.x &&
          mushroom.pos.y < entity.y + entity.h && 32 + mushroom.pos.y > entity.y) {
          handleCollision(entity);
        }

    }

    function handleCollision(entity) {
      if (mushroom.pos.y < entity.y && (mushroom.pos.x + 32) > entity.x + 10 &&
          mushroom.pos.x < (entity.x + entity.w) - 10 && mushroom.vel.y >= 0) {
            mushroom.pos.y = entity.y - 32;
            mushroom.vel.y = 0;
        } else if (mushroom.pos.y > entity.y) {
          mushroom.pos.y = entity.y + 32;
        }
}

wallArray.forEach(function (wall) {
  entityCollisionDetection(wall)
});

brickArray.forEach(function(brick) {
  entityCollisionDetection(brick)
})

mysteryBlockArray.forEach(function (block) {
  entityCollisionDetection(block)
});

}
gravity() {
  mushroom.vel.y += 0.6;
  mushroom.pos.y += mushroom.vel.y;
}
}
