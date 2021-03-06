var letter = require('./letter.js')


function Word(word) {
    this.word = word;
    this.letters = [];
    this.wordFound = false;
    this.getLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }

    this.checkWord = function () {
        if (this.letters.every(function (letter) {
            return letter.show === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }

    this.checkIfLetterFound = function (guessedLetter) {
        var whatToReturn = 0

        this.letters.forEach(function (letter) {
            if (letter.letter === guessedLetter) {
                letter.show = true
                whatToReturn++
            }
        })

        return whatToReturn
    }

    this.wordRender = function () {
        var display = ''
        
        this.letters.forEach(function (letter) {
            var currentLetter = letter.letterRender()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word