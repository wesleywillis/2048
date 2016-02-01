var Game = function() {
  // Game logic and initialization here
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
