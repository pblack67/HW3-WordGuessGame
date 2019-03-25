var lettersGuessed = [];
var guessWords = ["jordan", "pippen", "kerr", "grant", "hodges"];
var word = guessWords[0]; 
var maxGuesses = 10;
var guesses = maxGuesses;
var displayWord = "____";
var wins = 0;

function reset() {
    word = guessWords[Math.floor(Math.random() * guessWords.length)];
    displayWord = "";
    for (var i = 0; i < word.length; i++) {
        displayWord += "_";
    }
    updateDisplayWord(displayWord);

    guesses = maxGuesses;
    updateGuesses(guesses);

    lettersGuessed = [];
    updateLettersGuessed(lettersGuessed);
}

function updateLettersGuessed(text) {
    var lg = document.getElementById("lettersGuessed");
    lg.textContent = "Letters Guessed: " + text;
}

function updateDisplayWord(text) {
    var dw = document.getElementById("displayWord");
    var temp = "";
    for (var i = 0; i < text.length; i++) {
        temp += text.charAt(i) + " ";
    }
    dw.textContent = temp;
}

function updateGuesses(numGuesses) {
    var gl = document.getElementById("guessesRemaining");
    gl.textContent = "Guesses Remaining: " + numGuesses;

}

function updateWins(numWins) {
    var winElement = document.getElementById("wins");
    winElement.textContent = "Wins: " + numWins;
}

// From Stackoverflow: https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function processGuess(key) {
    if (lettersGuessed.indexOf(key) === -1) {
        lettersGuessed.push(key);
        console.log(lettersGuessed);
        updateLettersGuessed(lettersGuessed);

        var index = 0;
        index = word.indexOf(key);
        if (index !== -1) {
            console.log("You guessed right!");
            while (index !== -1) {
                displayWord = setCharAt(displayWord, index, key);
                index = word.indexOf(key, index + 1);
            }
            updateDisplayWord(displayWord);
        } else {
            console.log("You guessed wrong!");
        }
        console.log(displayWord);

        if (displayWord.indexOf("_") === -1) {
            console.log("You win!!!");
            wins++;
            updateWins(wins);
            reset();
        } else {
            guesses--;
            console.log("Guesses left: " + guesses);
            updateGuesses(guesses);
            if (guesses == 0) {
                console.log("You lost!!!");
                reset();
            }
        }
        console.log("===============");
    } else {
        console.log("User already guessed: " + key);
    }
}

document.onkeyup = function (event) {
    var keyPressed = event.key.toLowerCase();
    console.log("User pressed: " + keyPressed);
    processGuess(keyPressed);
}

reset();
