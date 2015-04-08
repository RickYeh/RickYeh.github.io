var boardSize = 3;      // Set game board's size.  TODO: Make value changable
var currentPlayer = 0;  // Variable to track whose turn it is - 0 for O, 1 for X
var totalTurns = 0;     // Counter to track total moves to detect tiea

// Create 2D Array based on board size
var gameBoard = new Array(boardSize);

for (var i = 0; i < boardSize; i++) {
    gameBoard[i] = new Array(boardSize);
}

// Set all elements of the array to 0
for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
        gameBoard[i][j] = 0;
    }
}

// Object: Represents a player in the game
// Values:
//      sign - The symbol the player is using, X or O
// Methods:
//      takeTurn() - Called on every click of a board cell to place a symbol
var Player = function Player(sign) {
    this.sign = sign;

    this.takeTurn = function(i, j) {

        // Check if spot isn't empty.  If it's occupied, kick out of method and pick another.
        if (gameBoard[i][j] > 0 || boardUI.isDisabled) {
            $('#box' + i + j).effect( 'shake', {distance: 2, direction: 'right'}, 300);
            return;
        } 

        totalTurns++;

        if (this.sign === 'O'){
            $('#box' + i + j).hide().html(boardUI.oString).fadeIn('fast');
            gameBoard[i][j] = 1;
            currentPlayer = 1;
        } else {
            gameBoard[i][j] = 2;    
            $('#box' + i + j).hide().html(boardUI.xString).fadeIn('fast');
            currentPlayer = 0;
        }
        if (boardUI.checkVictory(this.sign)) {
            boardUI.showEndGameMessage(this.sign);
        } else if (totalTurns === boardSize * boardSize) { 
            boardUI.showEndGameMessage('T');
        }
    };
};

// Create two player objects with constructors
var playerX = new Player('X');
var playerO = new Player('O');

// Object: Represents the board and UI
// Values:
//      oString, xString - Strings that draw the O and X symbols with inline SVG.  
//      isDisabled - Boolean flag that disables board clicks when true
// Methods:
//      createGrid(n) - Inserts the DIVs to the gameBoard via a jQuery loop
//      createClickHandlers() - Initializes all the click handlers for each board cell and button
//      resetGame() - Resets game to intial state
//      checkVictory() - Checks the board for victories.  Called after each successful takeTurn
//      showEndGameMessage() - Called when game ends to change title message accordingly

var boardUI = {

    oString: '<svg class="xo" height="110" width="110">' +
        '<circle cx="55" cy="55" r="43" stroke="#E43A20" stroke-width="12" fill-opacity="0" />' +
        '</svg>',

    xString: '<svg class="xo" height="100" width="100">' +
        '<line x1="10" y1="10" x2="90" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
        '<line x1="90" y1="10" x2="10" y2="90" style="stroke:#00AAC4;stroke-width:12" />' +
        '</svg>',

    isDisabled: false,

    // Double for loop to insert HTML for grid creation
    createGrid: function(n) {
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < n; ++j) {
                var boxString = '<div class="boardCell" id="box' + i + j + '"></div>';
                $('#gameBoard').append(boxString);
            }
        }
    },

    createClickHandlers: function() {
        // Create anonymous function to pass in the i to create closure
        function createAnonFunction(i, j) {
            var actionOnClick = function() {
                if (currentPlayer === 0) {
                    playerO.takeTurn(i, j);
                } else {
                    playerX.takeTurn(i, j);
                }
            };
            return actionOnClick;
        }

        // Loop to initialize all board cell handlers
        for (var i = 0; i < boardSize; ++i) {
            for (var j = 0; j < boardSize; ++j) {
                $('#box' + i + j).click(createAnonFunction(i, j));
            }
        }

        // Reset button
        $('#resetButton').click(function() {
            boardUI.resetGame();
        });
    },

    resetGame: function() {

        // Disable reset function if nothing has been played yet
        if (totalTurns === 0) {
            return;
        }

        if (boardUI.isDisabled === true) {
            $('#titleText').fadeOut('slow'); 
        }

        boardUI.isDisabled = false;         // Re-enable ability to click board

        // Reset all gameboard array elements to 0
        for (var i = 0; i < boardSize; i++) {
            for (var j = 0; j < boardSize; j++) {
                gameBoard[i][j] = 0;
            }
        }

        currentPlayer = 0;
        totalTurns = 0;

        // Fade out all X and O's
        // TODO: Fade them out with a random delay.
        for (var i = 0; i < 9; i++) {
            $('.xo').fadeOut('slow');
        }
    },

    checkVictory: function(sign) {
        var searchValue;

        if (sign === 'O') {
            searchValue = 1;
        } else {
            searchValue = 2;
        }

        // Loop to scan the three rows for victory
        for (var i = 0; i < boardSize; ++i) {
            var matchCount = 0;

            for (var j = 0; j < boardSize; ++j) {
                if (gameBoard[i][j] === searchValue) {
                    matchCount++;
                }
                if (matchCount === 3) {
                    return true;
                }
            }
        }

        // Loop to scan three columns for victory
        for (var i = 0; i < boardSize; ++i) {
            var matchCount = 0;

            for (var j = 0; j < boardSize; ++j) {
                if (gameBoard[j][i] === searchValue) {
                    matchCount++;
                }
                if (matchCount === 3) {
                    return true;
                }
            }
        }

        // Scan for Diagonal victory conditions
        if (gameBoard[0][0] == searchValue && gameBoard[1][1] == searchValue && gameBoard[2][2] == searchValue) {
            return true;
        } else if (gameBoard[0][2] == searchValue && gameBoard[1][1] == searchValue && gameBoard[2][0] == searchValue) {
            return true;
        } else {
            return false;
        }
    },

    showEndGameMessage: function(result) {

        boardUI.isDisabled = true;

        $('#titleText').fadeOut('slow');
        window.setTimeout(changeTitle, 610);

        function changeTitle() {
            if (result === 'T') {
                $('#titleText').html('Tie Game!');
            } else {
                $('#titleText').html(result + ' Wins!');
            }
            $('#titleText').fadeIn('slow');
        }
    },
};

// Main function to load the page with desired board size.
$(document).ready(function() {
    boardUI.createGrid(boardSize);
    boardUI.createClickHandlers();
});

