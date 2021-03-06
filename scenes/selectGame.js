class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0xf7eac6);
    this.startGroup = onGroup;
    /* this.playText = this.add.bitmapText(game.config.width / 2 + 100, 75, 'atari', 'NEXT >', 60).setOrigin(.5, .5).setTint(0xc76210).setInteractive();
    this.playText.level = -1;

    this.preText = this.add.bitmapText(game.config.width / 2 - 100, 75, 'atari', '< PRE', 60).setOrigin(.5, .5).setTint(0xc76210).setInteractive();
    this.preText.level = -3; */
    /*  this.playText.on('pointerdown', function(){
        this.scene.start("PlayGame");
      }, this);*/

    this.showGroup(this.startGroup);
    this.return = this.add.image(game.config.width / 2, 1550, 'menu_icons', 5).setScale(1.5).setInteractive().setTint(0xc76210);

    //this.backText = this.add.bitmapText(game.config.width / 2, 1500, 'atari', '< back', 60).setOrigin(.5, .5).setTint(0xd8a603).setInteractive();
    this.return.level = -2;
    this.input.topOnly = true;
    this.input.on('gameobjectup', this.clickHandler, this);

    this.input.on('pointerup', this.endSwipe, this);

  }

  endSwipe(e, obj) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {

      if (swipeNormal.x > 0.8) {
        console.log('right')
        //this.handleMove(0, 1, );
        this.preGroup(obj[0], 'right')
      }
      if (swipeNormal.x < -0.8) {
        console.log('left')
        this.nextGroup(obj[0], 'left')

      }
      if (swipeNormal.y > 0.8) {

        //this.handleMove(1, 0);
      }
      if (swipeNormal.y < -0.8) {

        //this.handleMove(-1, 0);
      }
    } else {
      console.log('tap')
      if (obj[0].level > -1) {
        onLevel = obj[0].level;
        onGroup = this.startGroup;
        this.scene.pause()
        this.scene.launch('preview', { level: onLevel, group: this.startGroup });
      }

    }
  }

  showGroup(groupNum, dir) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempGroup = groupNum + 1;
    var groupTitle = this.add.bitmapText(game.config.width / 2, 200, 'atari', groups[groupNum].title, 60).setTint(0xbf5846).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1400, 'atari', tempGroup + '/' + groups.length, 60).setTint(0xbf5846).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);
    //	var levelNum = groupNum + (groups[groupNum].puzzleCount -1);

    var levelNum = groups[groupNum].startNum;


    for (var i = 0; i < groups[groupNum].numLevels; i++) {
      if (i < 3) {
        var xpos = 50 + i * 275;
        var ypos = 400;
      } else if (i < 6) {
        var xpos = 50 + (i - 3) * 275;
        var ypos = 400 + 275;
      } else if (i < 9) {
        var xpos = 50 + (i - 6) * 275;
        var ypos = 400 + 550;
      } else {
        var xpos = 50 + (i - 9) * 275;
        var ypos = 400 + 825;
      }

      var tempLevel = levelNum + 1;
      var statusText = this.add.bitmapText(xpos + 112.5, ypos - 60, 'atari', tempLevel, 70).setOrigin(.5).setTint(0x298191);
      var levelTitle = this.add.image(xpos, ypos, 'select_icons', 0).setOrigin(0, .5).setScale(.75);
      levelTitle.level = levelNum;



      if (gameSettings.levelStatus[levelNum] < 0) {
        //levelTitle.setAlpha(.5)
        levelTitle.setFrame(4);

      } else {
        levelTitle.setInteractive();
        if (gameSettings.levelStatus[levelNum] == 0) {

        } else if (gameSettings.levelStatus[levelNum] == '*') {
          levelTitle.setFrame(1);
        } else if (gameSettings.levelStatus[levelNum] == '**') {
          levelTitle.setFrame(2);

        } else if (gameSettings.levelStatus[levelNum] == '***') {
          levelTitle.setFrame(3);

        }

      }
      levelNum++;
      groupBox.add(levelTitle);
      groupBox.add(statusText);
    }




    groupBox.add(groupText);
    if (dir == 'left') {
      var xDir = +850
    } else if (dir == 'right') {
      var xDir = -850
    }
    groupBox.setPosition(xDir, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {

      }
    });
  }

  hideGroup(num, dir) {
    if (dir == 'left') {
      var xDir = -850
    } else if (dir == 'right') {
      var xDir = +850
    }
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: xDir,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.groupBox.destroy(true);
        this.showGroup(num, dir);
      }
    });

  }
  nextGroup(block, dir) {
    if (this.startGroup < groups.length - 1) {
      this.startGroup++;
    } else {
      this.startGroup = 0
    }
    this.hideGroup(this.startGroup, dir);
  }
  preGroup(block, dir) {
    if (this.startGroup > 0) {
      this.startGroup--;
    } else {
      this.startGroup = groups.length - 1
    }
    this.hideGroup(this.startGroup, dir);
  }
  clickHandler(e, block) {

    if (block.level == -2) {
      this.scene.start('startGame');
    }

  }




}