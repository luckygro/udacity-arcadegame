// Enemies our player must avoid
class Enemy {
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(row = 2, speed = 1) {  
        this.sprite = 'images/enemy-bug.png';
        this.row = row; // 2, 3 or 4
        this.speed = speed; // 1 - 4
        this.x = -100;
        this.active = true;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + 50 * dt * this.speed;

        const max = ctx.scope.width;
        if (this.x > max) {
            this.x = -100;
        }
    }

    // Draw the enemy on the screen, required method for game
    render = function() {

        // get information about scope
        const scope = ctx.scope;

        // get image
        let img = Resources.get(this.sprite);

        // calculate pixel position
        let y = (this.row - 1) * scope.stepR + scope.offsetR - img.height / 2;
        let x = this.x;

        ctx.drawImage(img, x, y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
    }

    // handle player position
    position = (function() {
        let numR, numC,
            row, col;

        function setSize (setR, setC) {
            numR = setR;
            numC = setC
        }

        function setDefault () {
            row = 6;
            col = 1;
        }

        function shiftLeft () {
            if (col > 1) {
                col--;
            }
        }

        function shiftRight () {
            if (col < numC) {
                col++;
            }
        }

        function shiftUp () {
            if (row > 1) {
                row--;
            }
        }

        function shiftDown () {
            if (row < numR) {
                row++;
            }
        }

        function getPosition () {
            return [row, col]
        }

        function getWin () {
            return (row == 1)
        }
        
        return {
            params: setSize,
            default: setDefault,
            left: shiftLeft,
            right: shiftRight,
            up: shiftUp,
            down: shiftDown,
            get: getPosition,
            win: getWin,
        }

    })();

    reset () {
        
        // set size (number of rows / cols)
        this.position.params(ctx.scope.numR, ctx.scope.numC);

        // set default position
        this.position.default();
    }


    render () {
        
        // get player position
        const [row, col] = this.position.get();

        // get information about scope
        const scope = ctx.scope;

        // get image
        let img = Resources.get(this.sprite);

        // calculate pixel position
        let x = (col - 1) * scope.stepC + scope.offsetC - img.width / 2;
        let y = (row - 1) * scope.stepR + scope.offsetR - img.height / 2;

        this.x = x;
        this.width = img.width;

        ctx.drawImage(img, x, y);
    }


    // handle user input to shift player position
    handleInput (keyCode) {

        // Catch undefined 
        if (keyCode) {

            // shift player by pixels
            if (keyCode == 'left') { this.position.left(); }
            else if (keyCode == 'right') { this.position.right(); }
            else if (keyCode == 'up') { this.position.up(); }
            else if (keyCode == 'down') { this.position.down(); }

        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();


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
