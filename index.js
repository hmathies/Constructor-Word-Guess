var Word = require("./Word");
var inquirer = require("inquirer");

var wordBank = ["THE GODFATHER", "WALL-E", "SCHINDLER'S LIST", "E.T. THE EXTRA-TERRESTRIAL", "FIGHT CLUB", "THE GOOD, THE BAD & THE UGLY"]

// shuffle the wordBank into a random order (found on Stack Overflow)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

// run shuffle function
shuffle(wordBank);

var gameWord = new Word();
var round = 0;
var wrongCount = 5;
var dashfill = "_"

function startGame() {
    console.log("\n-----------\nLet's Begin\n-----------\n");
    gameWord.addLetter(wordBank[round]);
    console.log(gameWord.display() + "\n");
    inquirer
    .prompt([
        {
            name: "guess",
            message: "Guess a letter! "
        }
    ]).then(function(answer) {
        var answerUpper = answer.guess.toUpperCase();
        if (wordBank[round].includes(answerUpper)){
            gameWord.checkGuess(answerUpper);
            correctGuess();
        }
        else {
            wrongGuess();
        }

    })
}

function nextWord() {
    gameWord = new Word();
    round += 1;
    wrongCount = 5;
    gameWord.addLetter(wordBank[round]);
    console.log("Correct!!!\n");
    console.log("You got it right! Next word!\n");
    console.log(gameWord.display() + "\n\n");
    
    inquirer
    .prompt([
        {
            name: "guess",
            message: "Guess a letter! "
        }
    ]).then(function(answer) {
        var answerUpper = answer.guess.toUpperCase();
        if (wordBank[round].includes(answerUpper)){
            gameWord.checkGuess(answerUpper);
            correctGuess();
        }
        else {
            wrongGuess();
        }
    })
}

function correctGuess() {
    console.log("\n" + gameWord.display() + "\n\n");
    // if the word is incomplete...
    if (gameWord.display().includes(dashfill)) {
    console.log("Correct!!!\n")
    inquirer
    .prompt([
        {
            name: "guess",
            message: "Guess a letter! "
        }
    ]).then(function(answer) {
        var answerUpper = answer.guess.toUpperCase();
        if (wordBank[round].includes(answerUpper)){
            gameWord.checkGuess(answerUpper);
            correctGuess();
        }
        else {
            wrongGuess();
        }
    })
}
// if there are more words remaining.
else if (round < wordBank.length - 1) {
    nextWord();
}
// if the player has completed the game.
else {
    console.log("------------\nYOU WON!!!\n\nGAME OVER!!!\n------------\n");
}
}

function wrongGuess() {
    wrongCount -= 1;
    // if the player has not lost.
    if (wrongCount > 0) {
        console.log("\n" + gameWord.display() + "\n\n");
        console.log("Wrong!!!\n\n" + wrongCount + " guesses remaining\n")
        inquirer
        .prompt([
            {
                name: "guess",
                message: "Guess a letter! "
            }
        ]).then(function(answer) {
            var answerUpper = answer.guess.toUpperCase();
            if (wordBank[round].includes(answerUpper)){
                gameWord.checkGuess(answerUpper);
                correctGuess();
            }
            else {
                wrongGuess();
            }
        })
    }
    // if the player's lost.
    else {
        console.log("\n" + gameWord.display() + "\n\n");
        console.log("Wrong!!!\n\n" + wrongCount + " guesses remaining")
        console.log("\n---------\nGAME OVER\n---------\n");
    }
}

// run game
startGame();