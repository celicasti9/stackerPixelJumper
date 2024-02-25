class Game {
    constructor() {
        // Board
        this.board = document.getElementById("board");
        this.boardWidth = 900;
        this.boardHeight = 880;
        this.board.width = this.boardWidth;
        this.board.height = this.boardHeight;
        this.context = this.board.getContext("2d");

        // Stacker
        this.stackerWidth = 34;
        this.stackerHeight = 24;
        this.stackerX = this.boardWidth / 8;
        this.stackerY = this.boardHeight / 2;
        this.stackerImg = new Image();
        this.stackerImg.src = "./stacker.png";

        this.stacker = {
            x: this.stackerX,
            y: this.stackerY,
            width: this.stackerWidth,
            height: this.stackerHeight,
        };   
        
        // Obstacles
        this.obstacleArray = [];
        this.obstacleWidth = 64;
        this.obstacleHeight = 512;
        this.obstacleX = this.boardWidth;
        this.obstacleY = 0;

        this.topObstacleImg = new Image();
        this.topObstacleImg.src = "./topObstacle.png";

        this.bottomObstacleImg = new Image();
        this.bottomObstacleImg.src = "./bottomObstacle.png";

        // Audio
        this.jumpAudio = document.getElementById("jumpAudio");
        this.collisionAudio = document.getElementById("collisionAudio");
        this.scoreAudio = document.getElementById("scoreAudio");

        // Physics
        this.velocityX = -4;
        this.velocityY = 0;
        this.gravity = 0.4;

        this.gameOver = false;
        this.score = 0;

        // Event Listeners
        this.board.addEventListener("keydown", (e) => this.moveStacker(e));
        this.board.setAttribute("tabindex", 0);
        this.board.addEventListener("click", () => this.board.focus());

        // Initialize
        this.init();
    }
}