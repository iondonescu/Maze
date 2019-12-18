class Player {
    constructor(x, y, sprite) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
}

// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };
//     player.handleInput(allowedKeys[e.keyCode]);
// });
var img = document.getElementById("player");
const player = new Player(0,0,img);
console.log(Maze.grid[0]);
// var boy = document.getElementById("boy");
//
//
// function moveBoyRight() {
//     var rightNumbers = boy.style.right.replace('px', '')
//
//     var right = parseInt(rightNumbers, 10)
//
//     if (right > 0) {
//
//         boy.style.right = `${right + 40}px`
//     }
// }
//
// document.addEventListener('keydown', function(e) {
//     if (e === 39) {
//         moveBoyRight();
//     }
// })