
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if(this.x > 500) {
        this.x = -60;
        this.randomSpeed();
    }
    var bugLeft = this.x - 50;
    var bugRight = this.x + 50;
    var bugTop = this.y - 50;
    var bugBottom = this.y + 50;
        //detects the collision between player and enemy.
    if (player.x > bugLeft && player.x < bugRight && player.y > bugTop && player.y < bugBottom) {
        player.resetPlayerPosition();
        gems.resetGemPosition();
        player.score-=500;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//this function provieds random speed to the enemy bugs.
Enemy.prototype.randomSpeed = function() {
    this.speed = Math.floor(Math.random() * 5 + 1) * 100;
};

//The player is defined from here within the Player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;

};

Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//made a function that resets the player position whenever called.
Player.prototype.resetPlayerPosition = function() {
    this.x = 200;
    this.y = 400;

};

//the function below handles the movement of the player by pressing the direction keys.
Player.prototype.handleInput = function (keyPress) {
    var horizontalStep = 100;
    var verticalStep = 90;
    if(keyPress === 'left') {
        this.x -=horizontalStep;
        } 
    else if(keyPress === 'right') {
        this.x +=horizontalStep;
        }
    else if(keyPress === 'up') {
        this.y -=verticalStep;
        }
    else if(keyPress === 'down') {
        this.y +=verticalStep;
        }
    else {
        console.log("WRONG KEY PRESSED");
        }
    //this loop helps to keep the player enclosed in the boundary.
    if(this.x < 0) {
        this.x = 0;
        }
    else if(this.x >= 500) {
        this.x = 400;
        }
    else if(this.y < 30) {
        this.score+=100;
        gems.resetGemPosition();
        if(this.score >= 5000) {
            alert("congratulations you won the game");
        }
        this.resetPlayerPosition();
        }
    else if(this.y >= 400) {
        this.y = 400;
        }
};
// this defines the class gem.
var Gem = function(x,y) {
     this.x = Math.floor(Math.random() * 4 + 1) * 100;
     this.y = Math.floor(Math.random() * 3 + 1) * 75;
     this.sprite = 'images/Gem-Blue.png';
};
//the function defined below detects the collision between the gem and the player
Gem.prototype.update = function(dt) {
    var gemLeft = this.x - 50;
    var gemRight = this.x + 50;
    var gemTop = this.y - 50;
    var gemBottom = this.y + 50;

    if (player.x > gemLeft && player.x < gemRight && player.y > gemTop && player.y < gemBottom) {
        this.resetGemOut();
        player.score+=200;
    }
};
//this function resets the gem position to a random location
Gem.prototype.resetGemPosition = function(dt) {
    this.x = Math.floor(Math.random() * 4 + 1) * 100;
    this.y = Math.floor(Math.random() * 3 + 1) * 75;
};
//this function repositions the gem off the canvas whenever called
Gem.prototype.resetGemOut = function() {
    this.x =-200;
};
//renders the gem on screen.
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//all the global class variables are defined below
var allEnemies = [];
    for (var i = 0; i < 3; i++) {
        var EnemyTempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
        allEnemies.push(new Enemy(-60, 60 + 85 * i, EnemyTempSpeed));
}

var player = new Player();

var gems = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
