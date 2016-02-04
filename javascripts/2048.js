var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  //this.freeSpaces = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"];
  this.spawnTile();
  this.spawnTile();
};

Game.prototype.findFreeSpace = function() {
  var spaceJam = [];
  var self = this;
  for(var r=0; r<4; r++){
    for(var c=0; c<4; c++){
      if (this.board[r][c] === 0) {
        spaceJam.push(r.toString() + c.toString());
      }
    }
  }
  if (spaceJam.length === 0){
    self.gameLost();
  }else{
    return spaceJam[Math.floor(Math.random() * spaceJam.length)];
  }
};

// Game.prototype.removeFreeSpace = function(space) {
  // spaces = this.freeSpaces;
  // spaces.splice(spaces.indexOf(space), 1);
// };
//
Game.prototype.spawnTile = function() {
  var val = [2, 4][Math.floor(Math.random() * 2)];
  space = this.findFreeSpace();
  row = space[0];
  col = space[1];
  //this.removeFreeSpace(space);

  new_tile = $('<div class="tile"></div>').attr('data-row', "r" + row).attr('data-col', "c" + col).attr('data-val', val).html(val);

  $(".cells").after(new_tile);

  this.board[row][col] = new_tile;
};

Game.prototype.moveLeft = function() {
  for(r=0; r<4; r++){
    cloneIndex = 0;
    rowClone = new Array(5).join('0').split('').map(parseFloat);
    for(c=0; c<4; c++){
      if (this.board[r][c] !== 0){
        rowClone[cloneIndex] = this.board[r][c];
        cloneIndex++;
      }
    }
    this.board[r] = rowClone;
  }
};

Game.prototype.moveTile = function(tile, direction) {
  var rowClone, colClone;
  var cloneIndex;
  var r, c;

  switch(direction) {
    case 38: //up
      for(c=0; c<4; c++){
        cloneIndex = 0;
        colClone = new Array(5).join('0').split('').map(parseFloat);
        for(r=0; r<4; r++){
          if (this.board[r][c] !== 0){
            colClone[cloneIndex] = this.board[r][c];
            cloneIndex++;
          }
        }
        // this.board[r] = colClone;
        cloneIndex = 0;
        for(r=0; r<4; r++){
          this.board[r][c] = colClone[cloneIndex];
          cloneIndex++;
        }
      }
      this.updateDisplay();
      break;

    case 40: //down
      for(c=0; c<4; c++){
        cloneIndex = 3;
        colClone = new Array(5).join('0').split('').map(parseFloat);
        for(r=3; r>=0; r--){
          if (this.board[r][c] !== 0){
            colClone[cloneIndex] = this.board[r][c];
            cloneIndex--;
          }
        }
        // this.board[r] = colClone;
        cloneIndex = 3;
        for(r=3; r>=0; r--){
          this.board[r][c] = colClone[cloneIndex];
          cloneIndex--;
        }
      }
      this.updateDisplay();
      break;

    case 37: //left
      this.moveLeft();
      this.mergeLeft();
      this.moveLeft();
      this.updateDisplay();
      this.spawnTile();
      break;

    case 39: //right
      for(r=0; r<4; r++){
        cloneIndex = 3;
        rowClone = new Array(5).join('0').split('').map(parseFloat);
        for(c=3; c>=0; c--){
          if (this.board[r][c] !== 0){
            rowClone[cloneIndex] = this.board[r][c];
            cloneIndex--;
          }
        }
        this.board[r] = rowClone;
      }
      this.updateDisplay();
      break;
  }
};

Game.prototype.mergeLeft = function() {
  for(var r=0; r<4; r++){
    for(var c=0; c<4; c++){
      dom = this.board[r][c];
      nextDom = this.board[r][c+1];

      if (dom !== 0 && nextDom !== 0 && nextDom) {
        // dom.attr('data-row', "r" + r).attr("data-col", "c" + c);
        val = parseInt(dom.attr('data-val'));
        nextVal = parseInt(nextDom.attr('data-val'));
        if (val === nextVal){
          dom.attr('data-val', val*2).text(val*2);
          this.board[r][c+1] = 0;
          // this.updateDisplay();
          nextDom.remove();
        }
      }
    }
  }
};

Game.prototype.updateDisplay = function() {
  for(var r=0; r<4; r++){
    for(var c=0; c<4; c++){
      if (this.board[r][c] !== 0) {
        dom = this.board[r][c];
        dom.attr('data-row', "r" + r).attr("data-col", "c" + c);
      }
    }
  }
};

Game.prototype.gameLost = function () {
  $('.game-message').addClass('game-over');
  $(".game-over").append("<p>Game over!</p>");

//  <div class = "game-message game-over">
//    <p>Game over!<p>
//  </div>  
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });
});
