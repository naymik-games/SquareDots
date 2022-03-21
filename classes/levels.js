let groups = [
{ numLevels: 12, startNum: 0, title: 'Learning' },
{ numLevels: 12, startNum: 12, title: 'Stuff' },
{ numLevels: 12, startNum: 24, title: 'Wild Ice' }
];
let levels = [
  {
    title: '01-01', 
	  allowWild: true, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 4, maxTotalCircle: 10,
    movesGoal: 40,
    allowExtra: false, extras: 3,
    allowRover: true, rovers: 3,
	  allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { rover: 3, brown: 10, orange: 10, green: 10, purple: 10, blue: 10},
    rows: 8, //max 12
    cols: 6, //7
    items: 6,
	background: 0xf7eac6
},
  {
    title: '01-02',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: true, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, orange: 10, circle: 3},
    rows: 8, //max 12
    cols: 6, //7
    items: 6,
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
    win: {orange:20, square: 4, ice: 3},
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
    win: {green: 20, red: 20},
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
    win: {blue:30, square: 8},
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
    win: {red: 10, blue: 10, square: 1},
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
    allowBomb: false,maxBomb: 4,
    win: {square:1, purple: 20},
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
    win: {purple:20},
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
    win: {square: 4},
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
    win: {brown:15},
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
    win: {orange:20, brown:20},
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
    win: {brown:10, square: 1},
        rows: 5, //max 12
    cols: 5, //7
    items: 6,
	background: 0xf7eac6
  },
  //group 2
  {
    title: '02-01', 
	allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 4, maxTotalCircle: 10,
    movesGoal: 30,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 3,
	  allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: { brown: 25, orange: 25, green: 25, purple: 25, },
    rows: 8, //max 12
    cols: 8, //7
    items: 6,
	background: 0xf7eac6
},
  {
    title: '02-02',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 33,
    allowExtra: false, extras: 3,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {red: 10, orange: 10, blue: 30, brown: 30, square: 5},
    rows: 10, //max 12
    cols: 6, //7
    items: 6,
	background: 0xbdb6c8
 },
  {
    title: '02-03',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 20,
    allowExtra: false, extras: 4,
    allowRover: false, rovers: 4,
    allowGems: false, maxGems: 2, maxTotalGems: 10,
    win: {square: 4},
        rows: 4, //max 12
    cols: 4, //7
    items: 4,
	background: 0xafbac1
  },
  {
    title: '02-04',
    allowWild: false, maxWild: 3, maxTotalWild: 10,
    allowCircle: false, maxCircle: 3, maxTotalCircle: 10,
    movesGoal: 30,
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
    title: '02-05',
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
    title: '02-06',
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
    title: '02-07',
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
    title: '02-08',
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
    title: '02-09',
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
    title: '02-10',
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
    title: '02-11',
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
    title: '02-12',
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
  //group 3
  {"title":"03-01","rows":"7","cols":"5","items":"4","background":"0xfde8e8","allowWild":false,"maxWild":"0","maxTotalWild":"0","allowCircle":false,"maxCircle":"0","maxTotalCircle":"0","allowGems":false,"maxGems":"0","maxTotalGems":"0","movesGoal":"20","allowExtra":true,"extras":"5","allowRover":false,"rovers":"0","win":{"ice":"4"}},
  {"title":"03-02","rows":"7","cols":"5","items":"4","background":"0xe8f1fd","allowWild":false,"maxWild":"0","maxTotalWild":"0","allowCircle":false,"maxCircle":"0","maxTotalCircle":"0","allowGems":false,"maxGems":"0","maxTotalGems":"0","movesGoal":"20","allowExtra":true,"extras":"5","allowRover":false,"rovers":"0","win":{"orange":"10","square":"3","ice":"4"}},
  {"title":"03-03","rows":"7","cols":"5","items":"4","background":"0xe8f1fd","allowWild":false,"maxWild":"0","maxTotalWild":"0","allowCircle":false,"maxCircle":"0","maxTotalCircle":"0","allowGems":false,"maxGems":"0","maxTotalGems":"0","movesGoal":"20","allowExtra":true,"extras":"5","allowRover":false,"rovers":"0","win":{"red":"10","blue":"10","orange":"10","green":"10","square":"3","ice":"5"}},
  {
    title: '03-04',
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
    title: '03-05',
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
    title: '03-06',
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
    title: '03-07',
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
    title: '03-08',
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
    title: '03-09',
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
    title: '03-10',
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
    title: '03-11',
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
    title: '03-12',
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
