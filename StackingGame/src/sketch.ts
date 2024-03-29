/// <reference path="../@types/p5/index.d.ts"/>

let blocks: Block[] = [];
let currentBlock = 0;
let blockLength = 3;
let initalFrameRate = 5;
const score = document.querySelector("h1");
const btn = document.querySelector("button");

function setup() {
  frameRate(initalFrameRate);
  createCanvas(520, 600);
  btn.innerText = "Reset";
  btn.onclick = () => {
    currentBlock = 0;
    blockLength = 3;
    blocks = [];
    loop();
    btn.blur();
  };
  btn.style.padding = "1rem";
}

function draw() {
  background(0);
  if (!blocks[currentBlock])
    blocks[currentBlock] = new Block(blockLength, currentBlock + 1);
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].show();
    if (i === currentBlock) {
      blocks[i].update();
    }
  }
  score.innerText = "Score: " + currentBlock;
}
function keyPressed() {
  if (key === " ") {
    blocks[currentBlock].place();
    placedBlock();
    frameRate(initalFrameRate + currentBlock + 1.2);
  }
}
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    blocks[currentBlock].place();
    placedBlock();
    frameRate(initalFrameRate + currentBlock + 1.2);
  }
}
function placedBlock() {
  if (currentBlock >= 1) {
    let block = blocks[currentBlock];
    let otherBlock = blocks[currentBlock - 1];
    switch (blockLength) {
      case 3:
        if (block.x === otherBlock.x) break;
        if (otherBlock.x === block.x + block.r) {
          blockLength--;
          block.length--;
          block.x += block.r;
        } else if (otherBlock.x === block.x - block.r) {
          blockLength--;
          block.length--;
        } else if (otherBlock.x === block.x + block.r * 2) {
          blockLength -= 2;
          block.length -= 2;
          block.x += block.r * 2;
        } else if (otherBlock.x === block.x - block.r * 2) {
          blockLength -= 2;
          block.length -= 2;
        } else {
          blockLength = 0;
          block.length = 0;
          gameEnd();
        }
        break;
      case 2:
        if (block.x === otherBlock.x) break;
        if (otherBlock.x === block.x + block.r) {
          blockLength--;
          block.length--;
          block.x += block.r;
        } else if (otherBlock.x === block.x - block.r) {
          blockLength--;
          block.length--;
        } else {
          blockLength = 0;
          block.length = 0;
          gameEnd();
        }
        break;
      case 1:
        if (block.x === otherBlock.x) break;
        else {
          blockLength = 0;
          block.length = 0;
          gameEnd();
        }
        break;
    }
  }
  if (currentBlock >= 15) return gameEnd();
  currentBlock++;
}
function gameEnd() {
  currentBlock--;
  noLoop();
}
