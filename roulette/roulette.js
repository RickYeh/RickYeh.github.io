
// Object : Represents the player in the roulette game.
// Properties :
//     bankroll - How much money the player currently has.
//     betAmt - The amount that was bet
//     betNumber - The current bet the player has selected
// Methods:
//     bet() - Called when player makes a bet
//     clearBet() - Called after each spin by the table to clear all bets.

var player = {
    bankroll: 0,
    betAmt: 0,
    betNumber: '0',
    bankroll_output: document.getElementById('bankrollDisplay'),
    betAmt_output: document.getElementById('betAmtDisplay'),


    // Method: Sets the bet for the player of a specified amount and bet type
    // Params:
    //      amount - amount of chips that is bet
    //      number - the number or color that is bet
    bet: function(number) {
        this.bankroll = this.bankroll - this.betAmt;
        this.betNumber = number;

        this.bankroll_output.innerHTML = 'Bankroll: ' + this.bankroll;
        this.betAmt_output.innerHTML = 'Bet Amount: ' + this.betAmt;

        console.log('I am betting ' + this.betAmt + ' chips on ' + number + '.');
        table.output.innerHTML += '<br>A bet of '+ this.betAmt +' chip(s) has been placed on ' + this.betNumber;

        table.spin();  // FOR TESTING PURPOSES.  REMOVE LATER
    },
    // Method : Clears bets and resets bet amount to zero.
    clearBet: function() {
        this.betAmt = 1;
        this.betNumber = null;
    }
};
// Object : Represents the table in the roulette game
// Properties :
//     currentNum - Current winning number with pin on it
//     payoutAmt - Amount used to calculate how much to pay out in winnings
//     numbers: - Array of possible numbers and their associated colors
// Methods:
//     spin() - Called when wheel is spun to generate a new winning number
//     payWinner() - Finds any winning bets and pays out appropriate amount
var table = {
    currentNum: {},
    highlightedNum: {value:'0', color:'Green'},
    payoutAmt: 0,
    output: document.getElementById('textDisplay'),
    numbers:   [{value:'0', color:'Green'},
                {value:'1', color:'Red'},
                {value:'2', color:'Black'},
                {value:'3', color:'Red'},
                {value:'4', color:'Black'},
                {value:'5', color:'Red'},
                {value:'6', color:'Black'},
                {value:'7', color:'Red'},
                {value:'8', color:'Black'},
                {value:'9', color:'Red'},
                {value:'10', color:'Black'},
                {value:'11', color:'Black'},
                {value:'12', color:'Red'},
                {value:'13', color:'Black'},
                {value:'14', color:'Red'},
                {value:'15', color:'Black'},
                {value:'16', color:'Red'},
                {value:'17', color:'Black'},
                {value:'18', color:'Red'},
                {value:'19', color:'Black'},
                {value:'20', color:'Black'},
                {value:'21', color:'Red'},
                {value:'22', color:'Black'},
                {value:'23', color:'Red'},
                {value:'24', color:'Black'},
                {value:'25', color:'Red'},
                {value:'26', color:'Black'},
                {value:'27', color:'Red'},
                {value:'28', color:'Red'},
                {value:'29', color:'Black'},
                {value:'30', color:'Red'},
                {value:'31', color:'Black'},
                {value:'32', color:'Red'},
                {value:'33', color:'Black'},
                {value:'34', color:'Red'},
                {value:'35', color:'Black'},
                {value:'36', color:'Red'},
                {value:'00', color:'Green'}],

    // Method : Generates a random number from the array of possible numbers and calls payWinner()
    spin: function() {
        if (player.betNumber === null) {
            console.log('Please make a bet first before spinning!');
            return;
        }
        table.output.innerHTML = '';
        table.output.innerHTML += 'The table is spun.';
        this.clearHighlightWin();

        console.log('Table is spun.');
        this.currentNum = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        console.log('The winning number is: ' + this.currentNum.value + ' ' + this.currentNum.color);
        table.output.innerHTML += '<br>The winning number is: ' + this.currentNum.value + ' ' + this.currentNum.color; 

        this.payWinner(player.betAmt);
        player.bankroll_output.innerHTML = 'Bankroll: ' + player.bankroll;
        player.clearBet();
        table.highlightWin();
    },

    // Method: Highlights the DIV of the corresponding winning number after a spin.
    highlightWin: function() {
        document.getElementById('box'+this.currentNum.value).style.boxShadow='0px 0px 0px 5px yellow inset';
        this.highlightedNum = this.currentNum;  // Make copy of current winning number for clearHighlightWin()
    },

    // Method: Clears the previously highlighted element that was done by highlightWin() before every spin
    clearHighlightWin: function() {
        document.getElementById('box'+this.highlightedNum.value).style.boxShadow='0px 0px 0px 1px white inset';
    },

    // Method: Calculates any winnings based on amount bet by comparing numbers and bets
    // params:
    //      betAmt: Amount that is bet by the player.
    payWinner: function(betAmt) {

        if (player.betNumber.toString() === this.currentNum.value) { // Number bets win 35x
            this.payoutAmt = betAmt * 35;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else if (player.betNumber === 'Black' && this.currentNum.color === 'Black') { // Color bets win 2x
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else if (player.betNumber === 'Red' && this.currentNum.color === 'Red') { // Color bets win 2x
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else if (player.betNumber === 'Even' && this.currentNum.value%2 === 0 && this.currentNum.color != 'Green') { // Even bets win 2x except 0's
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else if (player.betNumber === 'Odd' && this.currentNum.value%2 === 1) { // Odd bets win 2x
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else { // Nothing matches, player loses
            console.log('Sorry, try again!');
            table.output.innerHTML += '<br>Sorry, try again!';
        }
        console.log(player.bankroll);
        console.log('Current Bankroll is : ' + player.bankroll);
    }
};

// Method: Starts a new game.  Resets bankroll to default value.
function newGame() {
    console.log('New game is starting...');
    table.output.innerHTML = 'New game is starting...';
    player.bankroll = 100;
    player.betAmt = 1;
    player.bankroll_output.innerHTML = 'Bankroll: ' + player.bankroll;
}

// HTML CANVAS CODE FOR ROULETTE WHEEL STARTS HERE
function drawCanvas() {
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        canvas.width = 400;
        canvas.height = 400;

        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius;

        // Function to draw a circle with a fill color.
        // Parameters:
        //     radius - desired radius of the circle
        //     color - color that the circle is to be filled with

        function drawCircle(radius, color) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }

        // Function to draw lines from the center of the canvas.
        // Parameters: 
        //     radius - radius of the circle
        //     radians - angle in radians for the desired end point of the line

        function drawLine(radius, radians) {

            var x = centerX + radius * Math.cos(radians);
            var y = centerY + radius * Math.sin(radians);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }

        function drawHandle(radians) {
            radius = 60;

            var x = centerX + radius * Math.cos(radians);
            var y = centerY + radius * Math.sin(radians);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);

            ctx.lineWidth = 7;
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }

        // Draw Roulette Wheel
        drawCircle(200, 'black');
        drawCircle(180, 'white');
        drawCircle(175, 'red');
        drawCircle(150, 'white');
        drawCircle(145, 'black');

        // For loop to draw the lines
        for (var i = 1; i <= 38; i++) {
            drawLine(200, (i * 2 * Math.PI) / 38);
        }

        // Draw remaining inner circles over lines
        drawCircle(125, 'white');
        drawCircle(120, 'green');

        drawHandle(2 * Math.PI);
        drawHandle(Math.PI);
        drawHandle(Math.PI / 2);
        drawHandle(-Math.PI / 2);

        drawCircle(10, 'yellow');
}

// Method: Creates click handlers for the DIVs
function createBets() {

    // Anonymous function to pass in captured value.
    function createAnonFunction (capturedNum){
        var anonFcn = function(){
            player.bet(capturedNum);
        };
        return anonFcn;
    }

    // Sets the click triggers from the numbers 0-36
    for(var i = 0; i < 37; ++i){
        $('#box'+ i ).click(createAnonFunction(i));
    }

    $('#even').click(function() {
        player.bet('Even');
    });
    $('#red').click(function() {
        player.bet('Red');
    });
    $('#black').click(function() {
        player.bet('Black');
    });
    $('#odd').click(function() {
        player.bet('Odd');
    });
    $('#box00').click(function() {
        player.bet('00');
    });
}


// MAIN PROGRAM STARTS HERE
newGame();
drawCanvas();
createBets();

console.log('Make bet with console command: player.bet(Amount,Number)');

