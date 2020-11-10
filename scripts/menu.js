import { setState, state, states } from "../index.js";
import {
  blocks,
  blockSize,
  buttonPress,
  filePrefix,
  gameMusic,
  getLvlUrl,
  level,
  mainMenuMusic,
  mapoffsetX,
  mapoffsetY,
  menuBackground,
  musicMuted,
  player,
  setlevelType,
  setLvl,
  setMapOffset,
  setMuted,
  setShowDialogue,
  setShowFPS,
  settingsMusic,
  setuseRomanNumerals,
  showDialogue,
  showFPS,
  stoneWall,
  totalBlocks,
  useRomanNumerals,
  winScreenMusic,
  youtubeLogo,
} from "./assetManager.js";
import { renderLvl } from "./renderLevel.js";
import {
  fill,
  text,
  centerText,
  getTextWidth,
  setFontSize,
  rect,
  renderImage,
  width,
  height,
  inArea,
  mouseX,
  mouseY,
  rectOutline,
  mousePressed,
  stateChangeButton,
  loadWorld,
  button,
  setControls,
  textWraped,
  isPlaying,
  toggleButton,
  controls,
  arraysEqual,
  stopGameMusic,
  isMusicListPlaying,
} from "./toolbox.js";
let scroller = 0;

export function renderMainMenu() {
  try {
    //This is here so chrome does not give a lot of errors if the player has not yet
    //interacted with the canvas
    if (!musicMuted && !isPlaying(mainMenuMusic)) {
      mainMenuMusic.play();
    }
  } catch (err) {}

  var longest = width > height ? width : height;
  renderImage(menuBackground, 0, 0, longest, longest);
  /*scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }*/

  setFontSize(width / 10, "MainFont");
  fill("white");
  text(
    "The Devils Dungeon",
    centerText("The Devils Dungeon", width / 2, 0),
    height / 4
  );
  setFontSize(64, "MainFont");
  stateChangeButton("Play", height / 2, 80, 20, states.game);
  setFontSize(34, "MainFont");

  stateChangeButton("Settings", height / 2 + 100, 50, 0, states.settings);
  stateChangeButton("Credits", height / 2 + 170, 50, 0, states.credits);
  stateChangeButton("How to Play", height / 2 + 150 + 90, 50, 0, states.help);

  /*var textWidth = getTextWidth("Play");
  if (
    inArea(
      mouseX,
      mouseY,
      centerText("Play", width / 2, 0) - textWidth * 0.25,
      height / 2 - 35,
      textWidth * 1.5,
      50
    )
  ) {
    if (mousePressed) {
      setState(states.game);
    }
    fill("yellow");
  } else fill("white");
  rectOutline(
    centerText("Play", width / 2, 0) - textWidth * 0.25,
    height / 2 - 35,
    textWidth * 1.5,
    50,
    3
  );

  text("Play", centerText("Play", width / 2, 0), height / 2);*/
  if (width < 720 || height < 600) {
    let fontSize = 18;
    rectOutline(5, 5, width - 10, height - 10);
    setFontSize(fontSize, "MainFont");
    textWraped(
      "Small screen Warning! NLThings May not fit/display as intended. Min Recommend Screen Size: 720P",
      5,
      15,
      width - 10,
      fontSize
    );
  }
}

let blockHelp = [
  "This is a floor block. You can walk over it",
  "This is a wall block. It stops you, its solid.",
  "These are crates and they can be pushed from any direction. NLNote: You are not strong enough to push more than 1 block at a time.",
  "Get on here to win the level (Exit)",
  "This block rotates you when you stand on the block. it wont rotate any blocks you are pushing",
  "This is a exit, but it requires a key to beat this level",
  "This is a key, its used on locked exits",
  "This is a Crate that can only be pushed Up & Down NLNote: You are not strong enough to push more than 1 block at a time.",
  "This is also a Crate, it can only be pushed Left & Right NL Note: You are not strong enough to push more than 1 block at a time.",
];

