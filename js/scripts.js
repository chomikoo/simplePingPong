//script.j
//Ping Pong Game 

var canvas;
var canvasContext;

var framesPerSecond = 30;

var ballX = 5;                		//ball position X
var ballSpeedX = 15;

var ballY = 5;               	 	//ball position Y
var ballSpeedY = 15; 

var paddle1Y  = 250;  				// Left paddle
var paddle2Y  = 250;  				// Right paddle

var paddleHeight = 100;
var paddleThickness = 10;  

var player1Score = 0; 				//Score player 
var player2Score = 0; 				//Score computer

var winningScore = 5; 				// reset/End Game
var showWinScreen = false; 			// bool show Win screen 





window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
     
    setInterval(function() {
        moveEverything(); 			//ruch
        drawing();    				// rysowanie
    }, 1000/framesPerSecond );
    
    canvas.addEventListener('mousedown', handleMouseClick)
    
    canvas.addEventListener('mousemove', 
            function(evt) {
                var mousePos = mousePosition(evt);
                paddle1Y = mousePos.y - (paddleHeight/2);
    });
}




function handleMouseClick(evt) {
    if(showWinScreen){
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;
    }
}


function ballReset() {
    if(player1Score >= winningScore || player2Score >= winningScore){
        showWinScreen = true;
    } 
    
    ballSpeedX = -ballSpeedX;	
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


function mousePosition (evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY 
    };
}


function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddleHeight/2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    }
    else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}


function moveEverything() {
    if(showWinScreen) {
        return;
    }
    
    computerMovement();
    
    ballX += ballSpeedX;                          // right side 
    ballY += ballSpeedY;  
    
    if (ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY -(paddle2Y + paddleHeight/2);
            ballSpeedY = deltaY * 0.40;
        } 
        else {
            player1Score++;
            ballReset();
        }
    }

    if ( ballX < 0) {                          //left side 
        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY -(paddle1Y + paddleHeight/2);   // speed realtion between impact location
            ballSpeedY = deltaY * 0.40;
        } 
        else {
            player2Score++;
            ballReset();
        }
    }

    if ( ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if ( ballY < 0) {           				// top
        ballSpeedY= -ballSpeedY;
    }
}


function drawNet() {
    for(var i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width/2 - 1, i, 2, 20, "white");
    }
}


function drawing() {
    colorRect(0 ,0, canvas.width, canvas.height, "black"); //background canvas
    
    if (showWinScreen) {
        canvasContext.fillStyle = "white";
        
        if (player1Score >= winningScore) {
            canvasContext.fillText("You won !!", 575, 200);
        }
        else if (player2Score >= winningScore) {
            canvasContext.fillText("Computer won :/", 575, 200);
        }
        
        canvasContext.fillText("Click to continue", 565, 500);
    }    
    
    drawNet(); // net
    
    colorRect(0 , paddle1Y, paddleThickness, 100, "white"); // draw paddle
    
    colorRect(canvas.width - paddleThickness , paddle2Y, paddleThickness, paddleHeight, "white"); // draw paddle
    
    colorCircle(ballX, ballY, 10, "white");
    
    canvasContext.fillText("Player " + player1Score, 100, 100);
    canvasContext.fillText("Computer: " + player2Score, canvas.width - 100, 100);
}


function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor; // draw ball
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}


function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY , width, height);
}