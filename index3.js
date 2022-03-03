
let variable = []; 
let clicked = [];
let count = 1;  //Initialiaze the array that will store the values from the computer (opponent), the player and counter for the levels.
let topScore = 1;

//Event listeners: 
//Keyboard key to initiate or restart the game:
$(window).on("keydown", function () {
    if (count == 1) {
        start();
    }
});

//Button click in the corresponding color:
let current = 0; //Will check first color picked
for (let i = 0; i < $(".btn").length; i++) {
    
    $(".btn").eq(i).on("click", function () {
        console.log(count);
        let value = this.id;

        playerPlay(value);

        if (clicked[current] != variable[current]){
           return endOfGame();
        }                        //If the current pressed value coincides with the computer's pressed color, then we continue, if not the game ends, player loses.
        
        current++; //From 0 to the length of the variables (computer moves). We +1 the value to check next play (when user's presses the color).

        if (clicked.length == variable.length) {
            letsPlay();
        }                         //If the player sucessfully fill the answers without any error, both arrays will have the same length. The next level is entered.
 
    });
}

//Setting the current level:
function currentLevel(params) {
    $("h1").text("Level " + count);
}

//Starting the game:
function start() {

    currentLevel();
        
    //console.log('the game has started');
    letsPlay();
}

//The player's play:
function playerPlay(value) {
    //console.log('player play is: ' + value);
    clicked.push(value);

    buttonAnimation(value); //Store the player's answer into the 'clicked' array, and animates the pressed button.
}

//Playing the game:
function letsPlay() {
    
    //console.log("ok");
    let randomNumber = Math.floor(Math.random()*4) + 1;
                    
    if (randomNumber == 1) {
        variable.push("green");
        setTimeout(() => {
            buttonAnimation(variable[variable.length - 1]);
        }, 450);
    } else if ( randomNumber == 2 ) {
        variable.push("red");
        setTimeout(() => {
            buttonAnimation(variable[variable.length - 1]);
        }, 450);
    } else if ( randomNumber == 3 ) {
        variable.push("yellow");
        setTimeout(() => {
            buttonAnimation(variable[variable.length - 1]);
        }, 450);
    } else if ( randomNumber == 4 ) {
        variable.push("blue");
        setTimeout(() => {
            buttonAnimation(variable[variable.length - 1]);
        }, 450);
    }
    //This part generates computer's next move by randomly choosing a color. Store this value in an array and animates when it's pressed.

    if (count != 1) {
        currentLevel();
    } //Avoid changing the current level for the first level. This function works for the first one and the next moves.

    count++; //Increases the level by 1.
    clicked = []; //Reset the previous answers from the user. So he/she needs to populate it once again from the first answer.
    current = 0; //Reset the current position to check from the beginning. Every time the user must fill the answers' array from the first color.
}

//Animation of the buttons in every turn:
function buttonAnimation(variable) {

    $("."+variable).toggleClass("pressed");

    setTimeout(() => {
        $("."+variable).toggleClass("pressed");
    }, 150);
}

//When player loses:
function endOfGame(params) {
    $("h1").text("You lose! Game Over - Press any key to Restart");

    $("body").toggleClass("game-over");

    $(".btn").toggleClass("explotion");

    setTimeout(() => {
        $("body").toggleClass("game-over");
        $(".btn").toggleClass("explotion");
    }, 100);

    if (count-1 > topScore) {
        topScore = count - 1;
    } //Check if new level is the top score. Minus 1 because the script increase the count value before the end.
    
    $("h2").text("Top Score: " + topScore);
    
    count = 1; //Reset the level to the 1st level.
    variable = []; //Reset the computer's answers.
    clicked = []; //Reset the player's answers.
    current = 0; //Reset current position to the first one. Although it is also reseted after the first color pick from the computer in the function letsPlay().
}