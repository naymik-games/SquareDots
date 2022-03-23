let game;



window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, startGame, selectGame, options, preview, playGame, UI, pauseGame, endGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {
    //reset tally
    var temptally = { red: 0, blue: 0, orange: 0, green: 0, purple: 0, brown: 0, circle: 0, rover: 0, ice: 0, fire: 0, square: 0, bomb: 0 }
    tally = temptally;
    this.resetCounts();
    // 2:30 in seconds
    this.initialTime = gameOptions.defaultTime;



    //timerText = this.add.bitmapText(100, 20, 'atari', 'CD: ' + this.formatTime(this.initialTime),40).setOrigin(.5);
    // Each 1000 ms call onEvent
    if (gameOptions.gameMode == 'time' || gameOptions.gameMode == 'moves') {
      //timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
      levelOptions = levelOptionsNormal;
    }
    if (gameOptions.gameMode == 'challenge') {
      levelOptions = levels[onLevel];
    }


    this.cameras.main.setBackgroundColor(levelOptions.background);
    this.canPick = true;
    this.dragging = false;
    this.square = false;
    this.canRemove = false;
    this.canRemoveColor = false;
    this.canAdd = false;
    this.setBomb = false;
    this.bombLocation = {}


    this.backgroundMusic = this.sound.add("music1", { loop: true });
    if (appSettings.music) {
      this.backgroundMusic.play()
    }


    this.draw3 = new Draw3({
      rows: levelOptions.rows,
      columns: levelOptions.cols,
      items: levelOptions.items,
      scene: this
    });

    var boardWidth = 100 * this.draw3.getColumns();
    boardWidth = 900 - boardWidth
    gameOptions.offsetX = boardWidth / 2

    this.header = this.add.image(game.config.width / 2, game.config.height - 15, 'blank').setOrigin(.5, 1).setTint(0x3e5e71);
    this.header.displayWidth = 870;
    this.header.displayHeight = 125;




    this.squareCount = 0;



    this.rt = this.add.renderTexture(0, 0, game.config.width, game.config.height).setDepth(2);

    this.moveCount = 0;
    if (gameOptions.gameMode == 'time') {
      //this.moveIcon = this.add.image(100, 100, 'gems', 14);
    } else {
      //this.moveIcon = this.add.image(100, 100, 'gems', 13);
    }

    this.totalBlocksRemoved = 0;
    // this.moveCountText = this.add.bitmapText(150, 100, 'atari', '0', 100).setOrigin(0, .5).setTint(0x000000);

    //this.goldenSquareIcon = this.add.image(700, 100, 'gems', 8);
    // this.goldenSquareText = this.add.bitmapText(760, 100, 'atari', '0', 100).setOrigin(0,.5).setTint(0x000000);

    this.removeSquareButton = this.add.image(75, game.config.height - 190, 'gems', 12).setOrigin(.5, 0).setInteractive();
    this.removeSquareButton.on("pointerdown", this.removeDot, this);
    this.removeSquareText = this.add.bitmapText(75, game.config.height - 80, 'atari', canRemoveCount, 45).setOrigin(.5, 0).setTint(0xffffff);

    this.removeColorButton = this.add.image(250, game.config.height - 190, 'gems', 11).setOrigin(.5, 0).setInteractive();
    this.removeColorButton.on("pointerdown", this.removeColor, this);
    this.removeColorText = this.add.bitmapText(250, game.config.height - 80, 'atari', canRemoveColorCount, 45).setOrigin(.5, 0).setTint(0xffffff);

    if (gameOptions.gameMode == 'time') {
      this.addButton = this.add.image(425, game.config.height - 190, 'gems', 14).setInteractive().setOrigin(.5, 0);
    } else {
      this.addButton = this.add.image(425, game.config.height - 190, 'gems', 13).setInteractive().setOrigin(.5, 0);
    }
    //this.addButton = this.add.image(600, game.config.height - 100, 'gems', 13).setInteractive();
    this.addButton.on("pointerdown", this.addStuff, this);
    this.addText = this.add.bitmapText(425, game.config.height - 80, 'atari', canAddCount, 45).setOrigin(.5, 0).setTint(0xffffff);

    this.menuButton = this.add.image(game.config.width - 50, game.config.height - 50, 'menu_icons', 0).setOrigin(1, 1).setInteractive().setScale(.7);
    this.menuButton.on('pointerdown', function () {
      this.scene.pause();
      this.scene.pause('UI');
      this.scene.launch('pauseGame');
    }, this);
    this.replayButton = this.add.image(game.config.width - 140, game.config.height - 50, 'menu_icons', 1).setOrigin(1, 1).setInteractive().setScale(.7);
    this.replayButton.on('pointerdown', function () {
      //reset tally
      var temptally = { red: 0, blue: 0, orange: 0, green: 0, purple: 0, brown: 0, circle: 0, rover: 0, ice: 0, fire: 0, square: 0, bomb: 0 }
      tally = temptally;
      this.events.emit('tally');
      this.events.emit('moves', { moves: 0 });
      this.events.emit('dots', { dots: 0 });
      this.events.emit('resettime');
      this.scene.restart('UI');
      this.scene.restart();
    }, this)



    this.border = new Phaser.Geom.Rectangle();
    var graphics2 = this.add.graphics({ lineStyle: { width: 20, color: 0x3e5e71 } });
    var rect = new Phaser.Geom.Rectangle(gameOptions.offsetX - 5, gameOptions.offsetY - 5, levelOptions.cols * gameOptions.gemSize + 10, levelOptions.rows * gameOptions.gemSize + 10);
    graphics2.strokeRectShape(rect);
    graphics2.fillStyle(0xf7eac6,); // color: 0xRRGGBB
    graphics2.fillRectShape(rect);

    this.draw3.generateField();
    this.draw3.generateExtra();
    // this.generateRover();
    this.drawField();
    if (levelOptions.allowBlocks) {
      this.drawBlock();
    }
    if (levelOptions.allowExtra) {
      this.drawExtra();
    }
    if (levelOptions.allowRover) {
      this.drawRover();
    }
    if (levelOptions.allowBomb) {
      this.drawBomb();
    }

    this.input.on("pointerdown", this.gemSelect, this);
    this.input.on("pointermove", this.drawPath, this);
    this.input.on("pointerup", this.removeGems, this);

    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {
    if (isPaused == false) {
      this.rt.clear();
    }
    /*if (gameOptions.gameMode == 'moves' || gameOptions.gameMode == 'challenge') {
      if (this.moveCount >= levelOptions.movesGoal) {
        this.challengeWin = false;


        var time = this.time.addEvent({
          delay: 500,
          callback: function() {
            this.scene.pause('playGame');
            this.scene.launch("endGame", { outcome: 0, movesLeft: this.movesLeft, level: onLevel, totalRemoved: this.totalBlocksRemoved });
            this.scene.pause('UI');
          },
          callbackScope: this
        })

      }
    }*/

    this.removeColorText.setText(canRemoveColorCount);
    this.removeSquareText.setText(canRemoveCount);
    this.addText.setText(canAddCount);
  }



  removeDot() {
    if (canRemoveCount < 1) { return }
    // this.cameras.main.shake(200, 0.02);
    this.cameras.main.setBackgroundColor(0xa2f5b8);
    this.canRemove = true;
    this.removeSquareButton.setScale(1.3).setAlpha(.8);
  }
  addStuff() {
    if (canAddCount < 1) { return }
    // this.cameras.main.shake(200, 0.02);
    this.cameras.main.setBackgroundColor(0xa2f5b8);
    this.canAdd = true;
    this.addButton.setScale(1.3).setAlpha(.8);
  }
  removeColor() {
    if (canRemoveColorCount < 1) { return }
    // this.cameras.main.shake(200, 0.02);
    this.cameras.main.setBackgroundColor(0xa2f5b8);
    this.removeColorButton.setScale(1.3).setAlpha(.8);
    this.canRemoveColor = true;
    //this.canRemove = true;
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }



  drawField() {
    this.poolArray = [];
    this.arrowArray = [];

    for (let i = 0; i < this.draw3.getRows(); i++) {
      this.arrowArray[i] = [];
      for (let j = 0; j < this.draw3.getColumns(); j++) {



        let posX = gameOptions.offsetX + gameOptions.gemSize * j + gameOptions.gemSize / 2;
        let posY = gameOptions.offsetY + gameOptions.gemSize * i + gameOptions.gemSize / 2;

        var val = this.draw3.valueAt(i, j);

        //let gem = this.add.sprite(posX, posY, "gems", this.draw3.valueAt(i, j));
        let gem = this.add.sprite(-100, posY, "gems", val);
        gem.displayWidth = gameOptions.gemSize;
        gem.displayHeight = gameOptions.gemSize;

        this.tweens.add({
          targets: gem,
          x: posX,
          delay: 300,
          ease: 'Bounce',
          duration: 500,
          callbackScope: this,
          onComplete: function () {

          }
        })

        this.draw3.setCustomData(i, j, gem);
      }
    }
  }



  drawExtra() {
    var e = 0;
    while (e < levelOptions.extras) {
      var j = Phaser.Math.Between(0, levelOptions.cols - 1);
      var i = Phaser.Math.Between(0, levelOptions.rows - 1);
      if (!this.draw3.isBlock(i, j)) {
        this.addExtra(i, j);
        e++;
      }
    }



  }
  addExtra(i, j) {
    var j = Phaser.Math.Between(0, levelOptions.cols - 1);
    var i = Phaser.Math.Between(0, levelOptions.rows - 1);

    let posX = gameOptions.offsetX + gameOptions.gemSize * j + gameOptions.gemSize / 2;
    let posY = gameOptions.offsetY + gameOptions.gemSize * i + gameOptions.gemSize / 2;
    //var val = this.draw3.valueAt(i, j);
    //let gem = this.add.sprite(posX, posY, "gems", this.draw3.valueAt(i, j));
    let gem = this.add.sprite(-100, posY, "gems", 16);
    gem.displayWidth = gameOptions.gemSize;
    gem.displayHeight = gameOptions.gemSize;
    gem.setAlpha(1);
    this.tweens.add({
      targets: gem,
      x: posX,
      delay: 300,
      ease: 'Bounce',
      duration: 500,
      callbackScope: this,
      onComplete: function () {

      }
    });
    this.draw3.setExtra(i, j);
    this.draw3.setCustomDataExtra(i, j, gem);
  }
  drawBlock() {
    for (let x = 0; x < levelOptions.blocks.length; x++) {

      var j = levelOptions.blocks[x].col;
      var i = levelOptions.blocks[x].row;

      let posX = gameOptions.offsetX + gameOptions.gemSize * j + gameOptions.gemSize / 2;
      let posY = gameOptions.offsetY + gameOptions.gemSize * i + gameOptions.gemSize / 2;

      let gem = this.add.sprite(-100, posY, "gems", 31);
      gem.displayWidth = gameOptions.gemSize;
      gem.displayHeight = gameOptions.gemSize;
      gem.setAlpha(1);
      this.tweens.add({
        targets: gem,
        x: posX,
        delay: 300,
        ease: 'Bounce',
        duration: 500,
        callbackScope: this,
        onComplete: function () {

        }
      });
      this.draw3.setBlock(i, j);
      this.draw3.setCustomDataExtra(i, j, gem);
      this.draw3.setExtraValue(i, j, 31)
    }
  }
  drawBomb() {
    var b = 0;
    while (b < levelOptions.maxBomb) {
      var j = Phaser.Math.Between(0, levelOptions.cols - 1);
      var i = Phaser.Math.Between(0, levelOptions.rows - 1);
      if (!this.draw3.isExtra(i, j) && !this.draw3.isBlock(i, j)) {
        this.addBomb(i, j);
        b++;
      }
    }
  }


  addBomb(i, j) {
    let posX = gameOptions.offsetX + gameOptions.gemSize * j + gameOptions.gemSize / 2;
    let posY = gameOptions.offsetY + gameOptions.gemSize * i + gameOptions.gemSize / 2;
    //var val = this.draw3.valueAt(i, j);
    //let gem = this.add.sprite(posX, posY, "gems", this.draw3.valueAt(i, j));
    let gem = this.add.sprite(-100, posY, "gems", 25);
    gem.displayWidth = gameOptions.gemSize;
    gem.displayHeight = gameOptions.gemSize;
    gem.setAlpha(1);
    this.tweens.add({
      targets: gem,
      x: posX,
      delay: 300,
      ease: 'Bounce',
      duration: 500,
      callbackScope: this,
      onComplete: function () {

      }
    });
    this.draw3.setBomb(i, j);
    this.draw3.setCustomDataExtra(i, j, gem);
  }

  removeField() {
    for (let i = 0; i < this.draw3.getRows(); i++) {
      for (let j = 0; j < this.draw3.getColumns(); j++) {
        //  this.gameArray[i][j]
        this.tweens.add({
          targets: this.draw3.customDataOf(i, j),
          //x: -100,
          alpha: 0,
          delay: 0,
          ease: 'Linear',
          duration: 500,
          callbackScope: this,
          onComplete: function () {
            //timedEvent = this.time.addEvent({ delay: 2000, callback: this.gameOver, callbackScope: this, loop: false });
            this.endResults();
            //this.gameOver();
          }
        })
      }
    }
  }
  gemSelect(pointer) {
    if (this.canPick) {
      let row = Math.floor((pointer.y - gameOptions.offsetY) / gameOptions.gemSize);
      let col = Math.floor((pointer.x - gameOptions.offsetX) / gameOptions.gemSize);
      if (this.draw3.validPick(row, col)) {
        if (this.draw3.checkNonSelect(row, col)) { return }
        if (!this.canRemove && !this.canRemoveColor && !this.canAdd) {
          this.canPick = false;

          if (levelOptions.allowRover) {
            if (this.isRover(row, col)) {
              this.selectRover(row, col);
            }
          }
          this.draw3.putInChain(row, col)
          this.draw3.customDataOf(row, col).alpha = 0.5;
          this.draw3.customDataOf(row, col).setScale(.5);
          this.dragging = true;
        } else if (this.canRemove) {
          this.cameras.main.shake(200, 0.02);
          this.cameras.main.setBackgroundColor(0xf7eac6);
          this.removeSquareButton.setScale(1).setAlpha(1);
          canRemoveCount--;
          this.removeSquareText.setText(canRemoveCount);
          this.draw3.putInChain(row, col)
          this.draw3.customDataOf(row, col).alpha = 0.5;
          this.draw3.customDataOf(row, col).setScale(.5);
          this.dragging = true;

        } else if (this.canRemoveColor) {
          this.cameras.main.shake(200, 0.02);
          this.cameras.main.setBackgroundColor(0xf7eac6);
          this.removeColorButton.setScale(1).setAlpha(1);
          canRemoveColorCount--;
          this.removeColorText.setText(canRemoveColorCount);
          this.draw3.putInChain(row, col)
          this.draw3.customDataOf(row, col).alpha = 0.5;
          this.draw3.customDataOf(row, col).setScale(.5);
          this.dragging = true;

          // this.canRemoveColor = false;
        } else if (this.canAdd) {
          this.cameras.main.shake(200, 0.02);
          this.cameras.main.setBackgroundColor(0xf7eac6);
          this.addButton.setScale(1).setAlpha(1);
          canAddCount--;
          this.canAdd = false;
          this.addText.setText(canAddCount);
          if (gameOptions.gameMode == 'time') {


            this.events.emit('addtime', { amount: 15 });
          } else {
            this.events.emit('addmoves', { amount: 5 });

          }
        }
      }
    }
  }
  drawPath(pointer) {
    if (this.dragging) {
      let row = Math.floor((pointer.y - gameOptions.offsetY) / gameOptions.gemSize);
      let col = Math.floor((pointer.x - gameOptions.offsetX) / gameOptions.gemSize);
      if (this.draw3.checkNonSelect(row, col)) { return }
      if (this.draw3.validPick(row, col)) {
        let distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.draw3.customDataOf(row, col).x, this.draw3.customDataOf(row, col).y);
        if (distance < gameOptions.gemSize * 0.4) {
          if (this.draw3.continuesChain(row, col)) {
            if (levelOptions.allowRover) {
              if (this.isRover(row, col)) {
                this.selectRover(row, col);
              }
            }

            this.draw3.customDataOf(row, col).alpha = 0.5;
            this.draw3.customDataOf(row, col).setScale(.5);
            this.draw3.putInChain(row, col);
            this.square = false;
            //this.displayPath()
          } else if (this.draw3.makesSquare(row, col)) {
            //   console.log('square');
            this.square = true;
            this.cameras.main.setBackgroundColor(0x0c1445);
            if (this.draw3.wildStart()) {
              var tempval = this.draw3.valueAt(this.draw3.getNthChainItem(1).row, this.draw3.getNthChainItem(1).column);
            } else {
              var tempval = this.draw3.getChainValue();
            }
            for (let i = 0; i < this.draw3.getRows(); i++) {
              for (let j = 0; j < this.draw3.getColumns(); j++) {
                if (this.draw3.valueAt(i, j) == this.gemEquivilant(tempval)) {
                  this.gemAction(j);

                }

                if (tempval == this.draw3.valueAt(i, j) && !this.draw3.isInChain(i, j)) {
                  this.draw3.customDataOf(i, j).alpha = .5;
                  this.draw3.customDataOf(i, j).setScale(.5);
                }
              }
            }
          }
          else {
            if (this.draw3.backtracksChain(row, col)) {
              let removedItem = this.draw3.removeLastChainItem();
              this.draw3.customDataOf(removedItem.row, removedItem.column).alpha = 1;
              this.draw3.customDataOf(removedItem.row, removedItem.column).setScale(1);
              this.draw3.customDataOf(removedItem.row, removedItem.column).displayWidth = gameOptions.gemSize;
              this.draw3.customDataOf(removedItem.row, removedItem.column).displayHeight = gameOptions.gemSize;
              if (levelOptions.allowRover) {
                if (this.isRover(removedItem.row, removedItem.column)) {
                  this.clearRover(removedItem.row, removedItem.column);
                }
              }
              // this.hidePath();
              // this.displayPath();
            } else {
              // ifthis.square && this.draw3.getChainLength() > 3 && this.draw3.isInChain(row,col) && row == this.draw3.getNthChainItem(0).row && col == this.draw3.getNthChainItem(0).column);
              //  console.log('else');
              //   this.square = true;
              // this.draw3.putInChain(row, col);
              //this.displayPath();
            }
          }
        }
      }
    }
  }
  gemEquivilant(val) {
    if (val == 0) {
      return 17;
    } else if (val == 1) {
      return 18;
    } else if (val == 2) {
      return 19;
    } else if (val == 3) {
      return 20;
    } else if (val == 4) {
      return 21;
    } else if (val == 5) {
      return 22;
    }
  }
  removeGems() {
    if (this.dragging) {

      this.hidePath();
      this.dragging = false;
      let chainValue = this.draw3.getChainValue();
      if (this.draw3.wildStart()) {
        chainValue = this.draw3.valueAt(this.draw3.getNthChainItem(1).row, this.draw3.getNthChainItem(1).column);
      }

      if (this.draw3.getChainLength() < 2 && this.canRemove == false && this.canRemoveColor == false) {
        let chain = this.draw3.emptyChain();
        chain.forEach(function (item) {
          this.draw3.customDataOf(item.row, item.column).alpha = 1;
          this.draw3.customDataOf(item.row, item.column).displayWidth = gameOptions.gemSize;
          this.draw3.customDataOf(item.row, item.column).displayHeight = gameOptions.gemSize;
          if (levelOptions.allowRover) {
            if (this.isRover(item.row, item.column)) {
              this.clearRover(item.row, item.column);
            }
          }
        }.bind(this));
        this.canPick = true;
      }
      else {
        if (this.canRemoveColor) {
          this.square = true;
          this.canRemoveColor = false;
        }
        this.canRemove = false;
        let path = this.draw3.getPath();

        let gemsToRemove = this.draw3.removeValue(chainValue, this.square);
        /* this.red = 0;
         this.blue = 0;
         this.orange = 0;
         this.green = 0;
         this.purple = 0;
         this.brown = 0; */
        if (chainValue == 0) {
          tally.red += gemsToRemove.length;
          //console.log('Red ' + this.red);

        } else if (chainValue == 1) {
          tally.blue += gemsToRemove.length;

        } else if (chainValue == 2) {
          tally.orange += gemsToRemove.length;

        } else if (chainValue == 3) {
          tally.green += gemsToRemove.length;

        } else if (chainValue == 4) {
          tally.purple += gemsToRemove.length;

        } else if (chainValue == 5) {
          tally.brown += gemsToRemove.length;

        }

        this.totalBlocksRemoved += gemsToRemove.length;
        this.events.emit('dots', { dots: this.totalBlocksRemoved });

        //this.totalBlocksRemovedText.setText(this.totalBlocksRemoved);
        this.moveCount++;
        this.events.emit('moves', { moves: this.moveCount });



        if (this.square == true) {
          this.cameras.main.shake(200, 0.02);
          tally.square++;

          this.cameras.main.setBackgroundColor(levelOptions.background);
        }
        //  var etemp = this.extraGoal - extraCount;
        // this.extraText.setText(etemp);
        //var gemtemp = this.gemGoal - gemsEarned;
        //  this.gemText.setText(gemtemp);
        if (gameOptions.gameMode == 'challenge') {
          this.events.emit('tally');
        }


        let destroyed = 0;

        gemsToRemove.forEach(function (gem) {
          if (this.draw3.valueAt(gem.row, gem.column) == 6) {
            wildCount--;
          }
          if (levelOptions.allowRover) {
            this.roverHit(gem.row, gem.column);
          }
          this.poolArray.push(this.draw3.customDataOf(gem.row, gem.column))
          destroyed++;
          this.tweens.add({
            targets: this.draw3.customDataOf(gem.row, gem.column),
            alpha: 0,
            duration: gameOptions.destroySpeed,
            callbackScope: this,
            onComplete: function (event, sprite) {
              destroyed--;
              if (destroyed == 0) {
                this.makeGemsFall();
              }
            }
          });
        }.bind(this));
      }
    }
    this.square = false;
  }
  makeGemsFall() {
    let moved = 0;
    let fallingMovements = this.draw3.arrangeBoardAfterChain();
    fallingMovements.forEach(function (movement) {
      moved++;
      this.tweens.add({
        targets: this.draw3.customDataOf(movement.row, movement.column),
        y: this.draw3.customDataOf(movement.row, movement.column).y + movement.deltaRow * gameOptions.gemSize,
        ease: 'Bounce',
        duration: gameOptions.fallSpeed * Math.abs(movement.deltaRow),
        callbackScope: this,
        onComplete: function () {
          moved--;
          if (moved == 0) {
            this.canPick = true;
          }
        }
      })
    }.bind(this));
    let replenishMovements = this.draw3.replenishBoard();
    replenishMovements.forEach(function (movement) {
      moved++;
      let sprite = this.poolArray.pop();
      sprite.alpha = 1;
      sprite.displayWidth = gameOptions.gemSize;
      sprite.displayHeight = gameOptions.gemSize;

      // sprite.setScale(1);
      sprite.y = gameOptions.offsetY + gameOptions.gemSize * (movement.row - movement.deltaRow + 1) - gameOptions.gemSize / 2;
      sprite.x = gameOptions.offsetX + gameOptions.gemSize * movement.column + gameOptions.gemSize / 2,
        sprite.setFrame(this.draw3.valueAt(movement.row, movement.column));
      this.draw3.setCustomData(movement.row, movement.column, sprite);
      this.tweens.add({
        targets: sprite,
        ease: 'Bounce',
        y: gameOptions.offsetY + gameOptions.gemSize * movement.row + gameOptions.gemSize / 2,
        duration: gameOptions.fallSpeed * movement.deltaRow,
        callbackScope: this,
        onComplete: function () {
          moved--;
          if (moved == 0) {
            if (levelOptions.allowCircle) {
              this.circleCheck();
            }
            if (levelOptions.allowRover) {
              this.moveRover();
            }
            if (levelOptions.allowFire && !stopFire) {
              this.growFire();
            }
            if (levelOptions.allowBomb) {
              this.checkBomb();
            }
            this.canPick = true;
            stopFire = false;
          }
        }
      });
    }.bind(this))

    if (gameOptions.gameMode == 'moves' || gameOptions.gameMode == 'challenge') {
      if (this.moveCount >= levelOptions.movesGoal) {
        this.challengeWin = false;


        var time = this.time.addEvent({
          delay: 500,
          callback: function () {
            this.scene.pause('playGame');
            this.scene.launch("endGame", { outcome: 0, movesLeft: this.movesLeft, level: onLevel, totalRemoved: this.totalBlocksRemoved });
            this.scene.pause('UI');
            if (appSettings.music) {
              this.backgroundMusic.pause()
            }
          },
          callbackScope: this
        })

      }
    }

  }

  gemAction(col) {
    for (let i = 0; i < this.draw3.getRows(); i++) {
      for (let j = 0; j < this.draw3.getColumns(); j++) {
        if (j == col && !this.draw3.isInChain(i, j)) {
          this.draw3.customDataOf(i, j).alpha = .5;
          this.draw3.customDataOf(i, j).setScale(.5);
          this.draw3.putInChain(i, j);
          if (this.draw3.valueAt(i, j) != this.draw3.getChainValue) {
            if (this.draw3.valueAt(i, j) == 0) {
              tally.red++;

            } else if (this.draw3.valueAt(i, j) == 1) {
              tally.blue++;

            } else if (this.draw3.valueAt(i, j) == 2) {
              tally.orange++;

            } else if (this.draw3.valueAt(i, j) == 3) {
              tally.green++;

            } else if (this.draw3.valueAt(i, j) == 4) {
              tally.purple++;

            } else if (this.draw3.valueAt(i, j) == 5) {
              tally.brown++;

            }
            this.events.emit('tally');
          }
        }

      }
    }
  }
  bombAction(col) {
    for (let i = 0; i < this.draw3.getRows(); i++) {
      for (let j = 0; j < this.draw3.getColumns(); j++) {
        if (j == col && !this.draw3.isInChain(i, j)) {
          this.draw3.customDataOf(i, j).alpha = .5;
          this.draw3.customDataOf(i, j).setScale(.5);
          this.draw3.putInChain(i, j);
          if (this.draw3.valueAt(i, j) != this.draw3.getChainValue) {
            if (this.draw3.valueAt(i, j) == 0) {
              tally.red++;

            } else if (this.draw3.valueAt(i, j) == 1) {
              tally.blue++;

            } else if (this.draw3.valueAt(i, j) == 2) {
              tally.orange++;

            } else if (this.draw3.valueAt(i, j) == 3) {
              tally.green++;

            } else if (this.draw3.valueAt(i, j) == 4) {
              tally.purple++;

            } else if (this.draw3.valueAt(i, j) == 5) {
              tally.brown++;

            }
            this.events.emit('tally');
          }
        }

      }
    }
  }
  circleCheck() {
    for (let j = 0; j < this.draw3.getColumns(); j++) {
      if (8 == this.draw3.valueAt(this.draw3.getRows() - 1, j)) {

        // this.draw3.customDataOf(this.draw3.getRows()-1, j).alpha = .5;
        //this.draw3.customDataOf(this.draw3.getRows()-1, j).setScale(.5);
        this.draw3.putInChain(this.draw3.getRows() - 1, j);
      }
    }
    let gemsToRemove = this.draw3.removeValue(8, false);
    let destroyed = 0;
    gemsToRemove.forEach(function (gem) {
      //  if(this.draw3.isValueAt())
      this.poolArray.push(this.draw3.customDataOf(gem.row, gem.column))
      destroyed++;
      this.tweens.add({
        targets: this.draw3.customDataOf(gem.row, gem.column),
        alpha: 1,
        y: '+=100',
        duration: 300,
        callbackScope: this,
        onComplete: function (event, sprite) {
          destroyed--;
          eightCount--;
          //circlesEarned++;

          tally.circle++
          this.events.emit('tally');
          //var ctemp = this.circleGoal - circlesEarned;
          // this.circleText.setText(ctemp);
          if (destroyed == 0) {
            this.makeGemsFall();
          }
        }
      });
    }.bind(this));

  }
  growFire() {
    var fireArray = [];
    for (let i = 0; i < this.draw3.getRows(); i++) {
      for (let j = 0; j < this.draw3.getColumns(); j++) {
        if (this.draw3.valueAt(i, j) == 24) {
          fireArray.push({ r: i, c: j });
        }
      }
    }
    if (fireArray.length > 0) {
      var rand = Phaser.Math.Between(0, fireArray.length - 1)
      var nArray = this.draw3.getValidNeighbors(fireArray[rand].r, fireArray[rand].c);
      if (nArray.length > 0) {
        var rand = Phaser.Math.Between(0, nArray.length - 1);

        this.draw3.setValue(nArray[rand].r, nArray[rand].c, 24);
        var dot = this.draw3.customDataOf(nArray[rand].r, nArray[rand].c);
        dot.setFrame(24);
      }


    }

  }


  growFireforiginal() {
    for (let i = 0; i < this.draw3.getRows(); i++) {
      for (let j = 0; j < this.draw3.getColumns(); j++) {
        if (this.draw3.valueAt(i, j) == 24) {
          var nArray = this.draw3.getValidNeighbors(i, j);
          if (nArray.length > 0) {
            var rand = Phaser.Math.Between(0, nArray.length - 1);

            this.draw3.setValue(nArray[rand].r, nArray[rand].c, 24);
            var dot = this.draw3.customDataOf(nArray[rand].r, nArray[rand].c);
            dot.setFrame(24);
          }
        }
      }
    }
  }
  checkBomb() {
    // this.setBomb = false;
    // this.bombLocation = {}
    if (this.setBomb) {
      //console.log(this.bombLocation)
      var bresult = this.draw3.getValidNeighbors(this.bombLocation.row, this.bombLocation.column)
      console.log('result ' + JSON.stringify(bresult))
      if (bresult.length > 0) {
        for (var b = 0; b < bresult.length; b++) {
          this.draw3.customDataOf(bresult[b].r, bresult[b].c).alpha = .5;
          this.draw3.customDataOf(bresult[b].r, bresult[b].c).setScale(.5);
          this.draw3.putInChain(bresult[b].r, bresult[b].c)
        }
        console.log(this.draw3.getChainLength())
      }
      //this.draw3.putInChain(this.bombLocation.row, this.bombLocation.column)



      let gemsToRemove = this.draw3.removeValue(-1, false);
      let destroyed = 0;
      gemsToRemove.forEach(function (gem) {
        //  if(this.draw3.isValueAt())
        this.poolArray.push(this.draw3.customDataOf(gem.row, gem.column))
        destroyed++;
        this.tweens.add({
          targets: this.draw3.customDataOf(gem.row, gem.column),
          alpha: 1,
          //y: '+=100',
          scale: 2,
          duration: 300,
          callbackScope: this,
          onComplete: function (event, sprite) {
            destroyed--;
            eightCount--;
            //circlesEarned++;

            // tally.circle++
            this.events.emit('tally');
            //var ctemp = this.circleGoal - circlesEarned;
            // this.circleText.setText(ctemp);
            if (destroyed == 0) {
              this.makeGemsFall();
            }
          }
        });
      }.bind(this));




      this.setBomb = false;
      this.bombLocation = {}

    }
  }

  moveRover() {
    var timeline = this.tweens.createTimeline();
    for (let x = 0; x < this.roverArray.length; x++) {

      var rover = this.roverArray[x];
      var dir = Phaser.Math.Between(0, 3);
      dir = this.checkRoverMove(this.roverArray[x].row, this.roverArray[x].col, dir, x);

      if (dir == 0) {
        var tempr = this.roverArray[x].row - 1;
        var tempc = this.roverArray[x].col;

      } else if (dir == 1) {
        var tempr = this.roverArray[x].row + 1;
        var tempc = this.roverArray[x].col;

      } else if (dir == 2) {
        var tempr = this.roverArray[x].row;
        var tempc = this.roverArray[x].col - 1;

      } else if (dir == 3) {
        var tempr = this.roverArray[x].row;
        var tempc = this.roverArray[x].col + 1;
      }
      this.roverArray[x].row = tempr;
      this.roverArray[x].col = tempc;
      // var color = this.draw3.valueAt(tempr,tempc);
      //this.roverArray[x].setFrame(color);
      this.draw3.setValue(tempr, tempc, this.roverArray[x].value);
      this.draw3.customDataOf(tempr, tempc).setFrame(this.roverArray[x].value);

      timeline.add({
        targets: rover,
        x: gameOptions.offsetX + gameOptions.gemSize * tempc + gameOptions.gemSize / 2,
        y: gameOptions.offsetY + gameOptions.gemSize * tempr + gameOptions.gemSize / 2,
        duration: 300,
        // duration: gameOptions.fallSpeed * Math.abs(1),
        callbackScope: this,
        onComplete: function () {

        }
      });

    }
    timeline.play();
  }


  checkRoverMove(row, col, dir, x) {

    var tempCoo = this.getTempCoo(dir, x);
    if (tempCoo.tempr < 0) {
      dir = 1;
    } else if (tempCoo.tempr == this.draw3.getRows()) {
      dir = 0;
    } else if (tempCoo.tempc < 0) {
      dir = 3;
    } else if (tempCoo.tempc == this.draw3.getColumns()) {
      dir = 2;
    }

    return dir;

  }

  getTempCoo(dir, x) {
    if (dir == 0) {
      var tempr = this.roverArray[x].row - 1;
      var tempc = this.roverArray[x].col;

    } else if (dir == 1) {
      var tempr = this.roverArray[x].row + 1;
      var tempc = this.roverArray[x].col;

    } else if (dir == 2) {
      var tempr = this.roverArray[x].row;
      var tempc = this.roverArray[x].col - 1;


    } else if (dir == 3) {
      var tempr = this.roverArray[x].row;
      var tempc = this.roverArray[x].col + 1;
    }
    return { tempr: tempr, tempc: tempc }

  }
  displayPath() {
    let path = this.draw3.getPath();
    path.forEach(function (item) {
      this.arrowArray[item.row][item.column].visible = true;
      if (!this.draw3.isDiagonal(item.direction)) {
        this.arrowArray[item.row][item.column].setFrame(0);
        this.arrowArray[item.row][item.column].angle = 90 * Math.log2(item.direction);
      }
      else {
        this.arrowArray[item.row][item.column].setFrame(1);
        this.arrowArray[item.row][item.column].angle = 90 * (item.direction - 9 + ((item.direction < 9) ? (item.direction / 3) - 1 - item.direction % 2 : 0));
      }
    }.bind(this))
  }
  hidePath() {
    this.arrowArray.forEach(function (item) {
      item.forEach(function (subItem) {
        subItem.visible = false;
        subItem.angle = 0;
      })
    })
  }

  damageEmit(objX, objY) {
    var particlesColor = this.add.particles("particle_color");
    //.setTint(0x7d1414);
    var emitter = particlesColor.createEmitter({
      // particle speed - particles do not move
      // speed: 1000,
      frame: { frames: [0, 1, 2, 3], cycle: true },

      speed: {
        min: -500,
        max: 500
      },
      // particle scale: from 1 to zero
      scale: {
        start: 4,
        end: 0
      },
      // particle alpha: from opaque to transparent
      alpha: {
        start: 1,
        end: 1
      },
      // particle frequency: one particle every 100 milliseconds
      frequency: 50,
      // particle lifespan: 1 second
      lifespan: 1000
    });
    //emitter.tint.onChange(0x7d1414);
    emitter.explode(40, objX, objY);

  }

  drawRover() {
    this.roverArray = [];


    for (let x = 0; x < levelOptions.rovers; x++) {

      //var j = Phaser.Math.Between(0, levelOptions.cols - 1);
      //var i = Phaser.Math.Between(0, levelOptions.rows - 1);

      var roverco = this.placeRover();

      let posX = gameOptions.offsetX + gameOptions.gemSize * roverco.j + gameOptions.gemSize / 2;
      let posY = gameOptions.offsetY + gameOptions.gemSize * roverco.i + gameOptions.gemSize / 2;

      let gem = this.add.sprite(-100, posY, "rover", 0);
      gem.displayWidth = gameOptions.gemSize;
      gem.displayHeight = gameOptions.gemSize;

      var color = this.draw3.valueAt(roverco.i, roverco.j);
      //var color = Math.floor(Math.random() * levelOptions.items);
      gem.value = color;
      gem.strength = 3;
      gem.setFrame(color);
      gem.setAlpha(1);
      gem.hasRover = true;
      gem.row = roverco.i;
      gem.col = roverco.j;
      this.roverArray[x] = gem;
      this.tweens.add({
        targets: gem,
        x: posX,
        delay: 300,
        ease: 'Bounce',
        duration: 500,
        callbackScope: this,
        onComplete: function () {
          // console.log('r' + gem.row +', c' + gem.col)
          // console.log(gem.hasRover)
        }
      });

    }

  }
  placeRover() {
    var j = Phaser.Math.Between(0, levelOptions.cols - 1);
    var i = Phaser.Math.Between(0, levelOptions.rows - 1);
    if (this.draw3.valueAt(i, j) == 0 || this.draw3.valueAt(i, j) == 1 || this.draw3.valueAt(i, j) == 2 || this.draw3.valueAt(i, j) == 3 || this.draw3.valueAt(i, j) == 4 || this.draw3.valueAt(i, j) == 5) {
      return { i: i, j: j }
    } else {
      this.placeRover();
    }
  }
  isRover(row, col) {
    for (var x = 0; x < this.roverArray.length; x++) {
      if (this.roverArray[x].row == row && this.roverArray[x].col == col) {
        return true;

      } else {
        return false;
      }
    }
  }
  selectRover(row, col) {
    for (var x = 0; x < this.roverArray.length; x++) {
      if (this.roverArray[x].row == row && this.roverArray[x].col == col) {
        this.roverArray[x].setAlpha(.5);
        this.roverArray[x].setScale(.5);

      }
    }
  }
  clearRover(row, col) {
    for (var x = 0; x < this.roverArray.length; x++) {
      if (this.roverArray[x].row == row && this.roverArray[x].col == col) {
        this.roverArray[x].setAlpha(1);
        this.roverArray[x].setScale(1);
        this.roverArray[x].displayWidth = gameOptions.gemSize;
        this.roverArray[x].displayHeight = gameOptions.gemSize;
      }
    }
  }
  roverHit(row, col) {
    for (var x = 0; x < this.roverArray.length; x++) {
      if (this.roverArray[x].row == row && this.roverArray[x].col == col) {
        this.roverArray[x].strength--;
        this.clearRover(this.roverArray[x].row, this.roverArray[x].col);
        if (this.roverArray[x].strength == 0) {
          this.roverArray[x].setAlpha(0);
          this.roverArray.splice(x, 1);
          //  roverCount++;
          tally.rover++;
          this.events.emit('tally');
          //var rovertemp = this.roverGoal - roverCount;
          // this.roverText.setText(rovertemp);
        }
      }
    }
  }
  resetCounts() {
    eightCount = 0;
    wildCount = 0;
    totalEightCount = 0;
    circlesEarned = 0;
    gemsEarned = 0;
    extraCount = 0;
    totalGemCount = 0;
    gemCount = 0;
    roverCount = 0;
    fireCount = 0;
  }


}
/////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////
