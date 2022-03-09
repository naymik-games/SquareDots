let groups = [{ numLevels: 12, startNum: 0, title: 'Learning' },{ numLevels: 12, startNum: 12, title: 'Wild Ice' }]
let levels = [
  {
    title: 'a title 1', 
	allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 4, maxTotalCircle: 10,
    movesGoal: 40,
    allowExtra: false, extras: 3,
    allowRover: true, rovers: 3,
	allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { rover: 3, brown: 10, orange: 10, green: 10, purple: 10, blue: 10},
    rows: 8, //max 12
    cols: 8, //7
    items: 6,
	background: 0xf7eac6
},
  {
    title: 'a title 2',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, orange: 10},
    rows: 5, //max 12
    cols: 3, //7
    items: 3,
	background: 0xbdb6c8
 },
  {
    title: 'a title 3',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {orange:20, square: 4},
        rows: 5, //max 12
    cols: 3, //7
    items: 3,
	background: 0xafbac1
  },
  {
    title: 'a title 4',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {green: 20, red: 20},
        rows: 7, //max 12
    cols: 4, //7
    items: 4,
	background: 0x8ee4af
  },
  {
    title: 'a title 5',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {blue:30, square: 8},
        rows: 6, //max 12
    cols: 8, //7
    items: 4,
	background: 0xadadad
  },
  {
    title: 'a title 6',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, blue: 10, square: 1},
    rows: 6, //max 12
    cols: 3, //7
    items: 4,
	background: 0xe7717d
  },
  {
    title: 'a title 7',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    allowBomb: false,maxBomb: 4,
    win: {square:1, purple: 20},
        rows: 6, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 8',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 25,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {purple:20},
        rows: 5, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 9',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {square: 4},
        rows: 6, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 10',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {brown:15},
        rows: 7, //max 12
    cols: 7, //7
    items: 6,
	background: 0xf7eac6
  },
  {
    title: 'a title 11',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {orange:20, brown:20},
        rows: 8, //max 12
    cols: 7, //7
    items: 6,
	background: 0xf7eac6
  },
  {
    title: 'a title 12',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {brown:10, square: 1},
        rows: 5, //max 12
    cols: 5, //7
    items: 6,
	background: 0xf7eac6
  },
  //group 2
    {
    title: 'a title 13', 
	allowWild: true, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 4, maxTotalCircle: 10,
    movesGoal: 40,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 3,
	allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 10, orange: 10, green: 10, purple: 10, red: 10, blue: 10},
    rows: 7, //max 12
    cols: 7, //7
    items: 6,
	background: 0xf7eac6
},
  {
    title: 'a title 14',
    allowWild: true, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, square: 6},
    rows: 5, //max 12
    cols: 3, //7
    items: 3,
	background: 0xbdb6c8
 },
  {
    title: 'a title 15',
    allowWild: true, maxWild: 4, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 25,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {orange:30, square: 6},
        rows: 9, //max 12
    cols: 8, //7
    items: 6,
	background: 0xafbac1
  },
  {
    title: 'a title 16',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: true, extras: 6,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {ice: 6},
        rows: 4, //max 12
    cols: 4, //7
    items: 3,
	background: 0x8ee4af
  },
  {
    title: 'a title 17',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: true, extras: 6,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {ice:6, red:20},
        rows: 6, //max 12
    cols: 8, //7
    items: 4,
	background: 0xadadad
  },
  {
    title: 'a title 6',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, blue: 10, square: 1},
    rows: 6, //max 12
    cols: 3, //7
    items: 4,
	background: 0xe7717d
  },
  {
    title: 'a title 7',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    allowBomb: false,maxBomb: 4,
    win: {square:1, purple: 20},
        rows: 6, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 8',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 25,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {purple:20},
        rows: 5, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 9',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {square: 4},
        rows: 6, //max 12
    cols: 6, //7
    items: 5,
	background: 0xf7eac6
  },
  {
    title: 'a title 10',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {brown:15},
        rows: 7, //max 12
    cols: 7, //7
    items: 6,
	background: 0xf7eac6
  },
  {
    title: 'a title 11',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {orange:20, brown:20},
        rows: 8, //max 12
    cols: 7, //7
    items: 6,
	background: 0xf7eac6
  },
  {
    title: 'a title 12',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {brown:10, square: 1},
        rows: 5, //max 12
    cols: 5, //7
    items: 6,
	background: 0xf7eac6
  }
];