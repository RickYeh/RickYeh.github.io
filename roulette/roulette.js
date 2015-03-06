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
    //      number - the number or color that is bet
    bet: function(number) {
        this.bankroll = this.bankroll - this.betAmt;
        this.betNumber = number;

        this.bankroll_output.innerHTML = 'Bankroll: ' + this.bankroll;
        this.betAmt_output.innerHTML = 'Bet Amount: ' + this.betAmt;

        console.log('I am betting ' + this.betAmt + ' chip on ' + number + '.');
        table.output.innerHTML = '<br>A bet of ' + this.betAmt + ' chip has been placed on ' + this.betNumber;

        table.spin(); // FOR TESTING PURPOSES.  REMOVE LATER
    },
    // Method : Clears bets and resets bet amount to 1.
    clearBet: function() {
        this.betAmt = 1;
        this.betNumber = null;
    }
};
// Object : Represents the table in the roulette game
// Properties :
//     currentNum - Current winning number with pin on it
//     payoutAmt - Amount used to calculate how much to pay out in winnings
//     numbers: - Array of possible numbers and their associated colors in wheel order.
// Methods:
//     spin() - Called when wheel is spun to generate a new winning number
//     payWinner() - Finds any winning bets and pays out appropriate amount
//     highlightWin() - Highlights the winning number/boxes with a yellow border.
//     clearHighlightWin () - Clears the highlights on the board

var table = {
    currentNum: {},
    highlightedNum: {value: '0', color: 'Green'},
    payoutAmt: 0,
    output: document.getElementById('textDisplay'),
    numbers:[{value:'0', color:'Green'},
             {value:'28', color:'Red'},
             {value:'9', color:'Red'},
             {value:'26', color:'Black'},
             {value:'30', color:'Red'},
             {value:'11', color:'Black'},
             {value:'7', color:'Red'},
             {value:'20', color:'Black'},
             {value:'32', color:'Red'},
             {value:'17', color:'Black'},
             {value:'5', color:'Red'},
             {value:'22', color:'Black'},
             {value:'34', color:'Red'},
             {value:'15', color:'Black'},
             {value:'3', color:'Red'},
             {value:'24', color:'Black'},
             {value:'36', color:'Red'},
             {value:'13', color:'Black'},
             {value:'1', color:'Red'},
             {value:'00', color:'Green'},
             {value:'27', color:'Red'},
             {value:'10', color:'Black'},
             {value:'25', color:'Red'},
             {value:'29', color:'Black'},
             {value:'12', color:'Red'},
             {value:'8', color:'Black'},
             {value:'19', color:'Black'},
             {value:'31', color:'Black'},
             {value:'18', color:'Red'},
             {value:'6', color:'Black'},
             {value:'21', color:'Red'},
             {value:'33', color:'Black'},
             {value:'16', color:'Red'},
             {value:'4', color:'Black'},
             {value:'23', color:'Red'},
             {value:'35', color:'Black'},
             {value:'14', color:'Red'},
             {value:'2', color:'Black'}],

    // Method : Generates a random number from the array of possible numbers and calls payWinner()
    spin: function() {
        if (player.betNumber === null) {
            console.log('Please make a bet first before spinning!');
            return;
        }
        table.output.innerHTML += '';
        table.output.innerHTML += '<br>The table is spun.';
        this.clearHighlightWin();

        console.log('Table is spun.');
        this.currentNum = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        console.log('The winning number is: ' + this.currentNum.value + ' ' + this.currentNum.color);
        table.output.innerHTML += '<br>The winning number is: ' + this.currentNum.value + ' ' + this.currentNum.color;
        tableUI.drawBall(this.currentNum.value);

        this.payWinner(player.betAmt);
        player.bankroll_output.innerHTML = 'Bankroll: ' + player.bankroll;
        player.clearBet();
        table.highlightWin();
    },

    // Method: Highlights the DIV of the corresponding winning number after a spin.
    highlightWin: function() {
        document.getElementById('box' + this.currentNum.value).style.boxShadow = '0px 0px 0px 5px yellow inset';
        this.highlightedNum = this.currentNum; // Make copy of current winning number for clearHighlightWin()
    
        // Also highlights other non number winning elements.
        if(this.currentNum.color =='Red'){
            document.getElementById('red').style.boxShadow = '0px 0px 0px 3px yellow inset';
        }
        if(this.currentNum.color =='Black'){
            document.getElementById('black').style.boxShadow = '0px 0px 0px 3px yellow inset';
        }
        if(this.currentNum.value % 2 === 0 && this.currentNum.color != 'Green'){
            document.getElementById('even').style.boxShadow = '0px 0px 0px 3px yellow inset';
        }
        if(this.currentNum.value % 2 === 1){
            document.getElementById('odd').style.boxShadow = '0px 0px 0px 3px yellow inset';
        }
    },

    // Method: Clears the previously highlighted element that was done by highlightWin() before every spin.
    //         Also clears all other non numbered highlighted elements.
    clearHighlightWin: function() {
        document.getElementById('box' + this.highlightedNum.value).style.boxShadow = '0px 0px 0px 1px white inset';
        document.getElementById('red').style.boxShadow = '0px 0px 0px 1px white inset';
        document.getElementById('black').style.boxShadow = '0px 0px 0px 1px white inset';
        document.getElementById('even').style.boxShadow = '0px 0px 0px 1px white inset';
        document.getElementById('odd').style.boxShadow = '0px 0px 0px 1px white inset';
        
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
        } else if (player.betNumber === 'Even' && this.currentNum.value % 2 === 0 && this.currentNum.color != 'Green') { // Even bets win 2x except 0's
            this.payoutAmt = betAmt * 2;
            player.bankroll = player.bankroll + this.payoutAmt;
            table.output.innerHTML += '<br>Congratulations, you won ' + this.payoutAmt + ' chips!';
            console.log('Congratulations, you won!');
        } else if (player.betNumber === 'Odd' && this.currentNum.value % 2 === 1) { // Odd bets win 2x
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
    },
};

