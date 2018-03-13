var Word = require('./word.js')
var inquirer = require('inquirer')
var isLetter = require('is-letter');


var states = ["ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS"]

var guessesRemaining = 10;
var guessedLetters = [];


var word = new Word(states[Math.floor(Math.random() * states.length)]);


function startGame() {
    console.log('\nHangman!\n')

    if (guessedLetters.length > 0) {
        guessedLetters = []
    }
    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Ready to play?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('You get 10 guesses to guess the right State.')
            console.log('Good Luck!')
            newGame(word)
        } else {
            console.log('Byebye')
        }
    })
}


var newGame = function () {
    inquirer.prompt([
        {
            name: 'letter',
            message: 'Guess a letter!',
            validate: function (value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function (answer) {
        var letterPicked = (answer.letter).toUpperCase();

        var guessedAlready = false
        for (var i = 0; i < guessedLetters.length; i++) {
            if (letterPicked === guessedLetters[i]) {
                guessedAlready = true
            }
        }

        if (guessedAlready === false) {

            guessedLetters.push(letterPicked)

            var found = word.checkIfLetterFound(letterPicked)

            if (found === 0) {
                console.log("Nope you're wrong!\n")

                guessesRemaining--

                console.log('Guesses reamaining: ' + guessesRemaining)
                console.log(word.wordRender())
                console.log('Letters guessed: ' + guessedLetters + "\n")
            } else {
                console.log('Yes! You are correct!!\n')

                if (word.checkWord() === true) {
                    console.log("\n" + word.wordRender() +"\n")
                    console.log('YOU WIN!')
                    newGame()
                } else {
                    console.log("\n" + 'Guesses remaining: ' + guessesRemaining)
                    console.log(word.wordRender())
                    console.log('Letters guessed: ' + guessedLetters+"\n")
                }
            }

            if (guessesRemaining > 0 && word.wordFound === false) {
                newGame();
            } else if (guessesRemaining === 0) { 
                console.log('GAME OVER YOU LOSE')
                console.log('The word you were trying to guess was: ' + word.word)
                startGame();
            }
        } else {
            console.log('You"ve guessed that letter already, try again.')
            newGame();
        }
    })
}

startGame();
