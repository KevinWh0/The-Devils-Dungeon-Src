import {
  blocks,
  blockSize,
  buildMode,
  getLvlUrl,
  totalBlocks,
} from "./assetManager.js";
import {
  game,
  text,
  fill,
  setFontSize,
  renderImage,
  width,
  height,
  DownloadWorld,
  loadWorld,
  mousePressed,
  mouseDown,
  mouseX,
  mouseY,
  inArea,
  rect,
  keyPressed,
} from "./toolbox.js";
import { renderSpawnBlock } from "./spawnBlock.js";
import { placing, setPlacing } from "../index.js";

export function buildModeUI() {
  if (buildMode) {
    for (var i = 0; i < totalBlocks + 4; i++) {
      if (i % 2 == 0) fill("white");
      else fill("lightgrey");

      rect(width - blockSize, i * blockSize, blockSize, blockSize);
      if (i - 3 >= 0)
        blocks
          .get(i - 3)
          .render(width - blockSize, i * blockSize, blockSize, blockSize);
    }
    fill("black");
    setFontSize("16", "ariel");
    text("Save", width - blockSize, 1 * blockSize);
    text("Load", width - blockSize, 2 * blockSize);
    text("Spawn", width - blockSize, 3 * blockSize);

    text("Erase", width - blockSize, 4 * blockSize);

    if (mouseX > width - blockSize && mousePressed) {
      for (var i = 0; i < totalBlocks + 4; i++) {
        if (mouseY > i * blockSize && mouseY < (i + 1) * blockSize) {
          if (i == 0) {
            DownloadWorld();
          } else if (i == 1) {
            loadWorld(getLvlUrl(level));
            player.x = spawnX;
            player.y = spawnY;
          } else setPlacing(i - 3);
        }
      }
    }
    renderSpawnBlock();
  }
}
