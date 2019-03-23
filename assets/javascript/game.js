var lettersGuessed = [];
var word = "bananarama";
var maxGuesses = 10;
var guesses = maxGuesses;
var displayWord = "____";

function reset() {
    displayWord = "";
    for (var i = 0; i < word.length; i++) {
        displayWord += "_";
    }
    guesses = maxGuesses;
    lettersGuessed = [];
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

        var index = 0;
        index = word.indexOf(key);
        if (index !== -1) {
            console.log("You guessed right!");
            while (index !== -1) {
                displayWord = setCharAt(displayWord, index, key);
                index = word.indexOf(key, index + 1);
            }
        } else {
            console.log("You guessed wrong!");
        }
        console.log(displayWord);

        if (displayWord.indexOf("_") === -1) {
            console.log("You win!!!");
            reset();
        } else {
            guesses--;
            console.log("Guesses left: " + guesses);
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
