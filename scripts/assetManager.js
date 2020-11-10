import { pauseSettingsMusic, setState, state, states, tick } from "../index.js";
import { Block } from "./block.js";
import { triggerSpeach } from "./dialogue.js";
import { Player } from "./player.js";
import {
  height,
  loadWorld,
  stopGameMusic,
  width,
  game,
  renderImage,
  saveScreenSettings,
  restoreScreenSettings,
  fill,
  rect,
} from "./toolbox.js";
export let buildMode = false;

export let filePrefix = window.location.href.replace("index.html", "");

export let musicMuted = false;
export let musicVolume = 1;
export function setMuted(m) {
  musicMuted = m;
}

export let canPlayMusicThisFrame = true;
export function setCanPlayMusicThisFrame(e) {
  canPlayMusicThisFrame = e;
}
export let showFPS = false;
export function setShowFPS(f) {
  showFPS = f;
}
export let useRomanNumerals = true;
export function setuseRomanNumerals(f) {
  useRomanNumerals = f;
}

export let showDialogue = true;
export function setShowDialogue(ShowDialogue) {
  showDialogue = ShowDialogue;
}
export let updateCheck = 2;
export function setUpdateCheck(uc) {
  updateCheck = uc;
}
export let worldWidth = 10;
export let worldHeight = 10;
export let blockSize = 50;
export function setBlockSize(size) {
  blockSize = size;
}

export let mapoffsetX = 0;
export let mapoffsetY = 0;
export function updateMapOffset() {
  //Update the block Size
  let shortest = width > height ? height : width;
  setBlockSize(
    Math.round(
      (shortest / (worldWidth > worldHeight ? worldHeight : worldWidth)) * 0.8
    )
  );

  mapoffsetX = width / 2 - (worldWidth * blockSize) / 2;
  mapoffsetY = height / 2 - (worldHeight * blockSize) / 2;
}

export function setMapOffset(x, y) {
  mapoffsetX = x;
  mapoffsetY = y;
}

export let map = new Array(worldWidth);
for (var i = 0; i < worldWidth; i++) {
  map[i] = new Array(worldHeight);
}
for (var i = 0; i < worldWidth; i++) {
  for (var j = 0; j < worldHeight; j++) {
    map[i][j] = 0;
  }
}

export function setMapSize(w, h) {
  worldWidth = w;
  worldHeight = h;

  map = new Array(worldWidth);
  for (var i = 0; i < worldWidth; i++) {
    map[i] = new Array(worldHeight);
  }

  for (var i = 0; i < worldWidth; i++) {
    for (var j = 0; j < worldHeight; j++) {
      map[i][j] = 0;
    }
  }
}

//This controls what type of levels it loads
//for example: if lvltype is tutorial and you are on lvl 1
//it loads tutorial1.txt
export let levelType = "level";
export function setlevelType(lvltype) {
  levelType = lvltype;
}
export let levelCount = 22;
export let level = 0;
export function setLvl(lvl) {
  level = lvl;
}
export let loadingLevel = false;
export function setLoadingLevel(lvl) {
  loadingLevel = lvl;
}
//Set to the same thing to give a blank canvas to make levels
export let levelChangeChecker = buildMode ? level : -1;
let mapPath = `${filePrefix}/maps/`;

export function getLvlUrl(lvl) {
  return `${mapPath}${levelType}${lvl}.txt`;
}

export let fallDownHoleAnimDone = false;
export function setFallDownHoleAnimDone(bool) {
  fallDownHoleAnimDone = bool;
}

export function loadNextLevel() {
  if (level > levelCount) {
    setState(states.winScreen);
    return;
  }
  if (levelChangeChecker != level) {
    player.xVel = 0;
    player.yVel = 0;
    levelChangeChecker = level;
    loadWorld(getLvlUrl(level));
  }
}
let musicPath = `${filePrefix}/assets/sounds/music/`;

export let gameMusic = [];

