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
  // if (n === 0) {return []};
  // if (n === 1) {return [[1]]};
  // var board = new Board({n:n}); // nxn matrix
  // //console.log(board.rows());
  // var singleSolution = function(key) {
  //   console.log(key, n);
  //   if (key === n) {
  //     var matrix = [];
  //     for (var i = 0; i < n; i++) { // i is rows
  //       var inner = []
  //       for (var j = 0; j < n; j++) { // j is columns
  //         inner.push(board.get(i)[j]); //inner = row;
  //       }
  //       matrix.push(inner); //Create a matrix with rows
  //     }
  //     console.log('matrix', JSON.stringify(matrix));
  //     return matrix;
  //   }
  //   for (var x = 0; x < n; x++) {  // ..... 0, 1, 2, 3
  //     board.togglePiece(key, x);
  //     if (!board.hasAnyQueensConflicts()) {
  //       singleSolution(key + 1);  // 1... 2.... 3...
  //     }
  //     board.togglePiece(key, x);
  //   } // if we cannot find a valid solution for, start over
  //  /*
  //   key = 0;
  //   count++;
  //   board = new Board({n:n});
  //   singleSolution(key);
  //   */
  // }

  // var solution = singleSolution(0);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;

  var board = new Board({n:n}); // create a new empty board of size n
  var queenCount = 0;
  var placeQueen = function(y, board) {
    if (y >= n) { //Reaches end of board
      return;
    }
    for (var x = 0; x < n; x++) {
      console.log(JSON.stringify(board.rows()));
      board.togglePiece(y, x);
      queenCount++;
      if (!board.hasAnyQueensConflicts()) {
        placeQueen(y + 1, board);
      }
      if (queenCount === n && board.hasAnyQueensConflicts() === false) {
        return;
      } else {
        board.togglePiece(y, x);
        queenCount--;
      }
    }
  };
  placeQueen(0, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();

/*
  var board = new Board({n : n});
  var newBoard;
  var countQueens = 0;
  var recursive = function (row, board) {
    if (row >= n){
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      countQueens++;
      if (!board.hasColConflictAt(i) && !board.hasMajorDiagonalConflictAt(i - row) && !board.hasMinorDiagonalConflictAt(i + row)) {
        recursive(row + 1, board);
      }

      if (countQueens === n && board.hasAnyQueensConflicts() === false) {
        return newBoard;
      } else {
        board.togglePiece(row, i);
        countQueens -- ;
      }

    }
  };
  recursive(0, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
  */


};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n}); // create a new empty board of size n

  var placeQueen = function(y) {
    if (y === n) { //Reaches end of board
      return solutionCount++;
    }

    for (var x = 0; x < n; x++) {
      board.togglePiece(y, x);
      if (!board.hasAnyQueensConflicts()) {
        placeQueen(y + 1);
      }
      board.togglePiece(y, x);
    }
  };
  placeQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