// Object : Holds various functions to draw the table's UI
// Methods:
//     drawCanvas() - Draws the main canvas element the roulette wheel is painted on
//     drawCircle() - Draws a circle with a fill color
//     drawLine()   - Draws a line from the center of the canvas outward.
//     drawHandle() - Draws a spin handle in the center of the wheel
//     drawText()   - Draws the rotated text around the wheel
var tableUI = {

    canvas: document.getElementById('myCanvas'),
    height: 400,
    width: 400,
    centerX: 200,  // = width / 2
    centerY: 200,  // WTF?!  Can't use mathematical expression?

    // Method: Main function that draws the roulette wheel.  Calls other functions in this object
    // to layer and draw each element.
    drawCanvas: function(){
        // Outer Wheel Circles (With Lines)
        this.drawCircle(200, 'black');
        this.drawCircle(180, 'white');
        this.drawCircle(175, 'red');
        this.drawCircle(150, 'white');
        this.drawCircle(145, 'black');

        // For loop to draw the lines
        for (var i = 1; i <= 38; i++) {
            this.drawLine(200, (i * 2 * Math.PI) / 38);
        }

        // Draw remaining inner circles over lines
        this.drawCircle(125, 'white');
        this.drawCircle(120, 'green');

        this.drawHandle(2 * Math.PI);
        this.drawHandle(Math.PI);
        this.drawHandle(Math.PI / 2);
        this.drawHandle(-Math.PI / 2);

        this.drawCircle(10, 'grey');

        this.drawText();
    },


    // Method: Draws a circle with a fill color.
    // Parameters:
    //     radius - desired radius of the circle
    //     color - color that the circle is to be filled with
    drawCircle: function(radius, color){
        var ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    },
    // Method: Draws a line from the center of the canvas.
    // Parameters: 
    //     radius - radius of the circle
    //     radians - angle in radians for the desired end point of the line
    drawLine: function(radius, radians) {

        var ctx = this.canvas.getContext('2d');

        var x = this.centerX + radius * Math.cos(radians);
        var y = this.centerY + radius * Math.sin(radians);

        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.stroke();

    },
    // Method: Draws a center spin handle
    // Parameters: 
    //     radians - angle in radians for the desired direction
    drawHandle: function(radians){
        var ctx = this.canvas.getContext('2d');
        var radius = 60;

        var x = this.centerX + radius * Math.cos(radians);
        var y = this.centerY + radius * Math.sin(radians);

        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(x, y);

        ctx.lineWidth = 7;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    },
    // Method: Draws the circling text numbers on the wheel outward.
    drawText: function(){
        var ctx = this.canvas.getContext('2d');

        for (var i = 0; i < 38; i++) {
            ctx.save();
            ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            ctx.rotate(i * 2 * Math.PI / 38);
            ctx.font = '15px Arial';
            ctx.scale (1,1);
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(table.numbers[i].value, 0, -155);
            ctx.restore();
        }
    },
    // Function to draw a ball in the corresponding number slot.
    // Parameters: 
    //     number - The number the ball should be drawn on
    drawBall: function(number){
        var ctx = this.canvas.getContext('2d');

        for (var i = 0; i <= 37; i++) {
            if (table.numbers[i].value == number.toString()) {

                tableUI.drawCanvas();  // Redraw Canvas to clear previous ball.

                ctx.save();
                ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
                ctx.rotate(Math.PI);  // Rotate once to account for outward text
                ctx.rotate(i * 2 * Math.PI / 38); // Rotate radians to place ball
                ctx.beginPath();
                ctx.arc(0, 135, 7, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#FFCC00'; // Gold Color
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.restore();
            }
        }
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

// Method: Creates click handlers for the DIVs
function createBets() {

    // Anonymous function to pass in captured value.
    function createAnonFunction(capturedNum) {
        var anonFcn = function() {
            player.bet(capturedNum);
        };
        return anonFcn;
    }

    // Sets the click triggers from the numbers 0-36
    for (var i = 0; i < 37; ++i) {
        $('#box' + i).click(createAnonFunction(i));
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
$(function() {
    newGame();
    tableUI.drawCanvas();
    tableUI.drawBall('0');
    createBets();
});

console.log('Make bet with console command: player.bet(Amount,Number)');