let pageNumber = 0;
let arrowLeft = new Image();
arrowLeft.src = `${filePrefix}/assets/misc/ArrowLeft.png`;
let arrowRight = new Image();
arrowRight.src = `${filePrefix}/assets/misc/ArrowRight.png`;
let resetTimes = 0;
export function howToPlay() {
  if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;

  scroller++;
  if (scroller % blockSize == 0) {
    scroller = 0;
    resetTimes++;
  }
  var longest = width > height ? width : height;

  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      /*renderImage(
        stoneWall,
        i * blockSize + scroller,
        j * blockSize + scroller,
        blockSize,
        blockSize
      );*/
      blocks
        .get(0)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }
  try {
    var plrx = /*player.x * blockSize + */ mapoffsetX;
    var plry = /*player.x * blockSize + */ mapoffsetX;

    if (!inArea(plrx, plry, -1000, -1000, width + 1000, height + 1000)) {
      //This is to reset the scrolling of the background so it loops perfectly with the hidden level
      resetTimes = -12.8;
      //player.setplayerPos(0, 0);
    }

    setMapOffset(
      scroller + resetTimes * blockSize,
      scroller + resetTimes * blockSize
    );
    renderLvl();
    player.render();
    player.update();
  } catch (err) {}
  fill("#ffffff66");

  rect(width / 3, height / 3, width / 3, height / 2);

  rect(10, height / 3, width / 5, height / 2);
  fill("white");
  setFontSize(60, "MainFont");

  text("Help", 60, height / 3 + 60);

  setFontSize(12, "MainFont");

  var howtoplayText =
    "Use WASD to move. Once you start " +
    "moving in a direction you cant " +
    "move again till you hit a solid block. " +
    "If you mess up you can press R to restart." +
    "Each block has its own behavior, and to the" +
    " right of here you will see what each " +
    "block does.";
  //width / 5, 2
  textWraped(howtoplayText, 20, height / 3 + 100, width / 5 - 20, 20);

  //Arrows
  if (inArea(mouseX, mouseY, width / 3 - 10, height / 2, 50, height / 10)) {
    if (mousePressed) {
      pageNumber--;
      buttonPress.currentTime = 0;
      buttonPress.play();
    }
    if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;
    fill("yellow");
  } else {
    fill("white");
  }
  rect(width / 3 - 10, height / 2, 50, height / 10);
  renderImage(arrowLeft, width / 3 - 10, height / 2, 50, height / 10);
  if (
    inArea(
      mouseX,
      mouseY,
      width - width / 3 - 50 + 10,
      height / 2,
      50,
      height / 10
    )
  ) {
    if (mousePressed) {
      pageNumber++;
      buttonPress.currentTime = 0;
      buttonPress.play();
    }
    if (pageNumber < 0 || pageNumber > totalBlocks) pageNumber = 0;

    fill("yellow");
  } else {
    fill("white");
  }
  rect(width - width / 3 - 50 + 10, height / 2, 50, height / 10);
  renderImage(
    arrowRight,
    width - width / 3 - 50 + 10,
    height / 2,
    50,
    height / 10
  );

  blocks
    .get(pageNumber)
    .render(
      width / 3 + width / 3 / 2 - blockSize,
      height / 3 + height / 3 / 2 - blockSize * 2,
      blockSize * 2,
      blockSize * 2
    );

  fill("white");
  //rect(width / 3, height / 3 + height / 3 / 2 + blockSize * 2, width / 3, 50);
  setFontSize(20, "MainFont");
  textWraped(
    blockHelp[pageNumber],
    width / 3 + 10,
    height / 3 + height / 3 / 2 + blockSize * 2 + 30,
    width / 3 - 20,
    20
  );

  /*text(
    blockHelp[pageNumber],
    centerText(blockHelp[pageNumber], width / 2, 0),
    height / 3 + height / 3 / 2 + blockSize * 2
  );*/
}

export function settingsMenu() {
  scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      /*renderImage(
          stoneWall,
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );*/
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }
  /*button("WASD", 90, 200, 100, 60, 5, () => {
    setControls([87, 65, 83, 68]);
  });
  button("Arrow Keys", 290, 200, 100, 60, 5, () => {
    setControls([38, 37, 40, 39]);
  });
*/
  let yOffset = height / 6;
  toggleButton(
    "Use Arrow Keys To Move",
    "Use WASD To Move",

    width / 2,
    110 + yOffset,
    100,
    60,
    5,
    arraysEqual(controls, [38, 37, 40, 39]),
    (bool) => {
      if (!bool) setControls([38, 37, 40, 39]);
      else setControls([87, 65, 83, 68]);
    }
  );
  toggleButton(
    "Mute Music",
    "Un-Mute Music",
    width / 2,
    180 + yOffset,
    100,
    60,
    5,
    musicMuted,
    (bool) => {
      setMuted(!bool);
    }
  );

  toggleButton(
    "Show FPS",
    "Hide FPS",
    width / 2,
    250 + yOffset,
    100,
    60,
    5,
    showFPS,
    (bool) => {
      setShowFPS(!bool);
    }
  );
  toggleButton(
    "Use Roman Numerals",
    "Use Normal Numbers",
    width / 2,
    320 + yOffset,
    100,
    60,
    5,
    useRomanNumerals,
    (bool) => {
      setuseRomanNumerals(!bool);
    }
  );

  toggleButton(
    "Enable Story Mode",
    "Disable Story Mode",
    width / 2,
    390 + yOffset,
    100,
    60,
    5,
    showDialogue,
    (bool) => {
      setShowDialogue(!bool);
    }
  );
}

export function creditsScreen() {
  scroller++;
  if (scroller % blockSize == 0) scroller = 0;
  for (var i = -1; i < width / blockSize; i++) {
    for (var j = -1; j < height / blockSize; j++) {
      blocks
        .get(1)
        .render(
          i * blockSize + scroller,
          j * blockSize + scroller,
          blockSize,
          blockSize
        );
    }
  }

  setFontSize(width / 20, "MainFont");
  fill("white");
  textWraped(
    "KevinWho .... Programmer/Artist/Designer NLNLWeloveindies .... Music",
    40,
    height / 2,
    width - 80,
    50
  );

  setFontSize(20, "MainFont");
  fill("white");
  text(
    "This game was made for the 2020 Devtober Gamejam",
    width -
      getTextWidth("This game was made for the 2020 Devtober Gamejam") -
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
}

export function winScreen() {
  if (!musicMuted && !winScreenMusic.isPlaying) {
    stopGameMusic();
    winScreenMusic.play();
  }
  var longest = width > height ? width : height;
  renderImage(menuBackground, 0, 0, longest, longest);
  setFontSize("150", "ariel");

  fill("white");
  text("You Win!", centerText("You Win!", width / 2, 0), height / 3);
  setFontSize("24", "ariel");

  //stateChangeButton("Menu", (height / 4) * 2.5, 50, -5, states.menu);
  button("Menu", width / 2, (height / 4) * 2.5, 100, 50, 0, () => {
    winScreenMusic.pause();
    winScreenMusic.currentTime = 0;
    setState(states.menu);
  });

  button("Restart", width / 2, (height / 4) * 2.5 + 60, 100, 50, 0, () => {
    winScreenMusic.pause();
    winScreenMusic.currentTime = 0;
    setLvl(0);
    
    setState(states.menu);
  });
}
