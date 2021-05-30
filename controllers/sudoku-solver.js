class SudokuSolver {
  validate(puzzleString) {
    const isValidPuzzleRegExp = /^[0-9.]{81}$/;
    if (!puzzleString) {
      return { error: "Required field missing" };
    } else if (puzzleString.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    } else if (!isValidPuzzleRegExp.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    return;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    console.log("checkRowPlacement");
  }

  checkColPlacement(puzzleString, row, column, value) {
    console.log("checkColPlacement");
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    console.log("checkRegionPlacement");
  }

  solve(puzzleString) {
    console.log("solve");
  }
}

module.exports = SudokuSolver;