gameMusic.push(new Audio(`${musicPath}/GameMusic/rough-engine.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/power-switch.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/electric-orbit.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/centerpiece-breaker.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

gameMusic.push(new Audio(`${musicPath}/GameMusic/out-of-focus.wav`));
gameMusic[gameMusic.length - 1].volume = 0.2;

export let mainMenuMusic = new Audio(
  `${musicPath}/MenuMusic/mainMenu-monday-iddim.wav`
);
mainMenuMusic.volume = 0.2;

export let winScreenMusic = new Audio(
  `${musicPath}/MenuMusic/WinScreen-do-not-forget-me.wav`
);
winScreenMusic.volume = 0.2;

export let creditsMusic = new Audio(
  `${musicPath}/MenuMusic/credits-sphere-of-control.wav`
);
creditsMusic.volume = 0.2;

export let settingsMusic = new Audio(
  `${musicPath}/MenuMusic/Settings-black-road.wav`
);
settingsMusic.volume = 0.2;

export let menuBackground = new Image();
menuBackground.src = `${filePrefix}/assets/misc/MenuBackground.png`;

export function loadMenuImg() {
  menuBackground = new Image();
  menuBackground.src = `${filePrefix}/assets/misc/MenuBackground.png`;
}

export function unloadMenuImg() {
  menuBackground = null;
}

export let player = new Player(0, 0);

//let assetsStart = "..";
let assetsStart = filePrefix;
//Sound effects
export let buttonPress = new Audio(
  `${assetsStart}/assets/sounds/ButtonPress.wav`
);

export let buttonHover = new Audio(
  `${assetsStart}/assets/sounds/ButtonHover.wav`
);

export let restartSound = new Audio(`${assetsStart}/assets/sounds/Restart.wav`);
restartSound.volume = 0.2;

export let keyPickupSound = new Audio(
  `${assetsStart}/assets/sounds/KeyPickup.wav`
);
keyPickupSound.volume = 0.4;

export let turnSound = new Audio(`${assetsStart}/assets/sounds/TurnSound.wav`);
turnSound.volume = 0.4;

export let moveSound = new Audio(`${assetsStart}/assets/sounds/MoveSound.wav`);
moveSound.volume = 0.2;

export let crate = new Image();
crate.src = `${assetsStart}/assets/tiles/crate.png`;
export let exitTile = new Image();
exitTile.src = `${assetsStart}/assets/tiles/ExitHole.png`;
export let key = new Image();
key.src = `${assetsStart}/assets/tiles/Key.png`;
export let rotateBlock = new Image();
rotateBlock.src = `${assetsStart}/assets/tiles/rotateBlock.png`;
export let woodFloor = new Image();
woodFloor.src = `${assetsStart}/assets/tiles/woodFloor.png`;
export let stoneWall = new Image();
stoneWall.src = `${assetsStart}/assets/tiles/stoneWall.png`;
export let lockedExitHole = new Image();
lockedExitHole.src = `${assetsStart}/assets/tiles/LockedExitHole.png`;
export let horizontalCrate = new Image();
horizontalCrate.src = `${assetsStart}/assets/tiles/horizontalCrate.png`;
export let verticalCrate = new Image();
verticalCrate.src = `${assetsStart}/assets/tiles/verticalCrate.png`;

export let youtubeLogo = new Image();
youtubeLogo.src = `${assetsStart}/assets/misc/YoutubeLogo.png`;

export let playerDown = new Image();
playerDown.src = `${assetsStart}/assets/player/playerDown.png`;

export let playerUp = new Image();
playerUp.src = `${assetsStart}/assets/player/playerUp.png`;

export let playerLeft = new Image();
playerLeft.src = `${assetsStart}/assets/player/playerLeft.png`;

export let playerRight = new Image();
playerRight.src = `${assetsStart}/assets/player/playerRight.png`;

export let totalBlocks = 8;
export let blocks = new Map();

blocks.set(0, new Block("white"));
blocks.get(0).setImg(woodFloor);
blocks.set(1, new Block("grey"));
blocks.get(1).setSolid(true);
blocks.get(1).setImg(stoneWall);
blocks.set(2, new Block("red"));
blocks.get(2).setImg(crate);
blocks.get(2).setPushable(true, true);
blocks.get(2).setSolid(true);
blocks.set(3, new Block("purple"));
blocks.get(3).setImg(exitTile);

let animationTicker = 0;
blocks.get(3).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
    if (state == states.tutorial) {
      setState(states.menu);
      player.x = 0;
      player.y = 0;
      player.xVel = 0;
      player.yVel = 0;
      player.haskey = false;
    } else {
      if (fallDownHoleAnimDone) {
        level++;
        player.x = 0;
        player.y = 0;
        player.xVel = 0;
        player.yVel = 0;

        player.haskey = false;

        if (level > levelCount) setState(states.winScreen);
        else {
          loadingLevel = true;
        }
        triggerSpeach();
        setFallDownHoleAnimDone(false);
        player.visible = true;
        player.movementAllowed = true;
      } else {
        //hide the player and show a fake player falling
        player.visible = false;
      }
    }
  }
});

blocks.set(4, new Block("blue"), true);
blocks.get(4).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
    turnSound.play();
    var plrxvel = player.xVel;
    player.xVel = player.yVel;
    player.yVel = plrxvel;
    if (player.yVel == -1) {
      player.img = playerUp;
    } else if (player.xVel == -1) {
      player.img = playerDown;
    } else if (player.yVel == 1) {
      player.img = playerLeft;
    } else if (player.xVel == 1) {
      player.img = playerRight;
    }
  }
});
blocks.get(4).setImg(rotateBlock);
blocks.set(5, new Block("gold", true));
blocks.get(5).setUpdateFunction((block, x, y, w, h) => {
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y &&
    player.haskey
  ) {
    player.xVel = 0;
    player.yVel = 0;
    player.haskey = false;

    if (state === states.tutorial) {
      setState(states.menu);
      setlevelType("level");
      stopGameMusic();
      loadWorld(getLvlUrl(level));
      player.x = spawnX;
      player.y = spawnY;
    } else if (state === states.help) {
      //settingsMusic.pause();
      //settingsMusic.currentTime = 0;
      pauseSettingsMusic();
      stopGameMusic();
      setState(states.menu);
      canPlayMusicThisFrame = false;
    } else {
      //player.x = 0;
      //player.y = 0;
      //level++;
      //if (level > levelCount) setState(states.winScreen);
      //triggerSpeach();
      map[(x - mapoffsetX) / blockSize][(y - mapoffsetY) / blockSize] = 3;
      player.movementAllowed = false;
    }
  }
});
blocks.get(5).setImg(lockedExitHole);

blocks.set(6, new Block("yellow", true));
blocks.get(6).setUpdateFunction((block, x, y, w, h) => {
  block.setOffsets(0, Math.sin(game.frameNo / 20) * 4);
  if (
    (x - mapoffsetX) / blockSize == player.x &&
    (y - mapoffsetY) / blockSize == player.y
  ) {
    keyPickupSound.play();
    player.haskey = true;
    map[(x - mapoffsetX) / blockSize][(y - mapoffsetY) / blockSize] = 0;
  }
});
blocks.get(6).setImg(key);

blocks.set(7, new Block("yellow", true));

blocks.get(7).setImg(verticalCrate);
blocks.get(7).setPushable(false, true);
blocks.get(7).setSolid(true);

blocks.set(8, new Block("yellow", true));

blocks.get(8).setImg(horizontalCrate);
blocks.get(8).setPushable(true, false);
blocks.get(8).setSolid(true);
