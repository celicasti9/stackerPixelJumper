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

    init() {
        this.stackerImg.onload = () => {
            this.context.drawImage(
                this.stackerImg,
                this.stacker.x,
                this.stacker.y,
                this.stacker.width,
                this.stacker.height
            );
        };

        this.lastObstacleTime = 0;
        this.obstacleInterval = 1500; // milliseconds

        this.update(); // Start the game loop
    }

    update() {
        this.animationFrame = requestAnimationFrame(this.update.bind(this));

        if (this.gameOver) {
            return;
        }

        this.context.clearRect(0, 0, this.board.width, this.board.height);

        // Stacker
        this.velocityY += this.gravity;
        this.stacker.y = Math.max(this.stacker.y + this.velocityY, 0);
        this.context.drawImage(
            this.stackerImg,
            this.stacker.x,
            this.stacker.y,
            this.stacker.width,
            this.stacker.height
        );

        if (this.stacker.y > this.board.height) {
            this.gameOver = true;
        }

        // Obstacles
        this.placeObstacles();

        // Clear obstacles
        while (
            this.obstacleArray.length > 0 &&
            this.obstacleArray[0].x < -this.obstacleWidth
        ) {
            this.obstacleArray.shift();
        }

        // Score
        this.context.fillStyle = "white";
        this.context.font = "45px sans-serif";
        this.context.fillText(this.score, 5, 45);

        if (this.gameOver) {
            this.context.fillText("You're done Stacker!", 5, 90);
        }
    }

    placeObstacles() {
        const timestamp = performance.now();

        if (timestamp - this.lastObstacleTime > this.obstacleInterval) {
            this.lastObstacleTime = timestamp;

            let randomObstacleY =
                this.obstacleY -
                this.obstacleHeight / 4 -
                Math.random() * (this.obstacleHeight / 2);
            let openingSpace = this.board.height / 4;

            let topObstacle = {
                img: this.topObstacleImg,
                x: this.obstacleX,
                y: randomObstacleY,
                width: this.obstacleWidth,
                height: this.obstacleHeight,
                passed: false,
            };
            this.obstacleArray.push(topObstacle);

            let bottomObstacle = {
                img: this.bottomObstacleImg,
                x: this.obstacleX,
                y: randomObstacleY + this.obstacleHeight + openingSpace,
                width: this.obstacleWidth,
                height: this.obstacleHeight,
                passed: false,
            };
            this.obstacleArray.push(bottomObstacle);
        }

        for (let i = 0; i < this.obstacleArray.length; i++) {
            let obstacle = this.obstacleArray[i];
            obstacle.x += this.velocityX;
            this.context.drawImage(
                obstacle.img,
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );

            if (!obstacle.passed && this.stacker.x > obstacle.x + obstacle.width) {
                this.score += 0.5;
                obstacle.passed = true;

                // Play score sound
                this.scoreAudio.currentTime = 0;
                this.scoreAudio.play();
            }

            if (this.detectCollision(this.stacker, obstacle)) {
                this.gameOver = true;

                // Play collision sound
                this.collisionAudio.currentTime = 0;
                this.collisionAudio.play();
            }
        }
    }
    
    moveStacker(e) {
        if (this.gameOver) {
            // Restart the game on any key press after game over
            this.restart();
            return;
        }

        if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
            this.velocityY = -6;

            // Play jump sound
            this.jumpAudio.currentTime = 0;
            this.jumpAudio.play();
        }
    }

    detectCollision(a, b) {
        const collision =
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;

        return collision;
    }

    restart() {
        this.stacker.y = this.stackerY;
        this.obstacleArray = [];
        this.score = 0;
        this.gameOver = false;
        this.velocityY = 0;

        // Clear intervals before starting a new game
        cancelAnimationFrame(this.animationFrame);
        this.lastObstacleTime = 0;

        // Start a new game
        this.init();
    }
}

// Start the game
const startGame = new Game();