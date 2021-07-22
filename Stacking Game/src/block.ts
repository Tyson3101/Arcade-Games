function roundToMultiple(x: number, mult: number) {
  return Math.ceil(x / mult) * mult;
}

class Block {
  x: number;
  y: number;
  r: number;
  vx: number;
  blocks: Array<{ x: number; y: number; w: number; h: number }>;
  constructor(public length: number, public orderTop: number = 1) {
    this.r = 40;
    this.y = height - this.r * this.orderTop;
    this.x = roundToMultiple(random(this.r, width - this.r * this.length), 40);
    this.vx = 0;
  }

  show() {
    fill("RED");
    stroke("BLACK");
    strokeWeight(4);
    rect(this.x, this.y, this.r * this.length, this.r);
    noFill();
    for (let i = this.length; i >= 0; i--) {
      rect(this.x, this.y, this.r * i, this.r);
    }
  }

  update() {
    if (!this.vx) this.vx = this.r * random([-1, 1]);
    if (this.x >= width - this.r * this.length) this.moveLeft();
    else if (this.x <= 0) this.moveRight();
    this.x += this.vx;
  }

  place() {
    this.x = this.vx > 0 ? this.x - this.r : this.x + this.r;
    this.vx = 0;
  }

  moveRight() {
    this.vx = this.r;
  }

  moveLeft() {
    this.vx = -this.r;
  }
}
