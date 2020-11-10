import {
  keys,
  controls,
  keyDown,
  width,
  height,
  fill,
  rect,
  keyReleased,
  keyPushed,
  renderImage,
  saveScreenSettings,
  restoreScreenSettings,
  rotate,
} from "./toolbox.js";
import {
  blocks,
  blockSize,
  loadingLevel,
  map,
  mapoffsetX,
  mapoffsetY,
  moveSound,
  playerDown,
  playerLeft,
  playerRight,
  playerUp,
  rotateBlock,
  setFallDownHoleAnimDone,
  setLoadingLevel,
  updateCheck,
  worldHeight,
  worldWidth,
} from "./assetManager.js";
import { fps, tick } from "../index.js";
let movekeyPressed = false;
export class Player {
  x = 0;
  y = 0;
  xVel = 0;
  yVel = 0;
  haskey = false;
  totalMovesThisLevel = 0;
  tick = 0;
  img;
  visible = true;
  movementAllowed = true;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //this.img = playerDown;
  }
  shrinkSize = blockSize;
  render() {
    if (!this.img) this.img = playerDown;
    //fill("black");
    if (this.visible)
      renderImage(
        this.img,
        this.x * blockSize + mapoffsetX,
        this.y * blockSize + mapoffsetY,
        blockSize,
        blockSize
      );
    else {
      saveScreenSettings();
      rotate(
        Math.round((this.x + 0.5) * blockSize + mapoffsetX),
        Math.round((this.y + 0.5) * blockSize + mapoffsetY),
        tick % 360
      );
      renderImage(this.img, 0, 0, this.shrinkSize, this.shrinkSize);
      restoreScreenSettings();
      this.shrinkSize--;

      if (this.shrinkSize < 1) {
        this.visible = true;
        this.shrinkSize = blockSize;
        setFallDownHoleAnimDone(true);
        this.movementAllowed = false;
      } else if (this.shrinkSize < 3) {
        //loadingLevel = true;
        setLoadingLevel(true);
      }
      fill(`rgba(0, 0, 0, ${1.1 - this.shrinkSize / 50})`);
      rect(0, 0, width, height);
    }
    /*rect(
      this.x * blockSize + mapoffsetX,
      this.y * blockSize + mapoffsetY,
      blockSize,
      blockSize
    );*/
  }
  update() {
    if (!loadingLevel && this.visible && this.movementAllowed) {
      this.tick++;
      if (keyPushed && movekeyPressed) {
        this.totalMovesThisLevel++;
        moveSound.pause();
        moveSound.currentTime = 0;
        moveSound.play();
      }

      if (keyDown && this.xVel == 0 && this.yVel == 0) {
        movekeyPressed = true;
        if (keys[controls[0]]) {
          this.yVel -= 1;
          this.img = playerUp;
        } else if (keys[controls[1]]) {
          this.xVel -= 1;
          this.img = playerDown;
        } else if (keys[controls[2]]) {
          this.yVel += 1;
          this.img = playerLeft;
        } else if (keys[controls[3]]) {
          this.xVel += 1;
          this.img = playerRight;
        } else {
          movekeyPressed = false;
        }
      }

      if (tick % updateCheck == 0 || fps < 30) {
        //Make sure it does not leave the 10 by 10 grid
        if (this.x + this.xVel >= worldWidth) {
          this.xVel = 0;
        } else if (this.y + this.yVel >= worldHeight) {
          this.yVel = 0;
        } else if (this.x + this.xVel < 0) {
          this.xVel = 0;
        } else if (this.y + this.yVel < 0) {
          this.yVel = 0;
        }
        var xPushable = blocks.get(map[this.x + this.xVel][this.y + this.yVel])
          .xPushable;
        var yPushable = blocks.get(map[this.x + this.xVel][this.y + this.yVel])
          .yPushable;
        if (xPushable || yPushable) {
          //check if player is in bounds
          if (
            this.x + this.xVel * 2 >= worldWidth ||
            this.y + this.yVel * 2 >= worldHeight ||
            this.x + this.xVel * 2 < 0 ||
            this.y + this.yVel * 2 < 0
          ) {
            this.xVel = 0;
            this.yVel = 0;
            return;
          }
          //Check if spot is vacent
          if (map[this.x + this.xVel * 2][this.y + this.yVel * 2] != 0) {
            this.xVel = 0;
            this.yVel = 0;
            return;
          }
          if (xPushable && this.xVel != 0) {
            var block = map[this.x + this.xVel][this.y + this.yVel];
            map[this.x + this.xVel][this.y + this.yVel] = 0;
            map[this.x + this.xVel * 2][this.y + this.yVel * 2] = block;
          }
          if (yPushable && this.yVel != 0) {
            var block = map[this.x + this.xVel][this.y + this.yVel];
            map[this.x + this.xVel][this.y + this.yVel] = 0;
            map[this.x + this.xVel * 2][this.y + this.yVel * 2] = block;
          }

          //this.xVel = 0;
          //this.yVel = 0;
        }
        if (blocks.get(map[this.x + this.xVel][this.y + this.yVel]).solid) {
          this.xVel = 0;
          this.yVel = 0;
        }
        //if (this.tick % 2 == 0) {
        this.x += this.xVel;
        this.y += this.yVel;
        //}
      }
    }
  }
  setplayerPos(x, y) {
    this.x = x;
    this.y = y;
  }
}
