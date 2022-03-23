class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameSettings = JSON.parse(localStorage.getItem('SDsave'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('SDsave', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }

    appSettings = JSON.parse(localStorage.getItem('SDoptions'));
    if (appSettings === null || appSettings.length <= 0) {
      localStorage.setItem('SDoptions', JSON.stringify(defaultSettings));
      appSettings = defaultSettings;
    }
    onGroup = gameSettings.group;
    //  gameOptions.boardOffset.x = game.config.width / 2 - ((()) / 2;
    var off = (game.config.width - levelOptions.cols * gameOptions.gemSize) / 2;
    // gameOptions.boardOffset.x = (game.config.width - gameOptions.boardOffset.c * gameOptions.gemSize) - off;
    this.cameras.main.setBackgroundColor(0xf7eac6);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'atari', 'SquareDots', 150).setOrigin(.5).setTint(0xc76210);

    var startTimeIcon = this.add.image(game.config.width / 2 - 225, 400, 'icons', 0).setScale(1);
    var startTime = this.add.bitmapText(game.config.width / 2 - 50, 275, 'atari', 'Play Time', 50).setOrigin(0, .5).setTint(0x000000);
    var bestScoreTime = this.add.bitmapText(game.config.width / 2 - 50, 350, 'atari', 'Best: ' + gameSettings.mostDotsTime, 40).setOrigin(0, .5).setTint(0x000000);
    startTimeIcon.setInteractive();
    startTimeIcon.on('pointerdown', this.clickHandler, this);

    var startMovesIcon = this.add.image(game.config.width / 2 - 225, 800, 'icons', 1).setScale(1);
    var startMoves = this.add.bitmapText(game.config.width / 2 - 50, 675, 'atari', 'Play Moves', 50).setOrigin(0, .5).setTint(0x000000);;
    var bestScoreMoves = this.add.bitmapText(game.config.width / 2 - 50, 750, 'atari', 'Best: ' + gameSettings.mostDotsMoves, 40).setOrigin(0, .5).setTint(0x000000);;

    startMovesIcon.setInteractive();
    startMovesIcon.on('pointerdown', this.clickHandler2, this);

    var startChallengeIcon = this.add.image(game.config.width / 2 - 225, 1200, 'icons', 2);
    var startChallenge = this.add.bitmapText(game.config.width / 2 - 50, 1075, 'atari', 'Play Challenge', 50).setOrigin(0, .5).setTint(0x000000);
    var temp = gameSettings.currentLevel + 1;
    var currentLevel = this.add.bitmapText(game.config.width / 2 - 50, 1150, 'atari', 'Level: ' + temp, 40).setOrigin(0, .5).setTint(0x000000);;

    startChallengeIcon.setInteractive();
    startChallengeIcon.on('pointerup', this.clickHandler3, this);

    this.optionsButton = this.add.image(game.config.width / 2, game.config.height - 150, 'menu_icons', 4).setOrigin(0).setInteractive().setScale(1.5).setTint(0xc76210);
    this.optionsButton.on('pointerdown', function () {
      this.scene.start('options');
    }, this)

  }
  clickHandler() {
    gameOptions.gameMode = 'time';
    //  Dispatch a Scene event
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler2() {
    gameOptions.gameMode = 'moves';
    //  Dispatch a Scene event
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  clickHandler3() {
    this.input.stopPropagation();
    gameOptions.gameMode = 'challenge';
    //  Dispatch a Scene event
    this.scene.start('selectGame');
  }
}