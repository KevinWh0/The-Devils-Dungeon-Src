import { tick } from "../index.js";
import { level, levelCount } from "./assetManager.js";
import {
  width,
  height,
  textWraped,
  fill,
  rectOutline,
  setFontSize,
  mousePressed,
  text,
  centerText,
  keyPressed,
  keyPushed,
} from "./toolbox.js";

let dialogue = {
  0: [
    "Welcome to my Dungeon. You better get used to it because you are never leaving.",
  ],
  1: [
    "Well, I guess you are smarter than you look.",
    "...",
    "Still, these coming parts will be too hard for you.",
  ],
  10: [
    "It looks like you have passed quite a few stages of my dungeon. Let's see you pass this one.",
    "Don't worry, if you cant, feel free to give up at any time...",
  ],
  14: ["It seems I have misjudged you, well you are never leaving this one!"],
  15: ["How!", "..."],
  /*16: [
    "I don't want to say it, but ill say it anyways...",
    "You are never leaving.",
  ],*/
  22: ["Please don't leave."],
  23: [
    "Well, fair is fair, you may leave my dungeon if you wish...",
    "...but will you come back and visit me at least?",
  ],
};

let speakTick = 0;
export function resetStartSpeakTick() {
  speakTick = tick;
}
let yOffset = -50;
export function Speak(name, text) {
  fill("white");
  setFontSize(width / 30, "MainFont");
  textWraped(name, 25, height - height / 4 - 10 + yOffset, width - 40, 20);
  rectOutline(
    20,
    height - height / 4 + yOffset,
    width - 40,
    height / 4 - 20,
    2
  );
  textWraped(
    text.substr(0, -(speakTick - tick)),
    45,
    height - height / 4 + 45 + yOffset,
    width - 80,
    width / 30
  );
}

export function triggerSpeach() {
  firstFrame = true;
  showText = true;
  speachOn = 0;
}
let showText = true;
let firstFrame = true;
let speachOn = 0;
export function runDialogue() {
  let speach = dialogue[level];
  if (!!speach && showText) {
    if (firstFrame) resetStartSpeakTick();
    firstFrame = false;
    if (!speach[speachOn]) {
      showText = false;
      return;
    }

    Speak("The Devil", speach[speachOn]);
    if (mousePressed || keyPushed) {
      //firstFrame = true;
      speachOn++;
      resetStartSpeakTick();
    }
    text(
      "Click to continue",
      centerText("Click to continue", width / 2, 0),
      height - 80
    );
  }
}
/*
if (mousePressed) resetStartSpeakTick();
Speak("The Devil", "Hello");*/
