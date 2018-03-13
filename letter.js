var letter = function (letters) {
    this.letter = letters;
    this.show = false;
    this.letterShow = function () {
        if (this.letter == ' ') {
            this.show = true
            return '  '
        } if (this.show === false) {
            return ' _ '
        } else {
            return this.letter
        }
    };
};

module.exports = letter