import { blockSize, mapoffsetX, mapoffsetY, player } from "./assetManager.js";
import { fill, rect } from "./toolbox.js";

export let spawnX = 0;
export let spawnY = 0;
export function setSpawnPos(x, y) {
  spawnX = x;
  spawnY = y;
  player.x = x;
  player.y = y;
}
//id = -1
export function renderSpawnBlock() {
  fill("#bbff0011");
  rect(
    spawnX * blockSize + mapoffsetX,
    spawnY * blockSize + mapoffsetY,
    blockSize,
    blockSize
  );
}
