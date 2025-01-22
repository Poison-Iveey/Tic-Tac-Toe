// the logic part of the game


var gameBoard = (function (){
   const rows = 3;
   const columns = 3;
   const board = [];

   for(let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0;j < columns; j++){
        board[i].push('');
    }
   }
   return {
    board,rows,columns
   };

})();

// Creating a player object factory function

function playerFactory(name,marker){
    return{name,marker };
}


// Factory function for controlling the game

const controlGame = {
  currentPlayerIndex: 0,
  players:[
    { name:"player1", marker:"X"},
    {name:"player2",marker:"O"},
  ],


  // Method to set player names from input fields
  setPlayerNames: function (player1Name, player2Name) {
    this.players[0].name = player1Name || "Player 1"; 
    this.players[1].name = player2Name || "Player 2"; 
  },


    // method to get current player
    getCurrentPlayer: function () {
      return this.players[this.currentPlayerIndex];
    },
    
    // method to switch turns between players
    switchTurns: function () {
      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    },
    
    // method to check winner or tie
    checkWinner: function (board,currentPlayer) {
      var winConditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6], 
      ];

      // Check all win conditions
      for (let i = 0; i < winConditions.length; i++) {
        let winCondition = winConditions[i];
        var a = winCondition[0];
        var b = winCondition[1];
        var c = winCondition[2];
        
        
        if (
          board[a] === currentPlayer.marker &&
          board[b] === currentPlayer.marker &&
          board[c] === currentPlayer.marker
        ) {
          return currentPlayer.name + " WINS!";
        }
      }

      // Check for tie
      const isTie = board.every(cell => cell !=="");
      /*for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          isTie = false;
          break;
        }
      }*/

      if (isTie) {
        return "IT'S A TIE!";
      }

      return null;
    },
  };





// The visual side of the game

//  game board (1D array)
const board = ["", "", "", "", "", "", "", "", ""];

// Function to display the game board
function displayGame(board) {
  return {
    createBoard: function () {
      const boardElement = document.querySelector("#board");
      boardElement.innerHTML = ""; 

      console.log("Board created!");

      for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i; 
        cell.textContent = board[i] || ""; 
        boardElement.appendChild(cell);

        console.log(`Created cell at index: ${i}`);

        // Add event listener to handle cell clicks
        cell.addEventListener("click", (e) => {
          cellClick(i, e.target); 
        });
      }
      console.log("Board created successfully!");
    },
  };
}



let gameActive = false;

// Function to display the result
function displayResult(message) {
  const resultElement = document.getElementById("gameResult");
  if(resultElement){resultElement.textContent= message;

  }
}

//update messages in the doc
function displayMessage(message){
  const messageContainer = document.getElementById("messages");
  if(messageContainer){
    messageContainer.textContent = message;
  } else {
    console.error("Message container error!");
  }
}

// Handle cell clicks
function cellClick(index, cellElement) {
  if (!gameActive){
    alert(" Enter player names and double click on start button to begin");
    return;
  }
  // prevent overwriting
  if (board[index] === "" && gameActive) {
    const currentPlayer = controlGame.getCurrentPlayer(); 
    board[index] = currentPlayer.marker; 
    cellElement.textContent = currentPlayer.marker; 
    console.log(`Cell at index: ${index} marked with "${currentPlayer.marker}"`);

 
// Check for a winner or tie
const result = controlGame.checkWinner(board, currentPlayer);
    if (result) {
      gameActive = false; 
      alert(result); 
      return;
    }

    // Switch turns
    controlGame.switchTurns();
  } else {
    alert("Occupied!");
  }
}


// Wait for the DOM to load and render the initial board
document.addEventListener("DOMContentLoaded", function () {
  const newGameDisplay = displayGame(board); 
  newGameDisplay.createBoard(); 

  document.getElementById("startGame").addEventListener("click", () => {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;
  
    controlGame.setPlayerNames(player1Name, player2Name); // Set names dynamically
    console.log("Game started with players:", controlGame.players);

  // Reset the game
  const resetGame = () => {
    board.fill(""); 
    gameActive = true; 
    controlGame.currentPlayerIndex = 0;
    newGameDisplay.createBoard(); 
    alert("Make your move!");
  };

  //Attach reset game event listener
  const startButton = document.getElementById("startGame");
  startButton.addEventListener("click", resetGame);
});
});




