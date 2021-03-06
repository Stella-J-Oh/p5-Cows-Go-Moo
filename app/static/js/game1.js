// Team xoxo :: Stella Oh, Constance Chen, Winnie Huang, Helena Williams
// SoftDev
// P3: ArRESTed Development, JuSt in Time
// 2021-04-21

//retrieve node in DOM via ID
var c = document.getElementById("slate");

//instantiate a CanvasRenderingContext2D object
var ctx = c.getContext("2d");

//set fill color to team color
ctx.fillStyle = "#D2E8EE";

//init global state var
var mode = "setting";
var points = 0;

var color = [
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
    ];

var playerColor = [
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

// Box width
var bw = 600;
// Box height
var bh = 600;

// draws grid
function drawBoard(){
    for (var x = 0; x <= bw; x += 100) {
        ctx.moveTo(1 + x, 0);
        ctx.lineTo(0.5 + x, bh);
    }

    for (var x = 0; x <= bh; x += 100) {
        ctx.moveTo(0, 0.5 + x);
        ctx.lineTo(bw, 0.5 + x);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}
    
//clears canvas
var clearCanvas = function () {
    if (mode == "setting"){
        console.log("clearing...");
        ctx.clearRect(0,0,c.width,c.height);
        mode = "playing";
        drawBoard();
    }
}

// creates a random pattern on the board
var randomize = function () {
    if (mode == "setting"){
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                color[i][j] = Math.floor(Math.random() * 3);
            }
        }   
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                if (color[i][j] == 1){ 
                    ctx.fillRect(i * 100, j * 100, 100, 100); 
                } 
                else{
                    color[i][j] = 0;
                }
            }
        }
    drawBoard();
    ctx.fillStyle = "black";
    ctx.font = '50px serif';
    ctx.fillText(points, 550, 50);
    ctx.fillStyle = "#D2E8EE";
    }
}

// allows player to press on boxes in the grid
var play = (e) =>  {
    if (mode == "playing"){
        x = event.offsetX; // finds the x coordinate based on distance from border
        y = event.offsetY; // finds the y coordinate based on distance from border

        x = Math.floor(x/100);
        y = Math.floor(y/100);

        playerColor [x][y] = 1;

        ctx.fillRect(x * 100, y * 100, 100, 100); 
        drawBoard();
    }
}

// assesses players guess
var assess = function () {
    if (mode == "playing"){
        mode = "assessing";
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {

                // console.log (color[i][j]);
                // console.log(playerColor[i][j]);

                if (color[i][j] != playerColor[i][j]){
                    mode = "gamerOver";
                    ctx.fillStyle = "#7d8597";
                    ctx.fillRect(0, 0, 600, 600);
                    ctx.fillStyle = "black";
                    ctx.font = "25px serif";
                    ctx.fillText("Game Over! Your score: "+points, 175, 300);

                    break;
                }
                color[i][j] = 0;
                playerColor[i][j] = 0;
            }
        }
        if (mode == "assessing"){
            points++;
            console.log(points);
            mode = "setting";
            clearCanvas();
            mode = "setting";
            randomize();
        }
    }
}

var reset = function () {
    mode = "setting";
    clearCanvas();
    points = 0;
    ctx.fillStyle = "#D2E8EE";
    color = [
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
        ];
    
    playerColor = [
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];

    mode = "setting";
    randomize();
}
var start = function () {
    randomize();
}

//event listeners
c.addEventListener("mousedown", play);
document.getElementById("start").addEventListener("click", start);
document.getElementById("clear").addEventListener("click", clearCanvas);
document.getElementById("done").addEventListener("click", assess);
document.getElementById("reset").addEventListener("click", reset);
