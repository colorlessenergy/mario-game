class Goomba {
  constructor (canvas, sprite, animations) {
    this.canvas = canvas;
    this.sprite = sprite;
    this.animations = animations;
    this.context = canvas.getContext("2d");
    this.width = 35;
    this.height = 32;
    this.tick = 0;

    this.vel = {
      x: 0.5,
      y: 0
    }

    this.pos = {
      x: canvas.width - 32,
      y: canvas.height - 92
    }

    this.frames = [
      {
        sourceX: 0,
        sourceY: 374,
        sourceWidth: this.width,
        sourceHeight: this.height,
        desY: this.pos.y,
        desWidth: this.width,
        desHeight: this.height
      },
      {
        sourceX: this.width,
        sourceY: 374,
        sourceWidth: this.width,
        sourceHeight: this.height,
        desY: this.pos.y,
        desWidth: this.width,
        desHeight: this.height
      }

  ];
  this.currentFrame = 0;
  this.currentPos = this.frames[this.currentFrame];

  }


  render(current) {
    goomba.walk();
    this.currentFrame++;
    if (this.currentFrame > 1) {
      this.currentFrame = 0;
    }

    if (this.tick % 5 === 0) {
      this.currentPos = this.frames[this.currentFrame];
    }

    goomba.context.drawImage(
      goomba.sprite,
      this.currentPos.sourceX,
      this.currentPos.sourceY,
      this.currentPos.sourceWidth,
      this.currentPos.sourceHeight,
      this.pos.x,
      this.currentPos.desY,
      this.currentPos.desWidth,
      this.currentPos.desHeight);
  }

  walk() {
    this.tick++;
    this.pos.x -= this.vel.x;
  }
}
