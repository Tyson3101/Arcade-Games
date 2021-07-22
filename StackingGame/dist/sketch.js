/// <reference path="../@types/p5/index.d.ts"/>
let blocks = [];
let currentBlock = 0;
let blockLength = 3;
let initalFrameRate = 2;
const score = document.createElement("h1");
document.body.appendChild(score);
function setup() {
    frameRate(initalFrameRate);
    createCanvas(520, 600);
    blocks.push();
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
function placedBlock() {
    if (currentBlock >= 1) {
        let block = blocks[currentBlock];
        let otherBlock = blocks[currentBlock - 1];
        console.log(block, otherBlock);
        switch (blockLength) {
            case 3:
                if (block.x === otherBlock.x)
                    break;
                if (otherBlock.x === block.x + block.r) {
                    blockLength--;
                    block.length--;
                    block.x += block.r;
                }
                else if (otherBlock.x === block.x - block.r) {
                    blockLength--;
                    block.length--;
                }
                else if (otherBlock.x === block.x + block.r * 2) {
                    blockLength -= 2;
                    block.length -= 2;
                    block.x += block.r * 2;
                }
                else if (otherBlock.x === block.x - block.r * 2) {
                    blockLength -= 2;
                    block.length -= 2;
                }
                else {
                    blockLength = 0;
                    block.length = 0;
                    gameOver();
                }
                break;
            case 2:
                if (block.x === otherBlock.x)
                    break;
                if (otherBlock.x === block.x + block.r) {
                    blockLength--;
                    block.length--;
                    block.x += block.r;
                }
                else if (otherBlock.x === block.x - block.r) {
                    blockLength--;
                    block.length--;
                }
                else {
                    blockLength = 0;
                    block.length = 0;
                    gameOver();
                }
                break;
            case 1:
                if (block.x === otherBlock.x)
                    break;
                else {
                    blockLength = 0;
                    block.length = 0;
                    gameOver();
                }
                break;
        }
    }
    currentBlock++;
}
function gameOver() {
    noLoop();
    const btn = document.createElement("button");
    btn.innerText = "Reset";
    btn.onclick = () => {
        currentBlock = 0;
        blockLength = 3;
        blocks = [];
        btn.remove();
        loop();
    };
    btn.style.padding = "1rem";
    document.body.appendChild(btn);
}
