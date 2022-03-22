let groups = [
  { numLevels: 12, startNum: 0, title: 'Practice' },
  { numLevels: 12, startNum: 12, title: 'Practice 2' },
  { numLevels: 12, startNum: 24, title: 'Circle Drop' },
  { numLevels: 12, startNum: 36, title: 'Wild Ice' }
];
let levels = [
  { "title": "Test", "rows": "8", "cols": "7", "items": "5", "background": "0x00cc29", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": false, "extras": "0", "allowFire": false, "maxFire": "0", "allowBomb": true, "maxBomb": "3", "allowRover": false, "rovers": "0", "win": { "bomb": "2" } },
  {
    title: '01-02',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: true, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { red: 10, orange: 10, circle: 3 },
    rows: 8, //max 12
    cols: 6, //7
    items: 5,
    background: 0xbdb6c8
  },
  {
    title: '01-03',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: true, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { orange: 20, square: 4, ice: 3 },
    rows: 8, //max 12
    cols: 6, //7
    items: 6,
    background: 0xafbac1
  },
  {
    title: '01-04',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: true, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { green: 20, red: 20 },
    rows: 8, //max 12
    cols: 6, //7
    items: 6,
    background: 0x8ee4af
  },
  {
    title: '01-05',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: true, maxGems: 2, maxTotalGems: 10,
    win: { blue: 30, square: 8 },
    rows: 6, //max 12
    cols: 8, //7
    items: 6,
    background: 0xadadad
  },
  {
    title: '01-06',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { red: 10, blue: 10, square: 1 },
    rows: 6, //max 12
    cols: 3, //7
    items: 4,
    background: 0xe7717d
  },
  {
    title: '01-07',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    allowBomb: false, maxBomb: 4,
    win: { square: 1, purple: 20 },
    rows: 6, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '01-08',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 25,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { purple: 20 },
    rows: 5, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '01-09',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { square: 4 },
    rows: 6, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '01-10',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 15 },
    rows: 7, //max 12
    cols: 7, //7
    items: 6,
    background: 0xf7eac6
  },
  {
    title: '01-11',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { orange: 20, brown: 20 },
    rows: 8, //max 12
    cols: 7, //7
    items: 6,
    background: 0xf7eac6
  },
  {
    title: '01-12',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 10, square: 1 },
    rows: 5, //max 12
    cols: 5, //7
    items: 6,
    background: 0xf7eac6
  },
  //group 2
  { "title": "02-01", "rows": "4", "cols": "4", "items": "3", "background": "0xffd599", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "15", "blue": "15", "orange": "15" } },
  { "title": "02-02", "rows": "5", "cols": "5", "items": "4", "background": "0xffd599", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "15", "blue": "15", "orange": "15", "green": "15" } },
  { "title": "02-03", "rows": "6", "cols": "6", "items": "3", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "50", "blue": "50", "orange": "50", "square": "10" } },
  { "title": "02-04", "rows": "6", "cols": "4", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "35", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "15", "blue": "15", "orange": "15", "green": "15", "square": "10" } },
  { "title": "02-05", "rows": "8", "cols": "6", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "26", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "20", "blue": "20", "orange": "20", "green": "20" } },
  { "title": "02-06", "rows": "7", "cols": "4", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "22", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "15", "blue": "15", "orange": "15", "green": "15" } },
  { "title": "02-07", "rows": "7", "cols": "7", "items": "3", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "36", "blue": "36", "orange": "36" } },
  { "title": "02-08", "rows": "5", "cols": "6", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "43", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "30", "blue": "30", "orange": "30", "green": "30" } },
  { "title": "02-09", "rows": "8", "cols": "5", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "40", "blue": "40", "orange": "40", "green": "40", "square": "10" } },
  { "title": "02-10", "rows": "8", "cols": "7", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "25", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "37", "blue": "34", "orange": "32", "green": "29" } },
  { "title": "02-11", "rows": "8", "cols": "7", "items": "4", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "25", "blue": "25", "orange": "25", "green": "25", "square": "6" } },
  { "title": "02-12", "rows": "8", "cols": "7", "items": "5", "background": "0xfdd8b4", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "25", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "red": "15", "blue": "15", "orange": "15", "green": "15", "purple": "15", "square": "6" } },
  //group 3
  { "title": "03-01", "rows": "8", "cols": "5", "items": "5", "background": "0xf3ff99", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": true, "maxCircle": "4", "maxTotalCircle": "10", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": false, "extras": "0", "allowRover": false, "rovers": "0", "win": { "circle": "5" } },
  {
    title: '03-02',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 33,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { red: 10, orange: 10, blue: 30, brown: 30, square: 5 },
    rows: 10, //max 12
    cols: 6, //7
    items: 6,
    background: 0xbdb6c8
  },
  {
    title: '03-03',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { square: 4 },
    rows: 4, //max 12
    cols: 4, //7
    items: 4,
    background: 0xafbac1
  },
  {
    title: '03-04',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { green: 20, red: 20 },
    rows: 7, //max 12
    cols: 4, //7
    items: 4,
    background: 0x8ee4af
  },
  {
    title: '03-05',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { blue: 30, square: 8 },
    rows: 6, //max 12
    cols: 8, //7
    items: 4,
    background: 0xadadad
  },
  {
    title: '03-06',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { red: 10, blue: 10, square: 1 },
    rows: 6, //max 12
    cols: 3, //7
    items: 4,
    background: 0xe7717d
  },
  {
    title: '03-07',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    allowBomb: false, maxBomb: 4,
    win: { square: 1, purple: 20 },
    rows: 6, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '03-08',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 25,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { purple: 20 },
    rows: 5, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '03-09',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { square: 4 },
    rows: 6, //max 12
    cols: 6, //7
    items: 5,
    background: 0xf7eac6
  },
  {
    title: '03-10',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 15 },
    rows: 7, //max 12
    cols: 7, //7
    items: 6,
    background: 0xf7eac6
  },
  {
    title: '03-11',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { orange: 20, brown: 20 },
    rows: 8, //max 12
    cols: 7, //7
    items: 6,
    background: 0xf7eac6
  },
  {
    title: '03-12',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 10, square: 1 },
    rows: 5, //max 12
    cols: 5, //7
    items: 6,
    background: 0xf7eac6
  },
  //group 4
  { "title": "04-01", "rows": "7", "cols": "5", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "5", "allowRover": false, "rovers": "0", "win": { "ice": "4" } },
  { "title": "04-02", "rows": "7", "cols": "5", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "5", "allowRover": false, "rovers": "0", "win": { "orange": "10", "square": "3", "ice": "4" } },
  { "title": "04-03", "rows": "7", "cols": "5", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "5", "allowRover": false, "rovers": "0", "win": { "red": "10", "blue": "10", "orange": "10", "green": "10", "square": "3", "ice": "5" } },
  { "title": "04-04", "rows": "7", "cols": "7", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": true, "extras": "7", "allowRover": false, "rovers": "0", "win": { "red": "10", "blue": "10", "orange": "10", "green": "10", "square": "3", "ice": "7" } },
  { "title": "04-05", "rows": "7", "cols": "7", "items": "5", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": true, "extras": "8", "allowRover": false, "rovers": "0", "win": { "red": "20", "blue": "20", "ice": "8" } },
  { "title": "04-06", "rows": "8", "cols": "4", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "8", "allowRover": false, "rovers": "0", "win": { "ice": "8" } },
  { "title": "04-07", "rows": "8", "cols": "5", "items": "5", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "8", "allowRover": false, "rovers": "0", "win": { "orange": "20", "ice": "8" } },
  { "title": "04-08", "rows": "5", "cols": "5", "items": "4", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "10", "allowExtra": true, "extras": "5", "allowRover": false, "rovers": "0", "win": { "red": "5", "blue": "5", "orange": "5", "ice": "5" } },
  { "title": "04-09", "rows": "10", "cols": "7", "items": "6", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "30", "allowExtra": true, "extras": "10", "allowRover": false, "rovers": "0", "win": { "red": "5", "blue": "5", "orange": "5", "green": "5", "purple": "5", "ice": "10" } },
  { "title": "04-10", "rows": "8", "cols": "6", "items": "5", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "20", "allowExtra": true, "extras": "10", "allowRover": false, "rovers": "0", "win": { "square": "5", "ice": "8" } },
  { "title": "04-11", "rows": "8", "cols": "6", "items": "5", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "25", "allowExtra": true, "extras": "10", "allowRover": false, "rovers": "0", "win": { "blue": "20", "green": "20", "square": "5", "ice": "10" } },
  { "title": "04-12", "rows": "6", "cols": "4", "items": "3", "background": "0xe8f1fd", "allowWild": false, "maxWild": "0", "maxTotalWild": "0", "allowCircle": false, "maxCircle": "0", "maxTotalCircle": "0", "allowGems": false, "maxGems": "0", "maxTotalGems": "0", "movesGoal": "12", "allowExtra": true, "extras": "10", "allowRover": false, "rovers": "0", "win": { "blue": "20", "square": "10", "ice": "10" } }
];
