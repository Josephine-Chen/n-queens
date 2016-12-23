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


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
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
  var board = new Board({n: n}); // create a new empty board of size n
  var queenCount = 0;
  var placeQueen = function(y, board) {
    if (y >= n) { //Reaches end of board
      return;
    }
    for (var x = 0; x < n; x++) {
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
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n}); // create a new empty board of size n

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

window.binaryCountNQueensSolutions = function(n) {
  var count = 0;
  var permutations = (1 << n) - 1; // Total number of bitwise combinations

  var placer = function(ld, col, rd) { // Recursion
    if (col === permutations) {
      count++;
      return;
    }
    var possession = ~(ld | col | rd);

    while (possession & permutations) {
      var bit = possession & -possession;
      possession -= bit;
      placer((ld | bit) >> 1, (col | bit), (rd | bit) << 1);
    }
  };

  placer(0, 0, 0);
  return count;
};

window.symBinCountNQueensSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  var count = 0;
  var permutations = (1 << n) - 1;
  //If even, exclude right half of first row
  //If odd, exclude right half of first row not including middle square
  //2nd row, exclude right half of 2nd row if Q in first row middle square
  var excluded = (1 << ((n / 2) ^ 0)) - 1; //excluded half of the permutations
  var flag = (n & 1) ? 0 : 1; //Set flag depending on if n is even

  var placer = function(ld, col, rd, flag) { // Recursion
    if (col === permutations) {
      count++;
      return;
    }
    //If odd, exclude again and then set excluded to 0 afterwards.
    //If even, set excluded to 0
    if (flag < 0) {
      excluded = 0;
    }
    var possession = ~(ld | col | rd | excluded); //Remember to filter out right half of first row

    while (possession & permutations) {
      var bit = possession & -possession;
      possession -= bit;
      flag--;

      placer((ld | bit) >> 1, (col | bit), (rd | bit) << 1, flag);
    }
  };

  placer(0, 0, 0, flag);
  return count << 1; //Double the count afterwards because symmetry

};

/*
//https://twitter.com/spellrp/status/332992908565295104
// N(permutations, ld, col, rd, count, poss, bit)
function N(Q,u,ee,n,s,H,R){
  s=0;
  //Q = n;
  //u = ld
  Q=u?Q:(1<<Q)-1;
  //Q is permutations
  //ee is col
  //n is rd
  H=~(u|ee|n)&Q;
  while(H)
  //H is possessions
  //R is bit
    H^=R=-H&H,
    s+=N(Q,(u|R)<<1,ee|R,(n|R)>>1);
  //s is count
  return s+=ee==Q  count += (col == permutations)
  //s+=(ee==Q)
}

*/


