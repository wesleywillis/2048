# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
• How does scoring work?
• You get a score equal to all the tiles that combine each time you shift the tiles.
• When do tiles enter the game?
• A new tile appears in an empty spot (a new tile will not appear if you press a direction but none of your tiles can move)
• How do you know if you've won?
• You reach 2048 on one of your tiles
• How do you know if you've lost?
• There is no more space to add new tiles and you can't combine any tiles on the board to make more space.
• What makes tiles move?
• The arrow keys (or other keys if you set it)
• What happens when they move?
• The tiles shift in the direction of the arrow pressed
• How would you know how far a tile should move?
• A tile will move stop moving when it is blocked by an unmatched tile or the edge of board
• How would you know if tiles would collide? What happens when tiles collide?
• Tiles will collide if they are the same number, and the tile farthest in the direction of the shift will morph into a tile that is double it's previous sum.


- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
