var guessingGame = {
    lettersGuessed: [],
    guessWords: ["payton", "ditka", "urlacher", "grange", "mcmahon", "singletary", "wilson", "dent", "hampton   "],
    word: "",
    maxGuesses: 10,
    guesses: 0,
    displayWord: "",
    wins: 0,
    losses: 0,

    setGameText: function (text) {
        var gt = document.getElementById("gameText");
        gt.textContent = text;
    },

    setLettersGuessed: function (text) {
        this.lettersGuessed = text;
        var lg = document.getElementById("lettersGuessed");
        var temp = "";
        for (var i = 0; i < text.length; i++) {
            temp += text[i] + " ";
        }
        lg.textContent = "Letters Guessed: " + temp;
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

    setLosses: function (numLosses) {
        this.losses = numLosses;
        var lossElement = document.getElementById("losses");
        lossElement.textContent = "Losses: " + numLosses;
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

    checkGuess: function (key) {
        // See if they guessed a letter(s) correctly
        var index = 0;
        index = word.indexOf(key);
        if (index !== -1) {
            console.log("You guessed right!");
            // Make sure we get all occurrences of the letter
            while (index !== -1) {
                this.displayWord = setCharAt(this.displayWord, index, key);
                index = word.indexOf(key, index + 1);
            }
            this.setDisplayWord(this.displayWord);
        } else {
            console.log("You guessed wrong!");
        }
        console.log(this.displayWord);
    },

    isWon: function () {
        return this.displayWord.indexOf("_") === -1;
    },

    isLost: function () {
        return this.guesses <= 0;
    },

    checkWinLoss: function () {
        // See if they won or lost
        if (this.isWon()) {
            console.log("You win!!!");
            this.setGameText("You won!!! Press any key to play again.");
            this.setWins(++this.wins);
        } else {
            this.setGuesses(--this.guesses);
            console.log("Guesses left: " + this.guesses);
            if (this.guesses <= 0) {
                console.log("You lost!!!");
                this.setGameText("You lost. Better luck next time. Press any key to play again.");
                this.setLosses(++this.losses);
            }
        }
    },

    processGuess: function (key) {
        if (this.isWon() || this.isLost()) {
            this.reset();
        }
        this.setGameText("Good luck!!!");
        if (this.lettersGuessed.indexOf(key) === -1) {
            // User guessed a letter they haven't guessed before
            this.lettersGuessed.push(key);
            console.log(this.lettersGuessed);
            this.setLettersGuessed(this.lettersGuessed);

            this.checkGuess(key);

            this.checkWinLoss();

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
