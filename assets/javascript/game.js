var guessingGame = {
    lettersGuessed: [],
    guessWords: ["jordan", "pippen", "kerr", "grant", "hodges"],
    word: "",
    maxGuesses: 10,
    guesses: 0,
    displayWord: "____",
    wins: 0,
    losses: 0,

    setGameText: function (text) {
        var gt = document.getElementById("gameText");
        gt.textContent = text;
    },

    setLettersGuessed: function (text) {
        this.lettersGuessed = text;
        var lg = document.getElementById("lettersGuessed");
        lg.textContent = "Letters Guessed: " + text;
    },

    setDisplayWord: function (text) {
        this.displayWord = text;
        var dw = document.getElementById("displayWord");
        var temp = "";
        for (var i = 0; i < text.length; i++) {
            temp += text.charAt(i) + " ";
        }
        dw.textContent = temp;
    },

    setGuesses: function (numGuesses) {
        this.guesses = numGuesses;
        var gl = document.getElementById("guessesRemaining");
        gl.textContent = "Guesses Remaining: " + numGuesses;

    },

    setWins: function (numWins) {
        this.wins = numWins;
        var winElement = document.getElementById("wins");
        winElement.textContent = "Wins: " + numWins;
    },

    reset: function () {
        word = this.guessWords[Math.floor(Math.random() * this.guessWords.length)];
        this.displayWord = "";
        for (var i = 0; i < word.length; i++) {
            this.displayWord += "_";
        }
        this.setDisplayWord(this.displayWord);

        this.guesses = this.maxGuesses;
        this.setGuesses(this.guesses);

        this.lettersGuessed = [];
        this.setLettersGuessed(this.lettersGuessed);
    },

    processGuess: function (key) {
        if (this.lettersGuessed.indexOf(key) === -1) {
            this.lettersGuessed.push(key);
            console.log(this.lettersGuessed);
            this.setLettersGuessed(this.lettersGuessed);

            var index = 0;
            index = word.indexOf(key);
            if (index !== -1) {
                console.log("You guessed right!");
                while (index !== -1) {
                    this.displayWord = setCharAt(this.displayWord, index, key);
                    index = word.indexOf(key, index + 1);
                }
                this.setDisplayWord(this.displayWord);
            } else {
                console.log("You guessed wrong!");
            }
            console.log(this.displayWord);

            if (this.displayWord.indexOf("_") === -1) {
                console.log("You win!!!");
                this.setGameText("You won!!!");
                this.wins++;
                this.setWins(this.wins);
                this.reset();
            } else {
                this.guesses--;
                console.log("Guesses left: " + this.guesses);
                this.setGuesses(this.guesses);
                if (this.guesses <= 0) {
                    console.log("You lost!!!");
                    this.setGameText("You lost. Better luck next time.");
                    this.losses++;
                    // updateLosses(losses);
                    this.reset();
                }
            }
            console.log("===============");
        } else {
            console.log("User already guessed: " + key);
        }
    }
}


// From Stackoverflow: https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}


document.onkeyup = function (event) {
    var keyPressed = event.key.toLowerCase();
    console.log("User pressed: " + keyPressed);
    guessingGame.processGuess(keyPressed);
}

guessingGame.reset();
