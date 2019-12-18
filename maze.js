
var cols, rows; // number of cols and rows of canvas
var w = 40; // dimension of a cell in canvas
var grid = [];// array for each cell
var current;// current object
var stack = [];// stack for backtracking
var cell ; // object created with class Cell
let img; //the player
let upp = 0; // for moving the player
let down = 0;
let position = 0;//keep track of player position

function setup() {

    var canvas = createCanvas(400, 400);
    canvas.center();
    img = loadImage('img/boy.png');
    cols = floor(width / w);
    rows = floor(height / w);

// create an array that holds all cells
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    // make the first current
    current = grid[0];
}
// draw the canvas
function draw() {
    background(75);// initial background of cavas
    // show the grid
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    // load the image
    image(img,upp,down,40,40);
    //generating a make use depth first search algorithms and backtracking
    // copyright https://www.youtube.com/watch?v=HyK_Q5rrcr4
    current.visited = true;
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);// use a stack to keep track of an end point and return
        removeWalls(current, next);
        current = next;

    } else if (stack.length > 0) {
        current = stack.pop();
    }
}
// see again what is this for  at https://www.youtube.com/watch?v=D8UgRyRnvXU&t=48s
function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return (i + j * cols);
}

// create each cell as an object initial with all walls
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;

        // function for keeping track of each cell neighbours
        this.checkNeighbors = function () {
            var neighbors = [];

            var top = grid[index(i, j - 1)];
            var right = grid[index(i + 1, j)];
            var bottom = grid[index(i, j + 1)];
            var left = grid[index(i - 1, j)];

            if (top && !top.visited) {
                neighbors.push(top);
            }
            if (right && !right.visited) {
                neighbors.push(right);
            }
            if (bottom && !bottom.visited) {
                neighbors.push(bottom);
            }
            if (left && !left.visited) {
                neighbors.push(left);
            }
            if (neighbors.length > 0) {
                var r = floor(random(0, neighbors.length));
                return neighbors[r];
            } else {
                return undefined;
            }

        }

// draw lines for each object cell
        this.show = function () {
            var x = this.i * w;
            var y = this.j * w;
            stroke(256);
            if (this.walls[0]) {
                line(x, y, x + w, y);
            }
            if (this.walls[1]) {
                line(x + w, y, x + w, y + w);
            }
            if (this.walls[2]) {
                line(x + w, y + w, x, y + w);
            }
            if (this.walls[3]) {
                line(x, y + w, x, y);
            }
            // create a rectangle with different color for each visited cell
            if (this.visited) {
                noStroke();
                fill(200, 10, 192, 100);
                rect(x, y, w, w);
            }
            // create a rectangle for the last object
            fill(100,100,192,100);
            rect(360,360,w,w);
        }

    }
}


// remove walls between  neighbors
// see again https://www.youtube.com/watch?v=D8UgRyRnvXU&t=48s
function removeWalls(a, b) {

    var x = a.i - b.i;
    if (a.i != 0 || b.i != 0) {
        if (x === 1) {
            a.walls[3] = false;
            b.walls[1] = false;
        } else if (x === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        }
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

}


//player moves
function keyPressed(){
//check if there are walls on top, bottom,right and left player, if not you can move the player

    if(keyCode == UP_ARROW){
            if (!grid[position].walls[0]) {
                down = down - 40;
                position = position - 10;//update the position of player
            }
    }

    if(keyCode == DOWN_ARROW){
            if (!grid[position].walls[2]) {
                down = down + 40;
                position = position + 10;
            }
    }

    if(keyCode == RIGHT_ARROW){
            if (!grid[position].walls[1]) {
                upp = upp + 40;
                position = position + 1;

            }
    }

    if(keyCode == LEFT_ARROW){
            if (!grid[position].walls[3]) {
                upp = upp - 40;
                position = position - 1;
            }
    }
}














