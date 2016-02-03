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
  space = this.findFreeSpace();
  row = space[0];
  col = space[1];
  this.removeFreeSpace(space);

  new_tile = $('<div class="tile"></div>').attr('data-row', "r" + row).attr('data-col', "c" + col).attr('data-val', val).html(val);

  $(".cells").after(new_tile);

  this.board[row][col] = val;
};

// Array.prototype.remove = function(value) {
//   if (this.indexOf(value) !== -1) {
//     this.splice(this.indexOf(value), 1);
//     return true;
//   } else {
//     return false;
//   }
// }

Game.prototype.moveTile = function(tile, direction) {
  switch(direction) {
    case 38: //up
      break;

    case 40: //down
      break;

    case 37: //left
      this.board.forEach(function(row) {
        row.forEach(function(val) {
          if (val === 0) {
            row.splice(row.indexOf(val), 1);
            row.unshift(0);
          }
        });
      });
      break;

    case 39: //right
      this.board.forEach(function(row) {
        row.forEach(function(val) {
          if (val === 0) {
            row.splice(row.indexOf(val), 1);
            row.push(0);
          }
        });
      });
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
