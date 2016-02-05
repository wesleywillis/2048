var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  //this.freeSpaces = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"];
  this.newTile = false;
  this.spawnTile();
  this.spawnTile();
  this.score = 0;
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
  if (spaceJam.length === 1){
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
  if (space !== undefined) {
    row = space[0];
    col = space[1];
    //this.removeFreeSpace(space);

    new_tile = $('<div class="tile"></div>').attr('data-row', "r" + row).attr('data-col', "c" + col).attr('data-val', val).html(val);

    $(".cells").after(new_tile);

    this.board[row][col] = new_tile;
  }
  else {
    // TODO handle reset stuff
  }
};

Game.prototype.moveLeft = function() {
  var rowClone, colClone, cloneIndex, r, c;

  for(r=0; r<4; r++){
    cloneIndex = 0;
    rowClone = new Array(5).join('0').split('').map(parseFloat);
    for(c=0; c<4; c++){
      if (this.board[r][c] !== 0){
        rowClone[cloneIndex] = this.board[r][c];
        cloneIndex++;
      }
    }

    for (c=0; c<4; c++){
      this.newTile = this.newTile || (rowClone[c] !== this.board[r][c]);
    }
    this.board[r] = rowClone;
  }
};

Game.prototype.moveRight = function() {
  var rowClone, colClone, cloneIndex, r, c;

  for(r=0; r<4; r++){
    cloneIndex = 3;
    rowClone = new Array(5).join('0').split('').map(parseFloat);
    for(c=3; c>=0; c--){
      if (this.board[r][c] !== 0){
        rowClone[cloneIndex] = this.board[r][c];
        cloneIndex--;
      }
    }

    for (c=0; c<4; c++){
      this.newTile = this.newTile || (rowClone[c] !== this.board[r][c]);
    }
    this.board[r] = rowClone;
  }
};

Game.prototype.moveUp = function() {
  var rowClone, colClone, cloneIndex, r, c;

  for(c=0; c<4; c++){
    cloneIndex = 0;
    colClone = new Array(5).join('0').split('').map(parseFloat);
    for(r=0; r<4; r++){
      if (this.board[r][c] !== 0){
        colClone[cloneIndex] = this.board[r][c];
        cloneIndex++;
      }
    }

    for(r=0; r<4; r++){
      this.newTile = this.newTile || (colClone[r] !== this.board[r][c]);
      this.board[r][c] = colClone[r];
    }
  }
};

Game.prototype.moveDown = function() {
  var rowClone, colClone, cloneIndex, r, c;

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
    for(r=3; r>=0; r--){
      this.newTile = this.newTile || (colClone[r] !== this.board[r][c]);
      this.board[r][c] = colClone[r];
    }
  }
};

Game.prototype.moveTile = function(direction) {
  switch(direction) {
    case 38: //up
      this.moveUp();
      this.mergeUp();
      this.moveUp();
      this.updateDisplay();
      if (this.newTile) {
        this.spawnTile();
      }
      this.newTile = false;
      break;

    case 40: //down
      this.moveDown();
      this.mergeDown();
      this.moveDown();
      this.updateDisplay();
      if (this.newTile) {
        this.spawnTile();
      }
      this.newTile = false;
      break;

    case 37: //left
      this.moveLeft();
      this.mergeLeft();
      this.moveLeft();
      this.updateDisplay();
      if (this.newTile) {
        this.spawnTile();
      }
      this.newTile = false;
      break;

    case 39: //right
      this.moveRight();
      this.mergeRight();
      this.moveRight();
      this.updateDisplay();
      if (this.newTile) {
        this.spawnTile();
      }
      this.newTile = false;
      break;
  }
};

Game.prototype.mergeLeft = function() {
  for(var r=0; r<4; r++){
    for(var c=0; c<3; c++){
      dom = this.board[r][c];
      nextDom = this.board[r][c+1];

      if (dom !== 0 && nextDom !== 0) {
        val = parseInt(dom.attr('data-val'));
        nextVal = parseInt(nextDom.attr('data-val'));
        if (val === nextVal){
          score = val*2;
          this.updateScore(score);
          nextDom.attr('data-val', score).text(score);
          this.board[r][c] = 0;
          dom.remove();
        }
      }
    }
  }
};

Game.prototype.mergeRight = function() {
  for(var r=0; r<4; r++){
    for(var c=3; c>=1; c--){
      dom = this.board[r][c];
      nextDom = this.board[r][c-1];

      if (dom !== 0 && nextDom !== 0) {
        val = parseInt(dom.attr('data-val'));
        nextVal = parseInt(nextDom.attr('data-val'));
        if (val === nextVal){
          score = val*2;
          this.updateScore(score);
          nextDom.attr('data-val', score).text(score);
          this.board[r][c] = 0;
          dom.remove();
        }
      }
    }
  }
};

Game.prototype.mergeUp = function() {
  for(var c=0; c<4; c++){
    for(var r=0; r<3; r++){
      dom = this.board[r][c];
      nextDom = this.board[r+1][c];

      if (dom !== 0 && nextDom !== 0) {
        val = parseInt(dom.attr('data-val'));
        nextVal = parseInt(nextDom.attr('data-val'));
        if (val === nextVal){
          score = val*2;
          this.updateScore(score);
          nextDom.attr('data-val', score).text(score);
          this.board[r][c] = 0;
          dom.remove();
        }
      }
    }
  }
};

Game.prototype.mergeDown = function() {
  for(var c=0; c<4; c++){
    for(var r=3; r>=1; r--){
      dom = this.board[r][c];
      nextDom = this.board[r-1][c];

      if (dom !== 0 && nextDom !== 0) {
        val = parseInt(dom.attr('data-val'));
        nextVal = parseInt(nextDom.attr('data-val'));
        if (val === nextVal){
          score = val*2;
          this.updateScore(score);
          nextDom.attr('data-val', score).text(score);
          this.board[r][c] = 0;
          dom.remove();
        }
      }
    }
  }
};

Game.prototype.updateScore = function(score) {
  if (score === 2048){
    this.gameWon();
  }else{
    this.score += score;
    $("#score").text(this.score);
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
  console.log("Game Over");
  $('body').off("keydown");
  $('.game-message').addClass('game-over');
  $(".game-over").prepend("<p>Game over!</p>");
  $(".lower").append("<a class='retry-button' href='javascript:history.go(0)'>Try again</a>");
};

Game.prototype.gameWon = function () {
  var game = this;
  console.log("Game Won");
  $('body').off("keydown");
  $('.game-message').addClass('game-won');
  $(".game-won").prepend("<p>You Won! You are Numberwang!</p>");
  $(".lower").append($("<a class='playing-button' href='#'>Keep Playing?</a>").click(function(event){
    $(".lower a").remove();
    $(".game-won p").remove();
    $('.game-message').removeClass('game-won');

    $('body').keydown(function(event){
      game.keyHandling(event);
    });
  }));
};

Game.prototype.keyHandling = function(event) {
  var arrows = [37, 38, 39, 40];
  if (arrows.indexOf(event.which) > -1) {
    var tile = $('.tile');
    this.moveTile(event.which);
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    game.keyHandling(event);
  });
  // $('.lower').on('click', '[playing-button] a', function(event){
    // $('.game-message').removeClass('game-won');

  // });
});
