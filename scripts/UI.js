import { setState, state, states } from "../index.js";
import {
  buttonPress,
  getLvlUrl,
  key,
  level,
  player,
  setlevelType,
  setLvl,
  setuseRomanNumerals,
  useRomanNumerals,
} from "./assetManager.js";
import { spawnX, spawnY } from "./spawnBlock.js";
import {
  fill,
  height,
  mouseX,
  mouseY,
  rectOutline,
  rect,
  width,
  inArea,
  mousePressed,
  renderImage,
  button,
  text,
  stopGameMusic,
  romanize,
  loadWorld,
  getTextWidth,
} from "./toolbox.js";
export function runUI() {
  if (inArea(mouseX, mouseY, width - 50, 10, 40, 40)) {
    if (mousePressed) {
      buttonPress.play();
      stopGameMusic();
      setState(states.menu);
      setlevelType("level");
      loadWorld(getLvlUrl(level));
      player.x = spawnX;
      player.y = spawnY;
      player.haskey = false;
    }
    fill("yellow");
  } else fill("white");
  rectOutline(width - 50, 10, 40, 40, 2);
  rect(width - (50 - 11), 15, 8, 30);
  rect(width - (10 + 19), 15, 8, 30);
  fill("white");
  if (player.haskey) renderImage(key, width - 90, 10, 40, 40);
  if (state == states.game)
    if (useRomanNumerals)
      text(
        `Level ${romanize(level + 1)}`,
        width - getTextWidth(`Level ${romanize(level + 1)}`) - 20,
        (height / 18) * 17
      );
    else
      text(
        `Level ${level + 1}`,
        width - getTextWidth(`Level ${level + 1}`) - 20,
        (height / 18) * 17
      );
}
