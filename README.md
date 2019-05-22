# Word Guessing Game

* URL: [https://pblack67.github.io/WordGuessGame/](https://pblack67.github.io/WordGuessGame/)

* Technologies: HTML, CSS, Bootstrap, JavaScript, Events, Objects

## Overview

This is a word guessing game a lot like hangman. It asks for the user to guess the letters of a word corresponding to a famous Chicago Bears player. The user has a limited number of guesses to guess the word. If they are successful then they get a winning graphic and a chorus of "Bear Down, Chicago Bears". The application keeps track of wins and losses as well.

## Architecture
The main program flow is in the game.js file. Application flow is driven by onkeyup events. These are then delegated to the guessingGame object which handles all the game logic. It does a lot of bookkeeping about letters guessed, displaying a letter or underscore, and whether the user won or lost. The user has only so many guesses for the letters in the word before they lose. The application also keeps track of wins and losses.