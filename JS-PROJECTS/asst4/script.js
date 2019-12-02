function Carlane(parentElement) {
    this.element = null;
    this.width = 150;
    this.height = 150;
    this.parentElement = parentElement;
    this.left;
    this.top;
    var that = this;

    this.init = function() {
        var car = document.createElement('div');
        car.style.width = this.width + 'px';
        car.style.height = this.height + 'px';
        car.style.background = 'url(image/bluecar.png)';
        car.style.backgroundSize='contain';
        car.style.backgroundRepeat = 'no-repeat';
        car.style.backgroundPosition = 'center';
        car.style.position = 'absolute';
        this.element =car;
        parentElement.appendChild(this.element);

        return this;
    }

    this.draw = function() {
        this.left = (this.parentElement.offsetWidth / 2) - (this.width / 2); //220
        this.top = 490;

        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
    }

    this.shiftPosition = function(left) {
        that.left += left;
        this.element.style.left = that.left + 'px';
    }

    this.destroyCar = function(gameContainer) {
        gameContainer.removeChild(this.element);
        // console.log(this.element);
    }
}

function Bullet(myCar){
    console.log('hello');
    this.element = document.createElement('div');

    this.bulletleft = myCar.left +50;
    this.bullettop = myCar.top - 40;
    var bulletwidth = 50;
    var bulletheight = 50;

    this.createBullet=function(parentElement){
        this.parentElement=parentElement;
        this.element.style.width= bulletwidth+'px';
        this.element.style.height=bulletheight+'px';
        this.element.style.background = 'url(image/bullet.png)';
        // this.element.style.backgrond='url(image/bullet.png)';
        this.element.style.backgroundSize='contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.position = 'absolute';
        this.element.style.left = this.bulletleft + 'px';
        this.element.style.top = this.bullettop + 'px';

        this.parentElement.appendChild(this.element);
    }

    this.move = function() {
        this.bullettop -= 5;
        this.element.style.top = this.bullettop + 'px';
    }

    this.removeBullet = function(parentElement) {
        parentElement.removeChild(this.element);
    }

}
function EnemyCar(parentElement) {
    this.element = null;
    this.parentElement = parentElement;
    this.carTop = -100;
    this.carLeft;
    this.lane;
    var that = this;
    this.init = function() {
        this.element = document.createElement('div');
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.background = 'url(image/enemy.png)';
        this.element.style.backgroundSize='contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.position = 'absolute';
        
        this.carLeft = this.getRandomPosition();

        this.element.style.left = this.carLeft + 'px';

        this.parentElement.appendChild(this.element);

    }

    this.getRandomPosition = function() {
        this.lane = Math.floor(Math.random() * 3) + 1;
        if (this.lane === 1) {
            return 80; //enemy car at lane 1 with left = 80
        } else if (this.lane === 2) {
            return 220;
        } else {
            return 360;
        }
    }

    this.move = function() {
        this.carTop += 5;
        this.element.style.top = this.carTop + 'px';
    }

    this.destroyCar = function() {
        this.parentElement.removeChild(that.element);
    }
}

