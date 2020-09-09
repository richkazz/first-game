var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "runningimg1.png", 10, 120, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
       var ctx = myGameArea.context;
        if (type === "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.image.src += -1;
    myGamePiece.newPos();
    myGamePiece.update();
}

function move(dir) {
    myGamePiece.image.src = "runningimg1.png";
    if (dir === "up") {myGamePiece.speedY = -1; }
    if (dir === "down") {myGamePiece.speedY = 1; }
    if (dir === "left") {myGamePiece.speedX = -1; }
    if (dir === "right") {myGamePiece.speedX = 1; }
}

function clearmove() {
    myGamePiece.image.src = "runningimg2.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}