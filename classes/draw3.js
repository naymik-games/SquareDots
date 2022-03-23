class Draw3 {

  // constructor, simply turns obj information into class properties and creates
  // an array called "chain" which will contain chain information
  constructor(obj) {
    if (obj == undefined) {
      obj = {}
    }
    this.rows = (obj.rows != undefined) ? obj.rows : 8;
    this.columns = (obj.columns != undefined) ? obj.columns : 7;
    this.items = (obj.items != undefined) ? obj.items : 6;
    this.scene = obj.scene;
    if (this.items == 2) {
      this.itemArray = [0, 1];
    } else if (this.items == 3) {
      this.itemArray = [0, 1, 2];
    } else if (this.items == 4) {
      this.itemArray = [0, 1, 2, 3];
    } else if (this.items == 5) {
      this.itemArray = [0, 1, 2, 3, 4];
    } else if (this.items == 6) {
      this.itemArray = [0, 1, 2, 3, 4, 5];
    }
    this.chain = [];
    this.valueArray = [0, 1, 2, 3, 8];
    this.totalEightCount = 0;
    this.eightCount = 0;
    this.wildCount = 0;
    this.isSquare = false;
    this.squareValue = null;
    this.neighbors = [{ r: -1, c: 0 }, { r: -1, c: 1 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 1, c: 0 }, { r: 1, c: -1 }, { r: 0, c: -1 }, { r: -1, c: -1 }];
    this.neighbors4 = [{ r: -1, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 0, c: -1 }];

  }

  // returns the number of rows in board
  getRows() {
    return this.rows;
  }
  generateInitialBoard() {
    let totalSquares = this.getRows() * this.getColumns;

  }
  generateNewValue() {
    let tempval;

    if (levelOptions.allowCircle && Phaser.Math.Between(1, 100) < 5 && eightCount < levelOptions.maxCircle && totalEightCount < levelOptions.maxTotalCircle) {
      //tempval = Phaser.Math.RND.pick(this.valueArray);
      eightCount++;
      totalEightCount++;
      tempval = 8;

    } else if (levelOptions.allowWild && Phaser.Math.Between(1, 100) < 5 && wildCount < levelOptions.maxWild) {
      wildCount++;
      tempval = 6;
    } else if (levelOptions.allowFire && Phaser.Math.Between(1, 100) < 5 && fireCount < levelOptions.maxFire) {
      fireCount++;
      tempval = 24;
    } else if (levelOptions.allowGems && Phaser.Math.Between(1, 100) < 5 && gemCount < levelOptions.maxGems && totalGemCount < levelOptions.maxTotalGems) {
      //tempval = Phaser.Math.RND.pick(this.valueArray);
      gemCount++;
      totalGemCount++;
      var gemArray = [17, 18, 19, 20, 21, 22];

      var gem = Phaser.Math.Between(0, levelOptions.items - 1);
      tempval = gemArray[gem];

    } else {
      if (this.isSquare) {
        tempval = this.getRandomWithOneExclusion(this.itemArray.length, this.squareValue)
      } else {
        tempval = Math.floor(Math.random() * this.items);
      }

    }

    return tempval;
  }

  getRandomWithOneExclusion(lengthOfArray, indexToExclude) {

    var rand = null;  //an integer

    while (rand === null || rand === indexToExclude) {
      rand = Math.round(Math.random() * (lengthOfArray - 1));
    }

    return rand;
  }

  // returns the number of columns in board
  getColumns() {
    return this.columns;
  }
  printIt(i, j) {
    console.log(JSON.stringify(this.extraArray[i][j]));
  }
  // generates the game field
  generateField() {
    this.gameArray = [];
    for (let i = 0; i < this.getRows(); i++) {
      this.gameArray[i] = [];
      for (let j = 0; j < this.getColumns(); j++) {
        let randomValue = Math.floor(Math.random() * this.items);
        //   randomValue = 8;
        this.gameArray[i][j] = {
          value: this.generateNewValue(),
          isEmpty: false,
          row: i,
          column: j
        }
      }
    }
  }
  generateExtra() {
    this.extraArray = [];
    for (let i = 0; i < this.getRows(); i++) {
      this.extraArray[i] = [];
      for (let j = 0; j < this.getColumns(); j++) {
        //let randomValue = Phaser.Math.Between(1,2);
        //   randomValue = 8;
        this.extraArray[i][j] = {
          value: 2,
          hasExtra: false,//ice
          hasRover: false,
          hasBomb: false,
          row: i,
          column: j
        }
      }
    }
  }
  // returns true if the item at (row, column) is a valid pick
  validPick(row, column) {
    return row >= 0 && row < this.getRows() && column >= 0 && column < this.getColumns() && this.gameArray[row] != undefined && this.gameArray[row][column] != undefined;
  }

  getValidNeighbors(row, column) {
    var result = [];
    for (var n = 0; n < 8; n++) {
      if (this.validPick(row + this.neighbors[n].r, column + this.neighbors[n].c) && this.valueAt(row + this.neighbors[n].r, column + this.neighbors[n].c) != 24) {
        result.push({ r: row + this.neighbors[n].r, c: column + this.neighbors[n].c })
      }
    }
    return result;
  }
  isNeighborFire(row, column) {
    var result = [];
    for (var n = 0; n < 4; n++) {
      var rand = Phaser.Math.Between(0, levelOptions.items - 1)
      if (this.validPick(row + this.neighbors4[n].r, column + this.neighbors4[n].c) && this.valueAt(row + this.neighbors4[n].r, column + this.neighbors4[n].c) == 24) {
        this.gameArray[row + this.neighbors4[n].r][column + this.neighbors4[n].c].customData.setFrame(rand)
        this.gameArray[row + this.neighbors4[n].r][column + this.neighbors4[n].c].value = rand;

        result.push({ r: row + this.neighbors4[n].r, c: column + this.neighbors4[n].c })
      }
    }
    if (result.length > 0) {
      return true;
    }
  }
  // returns the value of the item at (row, column), or false if it's not a valid pick
  valueAt(row, column) {
    if (!this.validPick(row, column)) {
      return false;
    }
    return this.gameArray[row][column].value;
  }
  setValue(row, column, value) {
    this.gameArray[row][column].value = value;
  }
  //check for squares that can't be selected
  checkNonSelect(row, column) {
    return this.valueAt(row, column) == 8 || this.valueAt(row, column) == 24 || this.valueAt(row, column) == 17 || this.valueAt(row, column) == 18 || this.valueAt(row, column) == 19 || this.valueAt(row, column) == 20 || this.valueAt(row, column) == 21 || this.valueAt(row, column) == 22;
  }
  // sets a custom data of the item at (row, column)
  setCustomData(row, column, customData) {
    this.gameArray[row][column].customData = customData;
  }

  setCustomDataExtra(row, column, customData) {
    this.extraArray[row][column].customData = customData;
  }

  // returns the custom data of the item at (row, column)
  customDataOf(row, column) {
    return this.gameArray[row][column].customData;
  }
  customDataExtraOf(row, column) {
    return this.extraArray[row][column].customData;
  }


  wildStart() {
    return this.valueAt(this.getNthChainItem(0).row, this.getNthChainItem(0).column) == 6;
  }
  // returns true if the item at (row, column) continues the chain
  continuesChain(row, column) {
    if (this.valueAt(this.getNthChainItem(0).row, this.getNthChainItem(0).column) == 6) {
      if (this.getChainLength() > 1) {
        return this.valueAt(this.getNthChainItem(1).row, this.getNthChainItem(1).column) == this.valueAt(row, column) && !this.isInChain(row, column) && this.areNext(row, column, this.getLastChainItem().row, this.getLastChainItem().column);
      } else {
        return !this.isInChain(row, column) && this.areNext(row, column, this.getLastChainItem().row, this.getLastChainItem().column);
      }



    } else {
      return (this.getChainValue() == this.valueAt(row, column) || this.valueAt(row, column) == 6) && !this.isInChain(row, column) && this.areNext(row, column, this.getLastChainItem().row, this.getLastChainItem().column)

    }

  }
  makesSquare(row, column) {
    // && this.areTheSame(row, column, this.getNthChainItem(0).row, this.getNthChainItem(0).column)
    if (this.valueAt(this.getNthChainItem(0).row, this.getNthChainItem(0).column) == 6) {
      return this.isInChain(row, column) && this.getChainLength() > 3 && this.getNthChainItem(0).row == row && this.getNthChainItem(0).column == column;
    } else {
      return this.getChainValue() == this.valueAt(row, column) && this.isInChain(row, column) && this.getChainLength() > 3 && this.getNthChainItem(0).row == row && this.getNthChainItem(0).column == column;
    }
  }
  // returns true if the item at (row, column) backtracks the chain
  backtracksChain(row, column) {
    return this.getChainLength() > 1 && this.areTheSame(row, column, this.getNthChainItem(this.getChainLength() - 2).row, this.getNthChainItem(this.getChainLength() - 2).column)
  }

  // returns the n-th chain item
  getNthChainItem(n) {
    return {
      row: this.chain[n].row,
      column: this.chain[n].column
    }
  }

  // returns the path connecting all items in chain, as an object containing row, column and direction
  getPath() {
    let path = [];
    if (this.getChainLength() > 1) {
      for (let i = 1; i < this.getChainLength(); i++) {
        let deltaColumn = this.getNthChainItem(i).column - this.getNthChainItem(i - 1).column;
        let deltaRow = this.getNthChainItem(i).row - this.getNthChainItem(i - 1).row;
        let direction = 0
        direction += (deltaColumn < 0) ? Draw3.LEFT : ((deltaColumn > 0) ? Draw3.RIGHT : 0);
        direction += (deltaRow < 0) ? Draw3.UP : ((deltaRow > 0) ? Draw3.DOWN : 0);
        path.push({
          row: this.getNthChainItem(i - 1).row,
          column: this.getNthChainItem(i - 1).column,
          direction: direction
        });
      }
    }
    return path;
  }

  // returns an array with basic directions (UP, DOWN, LEFT, RIGHT) given a direction
  getDirections(n) {
    let result = [];
    let base = 1;
    while (base <= n) {
      if (base & n) {
        result.push(base);
      }
      base <<= 1;
    }
    return result;
  }

  // returns true if the number represents a diagonal movement
  isDiagonal(n) {
    return this.getDirections(n).length == 2;
  }

  // returns the last chain item
  getLastChainItem() {
    return this.getNthChainItem(this.getChainLength() - 1);
  }

  // returns chain length
  getChainLength() {
    return this.chain.length;
  }

  // returns true if the item at (row, column) is in the chain
  isInChain(row, column) {
    for (let i = 0; i < this.getChainLength(); i++) {
      let item = this.getNthChainItem(i)
      if (this.areTheSame(row, column, item.row, item.column)) {
        return true;
      }
    }
    return false;
  }

  // returns the value of items in the chain
  getChainValue() {
    return this.valueAt(this.getNthChainItem(0).row, this.getNthChainItem(0).column)
  }

  // puts the item at (row, column) in the chain
  putInChain(row, column) {
    this.chain.push({
      row: row,
      column: column
    })
  }

  // removes the last chain item and returns it
  removeLastChainItem() {
    return this.chain.pop();
  }

  // clears the chain and returns the items
  emptyChain() {
    let result = [];
    this.chain.forEach(function (item) {
      result.push(item);
    })
    this.chain = [];
    this.chain.length = 0;
    return result;
  }

  // clears the chain, set items as empty and returns the items
  destroyChain() {
    let result = [];
    this.chain.forEach(function (item) {
      result.push(item);
      this.setEmpty(item.row, item.column)
    }.bind(this))
    this.chain = [];
    this.chain.length = 0;
    return result;
  }
  removeValue(value, square) {
    // console.log('value ' + value);
    // this.getChainValue() == this.valueAt(row, column)
    if (square) {
      this.isSquare = true;
      this.squareValue = value;
      for (let i = 0; i < this.getRows(); i++) {
        for (let j = 0; j < this.getColumns(); j++) {
          // let itemtemp = this.gameArray[i][j];

          if (value == this.valueAt(i, j) && !this.isInChain(i, j)) {
            // console.log('r' + itemtemp.row + 'c' + itemtemp.column);
            this.putInChain(i, j);

          }
        }
      }
    }
    let result = [];
    this.chain.forEach(function (item) {
      result.push(item);
      if (this.isNeighborFire(item.row, item.column)) {
        console.log('fire out')
        stopFire = true;
      }

      if (this.isGem(item.row, item.column)) {
        gemCount--;
        gemsEarned++
        //console.log('gem action');
      }

      this.setEmpty(item.row, item.column)
      //ice
      for (var i = 0; i < this.getRows(); i++) {
        for (var j = 0; j < this.getColumns(); j++) {
          if (this.isExtra(i, j)) {
            if (this.extraArray[i][j].row == item.row && this.extraArray[i][j].column == item.column) {
              //  console.log(this.extraArray[i][j]);

              if (this.getExtraValue(i, j) == 0) {
                this.extraArray[i][j].customData.setAlpha(0);
                this.extraArray[i][j].hasExtra = false;
                extraCount++;
                tally.ice++;
                // this.events.emit('tally');
              } else if (this.getExtraValue(i, j) == 1) {
                var val = this.getExtraValue(i, j);
                val--;
                this.setExtraValue(i, j, val);
                //console.log('extra val ' + this.getExtraValue(i,j));
                this.extraArray[i][j].customData.setFrame(29);
              } else if (this.getExtraValue(i, j) == 2) {
                var val = this.getExtraValue(i, j);
                val--;
                this.setExtraValue(i, j, val);
                //console.log('extra val ' + this.getExtraValue(i,j));
                this.extraArray[i][j].customData.setFrame(28);
              }

            }
          }
        }
      }

      //bombs
      for (var i = 0; i < this.getRows(); i++) {
        for (var j = 0; j < this.getColumns(); j++) {
          if (this.isBomb(i, j)) {
            if (this.extraArray[i][j].row == item.row && this.extraArray[i][j].column == item.column) {
              //  console.log(this.extraArray[i][j]);

              if (this.getExtraValue(i, j) == 0) {
                this.extraArray[i][j].customData.setAlpha(0);
                this.extraArray[i][j].hasBomb = false;
                // extraCount++;
                //var bomb = this.getValidNeighbors(i, j)
                //if (bomb.length > 0) {
                //for (var b = 0; b < bomb.length; b++) {
                //result.push({ row: bomb[b].r, column: bomb[b].c })
                this.scene.setBomb = true;
                this.scene.bombLocation = { row: i, column: j }
                //}
                // }
                tally.bomb++;

                // this.events.emit('tally');
              } else if (this.getExtraValue(i, j) == 1) {
                var val = this.getExtraValue(i, j);
                val--;
                this.setExtraValue(i, j, val);
                //console.log('extra val ' + this.getExtraValue(i,j));
                this.extraArray[i][j].customData.setFrame(27);
              } else if (this.getExtraValue(i, j) == 2) {
                var val = this.getExtraValue(i, j);
                val--;
                this.setExtraValue(i, j, val);
                //console.log('extra val ' + this.getExtraValue(i,j));
                this.extraArray[i][j].customData.setFrame(26);
              }

            }
          }
        }
      }




    }.bind(this))
    this.chain = [];
    this.chain.length = 0;
    //let value = this.getChainValue();
    console.log(result)
    return result;
  }
  // checks if the items at (row, column) and (row2, column2) are the same
  areTheSame(row, column, row2, column2) {
    return row == row2 && column == column2;
  }

  // returns true if two items at (row, column) and (row2, column2) are next to each other horizontally, vertically or diagonally
  areNext(row, column, row2, column2) {
    //diagonal
    //  return (Math.abs(row - row2) + Math.abs(column - column2) == 1) || (Math.abs(row - row2) == 1 && Math.abs(column - column2) == 1);
    //no diagonal
    return (Math.abs(row - row2) == 1 && column - column2 == 0) || (Math.abs(column - column2) == 1 && row - row2 == 0);


  }

  // swap the items at (row, column) and (row2, column2) and returns an object with movement information
  swapItems(row, column, row2, column2) {
    let tempObject = Object.assign(this.gameArray[row][column]);
    this.gameArray[row][column] = Object.assign(this.gameArray[row2][column2]);
    this.gameArray[row2][column2] = Object.assign(tempObject);
    return [{
      row: row,
      column: column,
      deltaRow: row - row2,
      deltaColumn: column - column2
    },
    {
      row: row2,
      column: column2,
      deltaRow: row2 - row,
      deltaColumn: column2 - column
    }]
  }

  // set the item at (row, column) as empty
  setEmpty(row, column) {
    this.gameArray[row][column].isEmpty = true;
  }

  setExtra(row, column) {
    this.extraArray[row][column].hasExtra = true;
  }

  setExtraValue(row, column, value) {
    this.extraArray[row][column].value = value;
  }
  setBomb(row, column) {
    this.extraArray[row][column].hasBomb = true;
  }


  getExtraValue(row, column) {
    return this.extraArray[row][column].value;
  }

  // returns true if the item at (row, column) is empty
  isEmpty(row, column) {
    return this.gameArray[row][column].isEmpty;
  }
  isExtra(row, column) {
    return this.extraArray[row][column].hasExtra;
  }
  isBomb(row, column) {
    return this.extraArray[row][column].hasBomb;
  }
  isGem(i, j) {
    return this.valueAt(i, j) == 17 || this.valueAt(i, j) == 18 || this.valueAt(i, j) == 19 || this.valueAt(i, j) == 20 || this.valueAt(i, j) == 21 || this.valueAt(i, j) == 22;
  }
  // returns the amount of empty spaces below the item at (row, column)
  emptySpacesBelow(row, column) {
    let result = 0;
    if (row != this.getRows()) {
      for (let i = row + 1; i < this.getRows(); i++) {
        if (this.isEmpty(i, column)) {
          result++;
        }
      }
    }
    return result;
  }

  // arranges the board after a chain, making items fall down. Returns an object with movement information
  arrangeBoardAfterChain() {
    let result = []
    for (let i = this.getRows() - 2; i >= 0; i--) {
      for (let j = 0; j < this.getColumns(); j++) {
        let emptySpaces = this.emptySpacesBelow(i, j);
        if (!this.isEmpty(i, j) && emptySpaces > 0) {
          this.swapItems(i, j, i + emptySpaces, j)
          result.push({
            row: i + emptySpaces,
            column: j,
            deltaRow: emptySpaces,
            deltaColumn: 0
          });
        }
      }
    }

    return result;
  }

  // replenishes the board and returns an object with movement information
  replenishBoard() {
    let result = [];
    for (let i = 0; i < this.getColumns(); i++) {
      if (this.isEmpty(0, i)) {
        let emptySpaces = this.emptySpacesBelow(0, i) + 1;
        for (let j = 0; j < emptySpaces; j++) {
          // let randomValue = Math.floor(Math.random() * this.items);

          let randomValue = this.generateNewValue();
          result.push({
            row: j,
            column: i,
            deltaRow: emptySpaces,
            deltaColumn: 0
          });
          this.gameArray[j][i].value = randomValue;
          this.gameArray[j][i].isEmpty = false;

        }
      }
    }
    this.isSquare = false;
    this.squareValue = null;
    return result;
  }
}
Draw3.RIGHT = 1;
Draw3.DOWN = 2;
Draw3.LEFT = 4;
Draw3.UP = 8;