function Game() {
    var gameContainer;
    var road;
    var myCar;
    var enemyCar;
    var move = 0;
    var that = this;
    var interval;
    var score = 0;
    var enemyCars = [];
    var bullet;
    var bulletArray = [];
    var gameOver;

    this.init = function() {
        gameContainer = document.getElementById('app-container');

        //Start Button
        this.startBtn = document.createElement('button');
        this.startBtn.style.background='url(image/playbutton.png)';
        this.startBtn.style.backgroundSize='contain';
        this.startBtn.style.backgroundRepeat = 'no-repeat';
        this.startBtn.style.backgroundPosition = 'center';
        this.startBtn.style.padding = '30px 30px'
        this.startBtn.style.cursor = 'pointer';
        this.startBtn.style.position = 'absolute';
        this.startBtn.style.top = '44%';
        this.startBtn.style.left = '45%';

        //Score Board
        this.score = document.createElement('h2');
        this.score.innerHTML = 'Score<br> ' + score;
        this.score.style.position = 'absolute';
        this.score.style.color = 'black';
        this.score.style.marginLeft = '5px';
        this.score.style.marginTop = '5px';
        this.score.style.fontWeight = 'lighter';
        this.score.style.textAlign = 'center';
        this.score.style.display = 'none';
        this.startBtn.style.cursor = 'pointer';

        gameContainer.appendChild(this.startBtn);
        gameContainer.appendChild(this.score);

        this.startBtn.onclick = function() {
            that.startBtn.style.display = 'none';
            that.score.style.display = 'block';
            myCar = new Carlane(gameContainer).init();
            myCar.draw(); //setting initial position of player car.
            that.startGame();
        }

    }

    this.startGame = function() {

        road = document.getElementsByClassName('road')[0];

        document.addEventListener('keydown', function(event) {
            //left arrow
            if (event.keyCode === 37 && myCar.left != 80) {
                myCar.shiftPosition(-140); // left = 80
            }
            //right arrow
            if (event.keyCode === 39 && myCar.left != 360) {
                myCar.shiftPosition(140); // left = 360
            }

            //spacebar
            if (event.keyCode == 32) {
                bullet = new Bullet(myCar);
                bulletArray.push(bullet);
                bullet.createBullet(gameContainer);
            }
        });

        interval = setInterval(that.gameLoop, 1000 / 100);
    }

    this.gameLoop = function() {
        that.moveRoad();
        that.moveBullet();
        that.generateObstacles();
        that.checkCollision();
    }

    this.moveRoad = function() {
        move += 5;
        road.style.backgroundPositionY = move + 'px';
    }


    this.generateObstacles = function() {
        if (Math.abs(move) % 300 == 0) {
            enemyCar = new EnemyCar(gameContainer);
            enemyCars.push(enemyCar);
            enemyCar.init();
        }
        //move enemy cars
        for (var i = 0; i < enemyCars.length; i++) {
            enemyCars[i].move();

            //updating score
            if (enemyCars[i].carTop >= 600) {
                enemyCars[i].destroyCar();
                enemyCars.splice(i, 1);
                score += 1;
                this.score.innerHTML = 'Score<br>' + score;
            }

        }
    }

    this.moveBullet = function() {
        for (var i = 0; i < bulletArray.length; i++) {
            bulletArray[i].move();
        }
    }

    this.checkCollision = function() {
        var myCarLeft = myCar.left;
        var myCarTop = myCar.top;

        for (i = 0; i < enemyCars.length; i++) {
            // console.log(enemyCars[i].carLeft);
            if (myCarLeft + myCar.width > enemyCars[i].carLeft && myCarLeft < enemyCars[i].carLeft + 100 &&
                myCarTop + myCar.height > enemyCars[i].carTop && myCarTop < enemyCars[i].carTop + 100) {

                clearInterval(interval);
                that.gameOver();
            }
            for (var j = 0; j < bulletArray.length; j++) {
                if (bulletArray[j].bulletleft + 30 >= enemyCars[i].carLeft && bulletArray[j].bulletleft <= enemyCars[i].carLeft + 100 &&
                    bulletArray[j].bullettop + 30 >= enemyCars[i].carTop && bulletArray[j].bullettop <= enemyCars[i].carTop + 100) {
                    console.log('destroy');
                    enemyCars[i].destroyCar();
                    enemyCars.splice(i, 1);

                    bulletArray[j].removeBullet(gameContainer);
                    bulletArray.splice(j, 1);
                }
            }


        }


    }


    this.gameOver = function() {
        gameOver = document.getElementsByClassName('game-over')[0];

        gameOver.style.display = 'block';

        this.gameOverTxt = document.createElement('h1');
        this.gameOverTxt.innerHTML = 'GameOver!';
        this.gameOverTxt.style.textAlign = 'center';
        this.gameOverTxt.style.margin = '0 auto ';
        this.gameOverTxt.style.fontSize = '50px';
        this.gameOverTxt.style.color = 'black';
        gameOver.appendChild(this.gameOverTxt);

        this.currentScore = document.createElement('h2');
        this.currentScore.innerHTML = 'Score: ' + score;
        this.currentScore.style.textAlign = 'center';
        // this.currentScore.style.fontWeight = 'lighter';
        this.currentScore.style.margin = '4% auto';
        this.currentScore.style.color = 'black';
        gameOver.appendChild(this.currentScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.innerHTML = 'Play Again';
        this.playAgainBtn.style.padding = '10px'
        this.playAgainBtn.style.fontSize = '22px';
        this.playAgainBtn.style.cursor = 'pointer';
        gameOver.appendChild(this.playAgainBtn);

        this.playAgainBtn.onclick = function() {
            document.location.reload();
        };
       
    }

}

var game = new Game();
game.init();