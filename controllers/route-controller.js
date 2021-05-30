const SudokuSolver = require("./sudoku-solver");
const solver = new SudokuSolver();

const routeController = {
  checkPuzzle: (req, res) => {
    console.log("checkkk", req.body);
  },
  solvePuzzle: async (req, res) => {
    const { puzzle } = req.body;
    const validationResult = await solver.validate(puzzle);
    if (validationResult) {
      return res.json(validationResult);
    }
    // If necessary, handle the actual solving logic below...
  }
};

module.exports = routeController;
