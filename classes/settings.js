let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
let stopFire = false;
let gameMode;
let tally = { red: 0, blue: 0, orange: 0, green: 0, purple: 0, brown: 0, circle: 0, rover: 0, ice: 0, fire: 0, square: 0, bomb: 0 }

let levelOptions = {
  title: 'a title',
  allowWild: false,
  maxWild: 3,
  maxTotalWild: 10,

  allowCircle: false,
  maxCircle: 3,
  maxTotalCircle: 10,

  movesGoal: 20,

  allowRover: false,
  rovers: 4,

  allowExtra: false,
  extras: 4,

  allowGems: false,
  maxGems: 2,
  maxTotalGems: 10,

  allowFire: false,
  maxFire: 10,

  allowBomb: false,
  maxBomb: 3,

  rows: 8, //max 12
  cols: 7, //7
  items: 6,
  background: 0xf7eac6
}
let levelOptionsNormal = {
  title: 'a title',
  allowWild: false,
  maxWild: 3,
  maxTotalWild: 10,

  allowCircle: false,
  maxCircle: 3,
  maxTotalCircle: 10,

  movesGoal: 20,

  allowRover: false,
  rovers: 4,

  allowExtra: false,
  extras: 4,

  allowGems: false,
  maxGems: 2,
  maxTotalGems: 10,

  allowFire: false,
  maxFire: 10,

  allowBomb: false,
  maxBomb: 3,

  rows: 8, //max 12
  cols: 7, //7
  items: 6,
  background: 0xf7eac6
}
let eightCount = 0;
let wildCount = 0;
let totalEightCount = 0;
let circlesEarned = 0;
let gemsEarned = 0;
let extraCount = 0;
let totalGemCount = 0;
let gemCount = 0;
let roverCount = 0;
let fireCount = 0;
var timerText;
var timedEvent;
canRemoveCount = 10;
canRemoveColorCount = 10;
canAddCount = 10;
isPaused = false;
onGroup = 0;
onLevel = 0;
let gameSetUp;
let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}