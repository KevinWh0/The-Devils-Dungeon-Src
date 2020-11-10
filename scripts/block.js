import { woodFloor } from "./assetManager.js";
import { renderImage, rect, fill } from "./toolbox.js";

export class Block {
  img = null;
  col = null;
  solid = false;
  xPushable = false;
  yPushable = false;
  updateFunction = [];
  enableBackground = false;

  offsetX = 0;
  offsetY = 0;

  //constructor(img) {
  //this.img = img;
  //}
  constructor(col, enableBackground) {
    this.col = col;
    this.enableBackground = enableBackground;
  }
  render(x, y, w, h) {
    if (this.img != null) {
      if (this.enableBackground) renderImage(woodFloor, x, y, w, h);
      renderImage(this.img, x + this.offsetX, y + this.offsetY, w, h);
    } else {
      fill(this.col);
      rect(x, y, w, h);
    }
  }
  update(x, y, w, h) {
    try {
      this.updateFunction.forEach((e) => {
        e(this, x, y, w, h);
      });
    } catch (err) {}
  }

  setUpdateFunction(func) {
    this.updateFunction.push(func);
  }

  setSolid(solid) {
    this.solid = solid;
  }
  setPushable(xPushable, yPushable) {
    this.xPushable = xPushable;
    this.yPushable = yPushable;
  }
  setImg(img) {
    this.img = img;
  }
  setOffsets(x, y) {
    this.offsetX = x;
    this.offsetY = y;
  }
}
