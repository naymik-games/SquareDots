class options extends Phaser.Scene {
  constructor() {
    super("options");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {




    //  gameOptions.boardOffset.x = game.config.width / 2 - ((()) / 2;
    var off = (game.config.width - levelOptions.cols * gameOptions.gemSize) / 2;
    // gameOptions.boardOffset.x = (game.config.width - gameOptions.boardOffset.c * gameOptions.gemSize) - off;
    this.cameras.main.setBackgroundColor(0xf7eac6);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'atari', 'Options', 150).setOrigin(.5).setTint(0xc76210);
    if (appSettings.music) {
      var sstate = 1
    } else {
      var sstate = 0
    }
    var musicLabel = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'atari', 'Music: ', 60).setOrigin(1, .5).setTint(0xc76210);

    this.musicSwitch = this.add.image(game.config.width / 2, game.config.height / 2, 'switch', sstate).setOrigin(0, .5).setInteractive().setScale(1.5);
    this.musicSwitch.on('pointerdown', this.toggleMusic, this)
    this.backButton = this.add.image(game.config.width / 2, game.config.height - 150, 'menu_icons', 5).setOrigin(0).setInteractive().setScale(1.5).setTint(0xc76210);
    this.backButton.on('pointerdown', function () {
      this.scene.start('startGame');
    }, this)

  }
  toggleMusic() {
    if (appSettings.music) {
      appSettings.music = false;
      this.musicSwitch.setFrame(0)
      this.saveSetting()
    } else {
      appSettings.music = true;
      this.musicSwitch.setFrame(1)
      this.saveSetting()
    }
  }
  saveSetting() {
    localStorage.setItem('SDoptions', JSON.stringify(appSettings));
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
