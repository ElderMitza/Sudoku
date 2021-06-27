const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
const puzzlesAndSolutions = require("../controllers/puzzle-strings");
const validPuzzleString = puzzlesAndSolutions.puzzlesAndSolutions[0][0];
const puzzleSolution = puzzlesAndSolutions.puzzlesAndSolutions[0][1];
const invalidCharacterPuzzleString =
  "..839.7.575..0..964..1..?....16.29846.9.312.7..754.a...62..5.78.8...3.2...492...1";
const invalidLengthPuzzleString = "..839.7.575..0..964";
const invalidPuzzleString =
  ".7.89.....599..3.4.2..4..1.5689..472...6.76..1.7.5.63873.1.2.8.6..47.1..2.9.387.6";

suite("UnitTests", () => {
  test("#1 -- Logic handles a valid puzzle string of 81 characters", done => {
    const result = solver.solve(validPuzzleString);
    assert.equal(result, puzzleSolution);
    done();
  });

  test("#2 -- Logic handles a puzzle string with invalid characters (not 1-9 or .)", done => {
    const result = solver.validateSolve(invalidCharacterPuzzleString);
    assert.deepEqual(result, { error: "Invalid characters in puzzle" });
    done();
  });

  test("#3 -- Logic handles a puzzle string that is not 81 characters in length", done => {
    const result = solver.validateSolve(invalidLengthPuzzleString);
    assert.deepEqual(result, {
      error: "Expected puzzle to be 81 characters long"
    });
    done();
  });

  test("#4 -- Logic handles a valid row placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 0,
      column: 1,
      value: 3
    };
    const result = solver.checkRowPlacement(params);
    assert.equal(result, true);
    done();
  });

  test("#5 -- Logic handles an invalid row placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 0,
      column: 1,
      value: 8
    };
    const result = solver.checkRowPlacement(params);
    assert.equal(result, false);
    done();
  });

  test("#6 -- Logic handles a valid column placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 1,
      column: 0,
      value: 9
    };
    const result = solver.checkColPlacement(params);
    assert.equal(result, true);
    done();
  });

  test("#7 -- Logic handles an invalid column placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 1,
      column: 0,
      value: 1
    };
    const result = solver.checkColPlacement(params);
    assert.equal(result, false);
    done();
  });

  test("#8 -- Logic handles a valid region (3x3 grid) placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 1,
      column: 0,
      value: 8
    };
    const result = solver.checkRegionPlacement(params);
    assert.equal(result, true);
    done();
  });

  test("#9 -- Logic handles an invalid region (3x3 grid) placement", done => {
    const params = {
      puzzleString: validPuzzleString,
      row: 1,
      column: 1,
      value: 6
    };
    const result = solver.checkRegionPlacement(params);
    assert.equal(result, false);
    done();
  });

  test("#10 -- Valid puzzle strings pass the solver", done => {
    const result = solver.solve(validPuzzleString);
    assert.notEqual(result, false);
    done();
  });

  test("#11 -- Invalid puzzle strings fail the solver", done => {
    const result = solver.solve(invalidPuzzleString);
    assert.equal(result, false);
    done();
  });

  test("#12 -- Solver returns the expected solution for an incomplete puzzle", done => {
    const result = solver.solve(validPuzzleString);
    assert.equal(result, puzzleSolution);
    done();
  });
});
