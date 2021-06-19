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
    const gridForSolving = this.convertPuzzleStringToGrid(puzzleString);
    const solvedGrid = this.solveSudukoRecursionAlgorithm(gridForSolving, 0, 0);
    if (solvedGrid) {
      return this.convertGridToPuzzleString(solvedGrid);
    }
    return false;
  }

  solveSudukoRecursionAlgorithm(grid, row, col) {
    const matrixSize = 9;
    if (row == matrixSize - 1 && col == matrixSize) {
      return grid;
    }
    if (col == matrixSize) {
      row++;
      col = 0;
    }
    if (grid[row][col] != 0) {
      return this.solveSudukoRecursionAlgorithm(grid, row, col + 1);
    }
    for (let num = 1; num < 10; num++) {
      if (this.isSafeToPlaceNumber(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.solveSudukoRecursionAlgorithm(grid, row, col + 1)) return grid;
      }
      grid[row][col] = 0;
    }
    return false;
  }

  isSafeToPlaceNumber(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    let startRow = row - (row % 3),
      startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;

    return true;
  }

  convertPuzzleStringToGrid(puzzleString) {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let currentRow = -1;
    let currentColumn = 0;
    for (let i = 0; i < puzzleString.length; i += 1) {
      if (i % 9 === 0) {
        currentRow += 1;
      }
      if (currentColumn % 9 === 0) {
        currentColumn = 0;
      }
      grid[currentRow][currentColumn] =
        puzzleString[i] === "." ? 0 : +puzzleString[i];
      currentColumn += 1;
    }
    return grid;
  }
  convertGridToPuzzleString(grid) {
    return grid.flat().join("");
  }
}

module.exports = SudokuSolver;
