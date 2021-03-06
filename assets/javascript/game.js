// From Stackoverflow: https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

let guessingGame = {
    lettersGuessed: [],
    guessWords: ["payton", "ditka", "urlacher", "grange", "mcmahon", "singletary", "wilson", "dent", "hampton", "thayer", "tomczak", "sayers", "nagurski", "luckman", "halas", "tillman", "perry", "piccolo", "george", "blanda"],
    letters: ['a', 'b', "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    word: "",
    maxGuesses: 10,
    guesses: 0,
    displayWord: "",
    wins: 0,
    losses: 0,

    setGameText: function (text) {
        let gt = document.getElementById("gameText");
        gt.textContent = text;
    },

    setLettersGuessed: function (text) {
        this.lettersGuessed = text;
        let lg = document.getElementById("lettersGuessed");
        let temp = "";
        for (let i = 0; i < text.length; i++) {
            temp += text[i] + " ";
        }
        lg.textContent = "Letters Guessed: " + temp;
    },

    setDisplayWord: function (text) {
        this.displayWord = text;
        let dw = document.getElementById("displayWord");
        let temp = "";
        for (let i = 0; i < text.length; i++) {
            temp += text.charAt(i) + " ";
        }
        dw.textContent = temp;
    },

    setGuesses: function (numGuesses) {
        this.guesses = numGuesses;
        let gl = document.getElementById("guessesRemaining");
        gl.textContent = "Guesses Remaining: " + numGuesses;

    },

    setWins: function (numWins) {
        this.wins = numWins;
        let winElement = document.getElementById("wins");
        winElement.textContent = "Wins: " + numWins;
    },

    setLosses: function (numLosses) {
        this.losses = numLosses;
        let lossElement = document.getElementById("losses");
        lossElement.textContent = "Losses: " + numLosses;
    },

    reset: function () {
        word = this.guessWords[Math.floor(Math.random() * this.guessWords.length)];
        this.displayWord = "";
        for (let i = 0; i < word.length; i++) {
            this.displayWord += "_";
        }
        this.setDisplayWord(this.displayWord);

        this.guesses = this.maxGuesses;
        this.setGuesses(this.guesses);

        this.lettersGuessed = [];
        this.setLettersGuessed(this.lettersGuessed);

        document.getElementById("bearspic").style.visibility = "hidden";
    },

    checkGuess: function (key) {
        // See if they guessed a letter(s) correctly
        let index = 0;
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
            document.getElementById("bearspic").style.visibility = "visible";
            document.getElementById("beardown").play();
        } else {
            this.setGuesses(--this.guesses);
            console.log("Guesses left: " + this.guesses);
            if (this.isLost()) {
                console.log("You lost!!!");
                this.setGameText("You lost. Press any key to play again.");
                this.setLosses(++this.losses);
            }
        }
    },

    isLetter: function(key) {
        return this.letters.indexOf(key) !== -1;
    },

    isGuessed: function(key) {
        return this.lettersGuessed.indexOf(key) !== -1;
    },

    processGuess: function (key) {
        if (this.isWon() || this.isLost()) {
            this.reset();
            this.setGameText("Good luck!!!");
        } else if (!this.isGuessed(key) && this.isLetter(key)) {
            this.lettersGuessed.push(key);
            console.log(this.lettersGuessed);
            this.setLettersGuessed(this.lettersGuessed);
            this.checkGuess(key);
            this.checkWinLoss();
        } else {
            console.log("Invalid key: " + key);
        }        
        console.log("===============");

    }
}

document.onkeyup = function (event) {
    let keyPressed = event.key.toLowerCase();
    console.log("User pressed: " + keyPressed);
    guessingGame.processGuess(keyPressed);
}

guessingGame.reset();
