import {
  removeItem,
  game,
  text,
  fill,
  setFontSize,
  renderImage,
  width,
  height,
  resetMousePressed,
  DownloadWorld,
  loadWorld,
  mousePressed,
  mouseDown,
  mouseX,
  mouseY,
  inArea,
  rect,
  keyPressed,
  centerText,
  keys,
  keyReleased,
  stateChangeButton,
  isPlaying,
  isMusicListPlaying,
  playRandomSong,
  textWraped,
  arraysEqual,
  controls,
  getTextWidth,
  button,
} from "./scripts/toolbox.js";
import {
  level,
  worldWidth,
  worldHeight,
  map,
  blockSize,
  crate,
  player,
  blocks,
  totalBlocks,
  loadNextLevel,
  updateMapOffset,
  buildMode,
  unloadMenuImg,
  gameMusic,
  musicMuted,
  showFPS,
  restartSound,
  getLvlUrl,
  mapoffsetX,
  youtubeLogo,
  buttonPress,
  setUpdateCheck,
  creditsMusic,
  settingsMusic,
  setlevelType,
  canPlayMusicThisFrame,
  setCanPlayMusicThisFrame,
  showDialogue,
  loadingLevel,
  fallDownHoleAnimDone,
} from "./scripts/assetManager.js";

import { loadLvl, renderLvl, stoneBackground } from "./scripts/renderLevel.js";

import { spawnX, spawnY, renderSpawnBlock } from "./scripts/spawnBlock.js";

import { runUI } from "./scripts/UI.js";
import {
  creditsScreen,
  howToPlay,
  renderMainMenu,
  settingsMenu,
  winScreen,
} from "./scripts/menu.js";

import { buildModeUI } from "./scripts/buildMode.js";

import { Speak, resetStartSpeakTick, runDialogue } from "./scripts/dialogue.js";

export let states = {
  game: "game",
  menu: "menu",
  settings: "settings",
  help: "help",
  credits: "credits",
  tutorial: "tutorial",
  bossfightlvls: "bossfightlvls",
  winScreen: "WinScreen",
};

export let state = states.menu;
export function setState(s) {
  state = s;
}
export let placing = 1;
export function setPlacing(p) {
  placing = p;
}
game.start();
var lastRender = Date.now();
export let fps;

