/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //Notes for bitwise later:
  //make all rows into binary
  //XOR all rows, if result is all 1s, it's a solution
  var solution = [];
  for (var y = 0; y < n; y++) {
    var row = [];
    for (var x = 0; x < n; x++) {
      (x === y % n) ? row.push(1) : row.push(0); //check if not repeated
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//getAttemptedSolution = var attempted = {};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n}); // create a new empty board of size n
  var placeRook = function(y) {
    if (y === n) { //Reaches end of board
      return solutionCount++;
    }

    for (var x = 0; x < n; x++) {
      board.togglePiece(y, x);
      if (!board.hasAnyRooksConflicts()) {
        placeRook(y + 1);
      }
      board.togglePiece(y, x);
    }
  };
  placeRook(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  for (var y = 0; y < n; y++) {
    var row = [];
    for (var x = 0; x < n; x++) {
      (x === y % n) ? row.push(1) : row.push(0); //check if not repeated
    }
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
 var solutionCount = 0;
  var board = new Board({n:n}); // create a new empty board of size n
  var placeRook = function(y) {
    if (y === n) { //Reaches end of board
      return solutionCount++;
    }

    for (var x = 0; x < n; x++) {
      board.togglePiece(y, x);
      if (!board.hasAnyQueensConflicts()) {
        placeRook(y + 1);
      }
      board.togglePiece(y, x);
    }
  };
  placeRook(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
