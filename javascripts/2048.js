var Game = function() {
  // Game logic and initialization here
  this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  this.freeSpaces = ["00", "01", "02", "03", "10", "11", "12", "13", "20", "21", "22", "23", "30", "31", "32", "33"];
  this.spawnTile();
  this.spawnTile();
};

Game.prototype.findFreeSpace = function() {
  return this.freeSpaces[Math.floor(Math.random() * this.freeSpaces.length)];
};

Game.prototype.removeFreeSpace = function(space) {
  spaces = this.freeSpaces;
  spaces.splice(spaces.indexOf(space), 1);
};

Game.prototype.spawnTile = function() {
  var val = [2, 4][Math.floor(Math.random() * 2)];
  // var row = getRandomInt(0, 3);
  // var col = getRandomInt(0, 3);
  space = this.findFreeSpace();
  row = space[0];
  col = space[1];
  this.removeFreeSpace(space);

  new_tile = $('<div class="tile"></div>').attr('data-row', "r" + row).attr('data-col', "c" + col).attr('data-val', val).html(val);

  $(".cells").after(new_tile);

  this.board[row][col] = val;
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      row = parseInt(tile[0].getAttribute('data-row').slice(-1));
      tile.attr('data-row', "r" + (row - 1));
      break;
    case 40: //down
      console.log('down');
      row = parseInt(tile[0].getAttribute('data-row').slice(-1));
      tile.attr('data-row', "r" + (row + 1));
      break;
    case 37: //left
      console.log('left');
      col = parseInt(tile[0].getAttribute('data-col').slice(-1));
      tile.attr('data-col', "c" + (col - 1));
      break;
    case 39: //right
      console.log('right');
      col = parseInt(tile[0].getAttribute('data-col').slice(-1));
      tile.attr('data-col', "c" + (col + 1));
      break;
  }
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