export let tick = 0;
export function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);
  game.clear();
  game.frameNo += 1;
  setFontSize(34, "MainFont");
  fill("grey");
  rect(0, 0, width, height);
  switch (state) {
    case states.game:
      player.update();
      if (game.frameNo % 100 == 0) {
        updateMapOffset();
        if (!musicMuted && !isMusicListPlaying(gameMusic)) {
          playRandomSong(gameMusic);
          //gameMusic[0].play();
        }
      }
      stoneBackground();
      renderLvl();
      player.render();
      if (loadingLevel) {
        fill(`rgba(0, 0, 0, 1)`);
        rect(0, 0, width, height);
      }
      buildModeUI();
      setFontSize(width / 30, "ariel");

      fill("white");
      text(
        "Press R to restart the level",
        centerText("Press R to restart the level", width / 2, 0),
        (height / 18) * 17
      );
      if (keyPressed && keys[82] && player.visible && !loadingLevel) {
        restartSound.pause();
        restartSound.currentTime = 0;
        restartSound.play();
        loadWorld(getLvlUrl(level));
        player.x = spawnX;
        player.y = spawnY;
        player.xVel = 0;
        player.yVel = 0;

        player.haskey = false;
      }

      runUI();
      if (showDialogue) runDialogue();
      //Checks to see if the next level should be loaded
      loadNextLevel();
      //if (!isPlaying(gameMusic)) {
      //gameMusic.play();
      //}

      break;
    case states.tutorial:
      player.update();
      if (game.frameNo % 100 == 0) {
        updateMapOffset();
        if (!musicMuted && !isMusicListPlaying(gameMusic)) {
          playRandomSong(gameMusic);
          //gameMusic[0].play();
        }
      }
      stoneBackground();
      renderLvl();
      player.render();
      buildModeUI();
      setFontSize("36", "ariel");

      fill("white");
      text(
        "Press R to restart the level",
        centerText("Press R to restart the level", width / 2, 0),
        (height / 18) * 17
      );
      if (keyPressed && keys[82]) {
        restartSound.pause();
        restartSound.currentTime = 0;
        restartSound.play();
        loadWorld(getLvlUrl(level));
        player.x = spawnX;
        player.y = spawnY;
        player.xVel = 0;
        player.yVel = 0;
        player.haskey = false;
      }

      runUI();

      let cntrls = arraysEqual(controls, [38, 37, 40, 39])
        ? "the ARROW KEYS"
        : "WASD";
      textWraped(
        `Use ${cntrls} to move. You move until you hit something. ` +
          `Here is an area for you to test what all the blocks do.` +
          ` You can see what they all do on the HOW TO PLAY section on the menu `,
        20,
        80,
        mapoffsetX - 40,
        48
      );
      //Checks to see if the next level should be loaded
      loadNextLevel();
      break;
    case states.menu:
      renderMainMenu();
      updateMapOffset();
      setFontSize(14, "MainFont");
      fill("white");
      text(
        "This game was made for the 2020 Devtober Gamejam by KevinWho",
        width -
          getTextWidth(
            "This game was made for the 2020 Devtober Gamejam by KevinWho"
          ) -
          80,
        height - 20
      );
      setFontSize(24, "MainFont");
      renderImage(
        youtubeLogo,
        width - blockSize - 10,
        height - blockSize - 10,
        blockSize,
        blockSize
      );
      if (
        mousePressed &&
        inArea(
          mouseX,
          mouseY,
          width - blockSize - 10,
          height - blockSize - 10,
          blockSize,
          blockSize
        )
      ) {
        buttonPress.play();
        window.open("https://www.youtube.com/c/kevinwho");
      }
      setCanPlayMusicThisFrame(true);
      break;

    case states.settings:
      settingsMenu();
      if (!settingsMusic.isPlaying && !musicMuted && canPlayMusicThisFrame)
        settingsMusic.play();
      button("Back", width / 2, 50, 100, 50, 0, () => {
        //setLevel = 1;
        settingsMusic.pause();
        settingsMusic.currentTime = 0;
        setState(states.menu);
      });
      button("Tutorial", width - 100, height - 50, 100, 60, 5, () => {
        //setLevel = 1;
        settingsMusic.pause();
        settingsMusic.currentTime = 0;
        setlevelType("tutorial");
        setState(states.tutorial);
        loadWorld(getLvlUrl(0));
      });
      break;
    case states.help:
      setFontSize(36, "MainFont");
      howToPlay();
      if (!settingsMusic.isPlaying && !musicMuted && canPlayMusicThisFrame)
        settingsMusic.play();
      button("Back", width / 2, 50, 100, 50, 0, () => {
        //setLevel = 1;
        settingsMusic.pause();
        settingsMusic.currentTime = 0;
        setState(states.menu);
      });
      button("Tutorial", width - 100, height - 50, 100, 60, 5, () => {
        //setLevel = 1;
        settingsMusic.pause();
        settingsMusic.currentTime = 0;
        setlevelType("tutorial");
        setState(states.tutorial);
        loadWorld(getLvlUrl(0));
      });
      break;
    case states.credits:
      creditsScreen();
      if (!creditsMusic.isPlaying && !musicMuted) creditsMusic.play();
      button("Back", width / 2, 50, 100, 50, 0, () => {
        //setLevel = 1;
        creditsMusic.pause();
        creditsMusic.currentTime = 0;
        setState(states.menu);
      });

      //stateChangeButton("Back", 50, 50, 0, states.menu);
      break;
    case states.winScreen:
      winScreen();
      if (showDialogue) runDialogue();

      break;

    default:
      //error get the user to the menu
      state = states.menu;
      break;
  }
  if (showFPS) {
    fill("black");
    text(`FPS: ${fps}`, 10, height - 20);
  }

  resetMousePressed();
  setUpdateCheck(Math.round(fps / 30));

  tick++;
}

export function pauseSettingsMusic() {
  settingsMusic.pause();
  settingsMusic.currentTime = 0;
}
