class SudokuSolver {
  validateSolve(puzzleString) {
    const isValidPuzzleRegExp = /^[1-9.]{81}$/;
    if (!puzzleString) {
      return { error: "Required field missing" };
    } else if (puzzleString.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    } else if (!isValidPuzzleRegExp.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    return;
  }

  validateCheck(puzzleString, coordinate, value) {
    const transformedValue = value * 1;
    const isInvalidNumber = isNaN(transformedValue) || 1 > value || value > 9;

    const isValidPuzzleRegExp = /^[1-9.]{81}$/;
    const isValidGridCoordinate = /^[A-I|a-i][0-9]$/;
    if (!puzzleString || !coordinate || !value) {
      return { error: "Required field(s) missing" };
    } else if (puzzleString.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    } else if (!isValidPuzzleRegExp.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    } else if (isInvalidNumber) {
      return { error: "Invalid value" };
    } else if (!isValidGridCoordinate.test(coordinate)) {
      return { error: "Invalid coordinate" };
    }
    return false;
  }

  checkRowPlacement({ puzzleString, row, column, value }) {
    const gridFromPuzzle = this.convertPuzzleStringToGrid(puzzleString);
    if (
      gridFromPuzzle[row][column] !== 0 &&
      gridFromPuzzle[row][column] !== Number(value)
    ) {
      return false;
    }
    for (let i = 0; i < 9; i += 1) {
      if (gridFromPuzzle[row][i] === Number(value)) {
        if (i !== Number(column)) {
          return false;
        }
      }
    }
    return true;
  }

  checkColPlacement({ puzzleString, row, column, value }) {
    const gridFromPuzzle = this.convertPuzzleStringToGrid(puzzleString);
    if (
      gridFromPuzzle[row][column] !== 0 &&
      gridFromPuzzle[row][column] !== Number(value)
    ) {
      return false;
    }
    for (let i = 0; i < 9; i += 1) {
      if (gridFromPuzzle[i][column] === Number(value)) {
        if (i !== row) {
          return false;
        }
      }
    }
    return true;
  }

  checkRegionPlacement({ puzzleString, row, column, value }) {
    const gridFromPuzzle = this.convertPuzzleStringToGrid(puzzleString);
    const startRow = row + 1 - (row % 3);
    const startCol = column + 1 - (column % 3);
    return this.isSafeToPlaceNumberInRegion(
      gridFromPuzzle,
      startRow,
      startCol,
      value
    );
  }

  solve(puzzleString) {
    const gridForSolving = this.convertPuzzleStringToGrid(puzzleString);
    const solvedGrid = this.solveSudukoRecursionAlgorithm(gridForSolving, 0, 0);
    if (solvedGrid) {
      return this.convertGridToPuzzleString(solvedGrid);
    }
    return false;
  }

  check(puzzleString, coordinate, value) {
    const row = this.convertRowLetterToNumber(coordinate[0]);
    const column = coordinate[1] * 1 - 1;
    const params = { puzzleString, row, column, value };
    const conflicts = [];
    const isValidRow = this.checkRowPlacement(params);
    const isValidColumn = this.checkColPlacement(params);
    const isValidRegion = this.checkRegionPlacement(params);
    if (!isValidRow) {
      conflicts.push("row");
    }
    if (!isValidColumn) {
      conflicts.push("column");
    }
    if (!isValidRegion) {
      conflicts.push("region");
    }
    const isValidPlacement = conflicts.length === 0;
    if (isValidPlacement) {
      return { valid: true };
    }
    return { valid: false, conflicts };
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
    for (let i = 0; i <= 8; i++) if (grid[row][i] == num) return false;
    for (let i = 0; i <= 8; i++) if (grid[i][col] == num) return false;

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    return this.isSafeToPlaceNumberInRegion(grid, startRow, startCol, num);
  }
  isSafeToPlaceNumberInRegion(grid, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let ii = 0; ii < 3; ii++) {
        if (grid[i + startRow][ii + startCol] == num) {
          return false;
        }
      }
    }
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
  convertRowLetterToNumber(letterCharacter) {
    const letter = letterCharacter.toUpperCase();
    const lettersAndNumbersObj = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8
    };
    return lettersAndNumbersObj[letter];
  }
}

module.exports = SudokuSolver;
