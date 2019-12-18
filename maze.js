
var cols, rows;
var w = 40;
var grid = [];// array pt fiecare celula (obiect)
var current;// obiectul curent
var stack = [];// stack for maze
var cell ;
let img;//the player
let upp = 0;//
let down = 0;
let position = 0;//index of the cell

function setup() {
    img = loadImage('img/boy.png');
    var canvas = createCanvas(400, 400);
    canvas.center();

    cols = floor(width / w);
    rows = floor(height / w);
    //frameRate(10);


    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    current = grid[0];
}

function draw() {
    background(75);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    image(img,upp,down,40,40);

    current.visited = true;
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);

        removeWalls(current, next);
        current = next;

    } else if (stack.length > 0) {
        current = stack.pop();
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return (i + j * cols);
}
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;


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
            if (this.visited) {
                noStroke();
                fill(200, 10, 192, 100);
                rect(x, y, w, w);
            }
            fill(100,100,192,100);
            rect(360,360,w,w);
        }

    }
}



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

// we want to star from left of canvas , and when we reach first right edge make it an exit
// the rest of edges must have walls


//player moves
function keyPressed(){
    //console.log(grid.length)
    if(keyCode == UP_ARROW){

            if (!grid[position].walls[0]) {
                down = down - 40;
                position = position - 10;//corecte
                console.log(position);
            }

    }
    if(keyCode == DOWN_ARROW){


            if (!grid[position].walls[2]) {
                down = down + 40;
                position = position + 10;
                console.log(position);
            }

    }
    if(keyCode == RIGHT_ARROW){
            if (!grid[position].walls[1]) {
                upp = upp + 40;
                position = position + 1;
                console.log(position);
            }

    }
    if(keyCode == LEFT_ARROW){


            if (!grid[position].walls[3]) {
                upp = upp - 40;
                position = position - 1;
                console.log(position);
            }


    }
}

    // function getKeyAndMove(e) {
    //     var key_code = e.which || e.keyCode;
    //     switch (key_code) {
    //         case 37: //left arrow key
    //             moveLeft();
    //             break;
    //         case 38: //Up arrow key
    //             moveUp();
    //             break;
    //         case 39: //right arrow key
    //             moveRight();
    //             break;
    //         case 40: //down arrow key
    //             moveDown();
    //             break;
    //     }
    // }
    //
    // function moveLeft() {
    //     objImage.style.left = parseInt(objImage.style.left) - 40 + 'px';
    //     console.log(objImage.style.left);
    // }
    //
    // function moveUp() {
    //     objImage.style.top = parseInt(objImage.style.top) - 40 + 'px';
    //     console.log(objImage.style.top);
    // }
    //
    // function moveRight() {
    //     objImage.style.left = parseInt(objImage.style.left) + 40 + 'px';
    //     console.log(objImage.style.left);
    // }
    //
    // function moveDown() {
    //     objImage.style.top = parseInt(objImage.style.top) + 40 + 'px';
    //     console.log(objImage.style.top);
    // }














