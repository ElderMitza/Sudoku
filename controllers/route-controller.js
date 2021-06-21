const SudokuSolver = require("./sudoku-solver");
const solver = new SudokuSolver();

const routeController = {
  checkPuzzle: (req, res) => {
    const { puzzle, coordinate, value } = req.body;
    const validationResult = solver.validateCheck(puzzle, coordinate, value);
    if (validationResult) {
      return res.json(validationResult);
    }
    const checkedResult = solver.check(puzzle, coordinate, value);
    return res.json(checkedResult);
  },
  solvePuzzle: (req, res) => {
    const { puzzle } = req.body;
    const validationResult = solver.validateSolve(puzzle);
    if (validationResult) {
      return res.json(validationResult);
    }
    const solvedString = solver.solve(puzzle);
    if (solvedString) {
      return res.json({ solution: solvedString });
    }
    return res.json({ error: "Puzzle cannot be solved" });
  }
};

module.exports = routeController;
