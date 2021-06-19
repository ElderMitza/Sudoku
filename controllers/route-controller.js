const SudokuSolver = require("./sudoku-solver");
const solver = new SudokuSolver();

const routeController = {
  checkPuzzle: (req, res) => {
    console.log("checkkk", req.body);
  },
  solvePuzzle: (req, res) => {
    const { puzzle } = req.body;
    const validationResult = solver.validate(puzzle);
    if (validationResult) {
      return res.json(validationResult);
    }
    const solvedString = solver.solve(puzzle);
    return res.json({ solution: solvedString });
  }
};

module.exports = routeController;
