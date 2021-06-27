const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const puzzlesAndSolutions = require("../controllers/puzzle-strings");
const validPuzzleString = puzzlesAndSolutions.puzzlesAndSolutions[0][0];
const puzzleSolution = puzzlesAndSolutions.puzzlesAndSolutions[0][1];
const invalidCharacterPuzzleString =
  "..839.7.575..0..964..1..?....16.29846.9.312.7..754.a...62..5.78.8...3.2...492...1";
const invalidLengthPuzzleString = "..839.7.575..0..964";

suite("Functional Tests", () => {
  suite("Solve Sudoku Functional Tests", () => {
    test("#1 -- Solve a puzzle with valid puzzle string: POST request to /api/solve", done => {
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString })
        .end((err, res) => {
          assert.deepEqual(res.body, { solution: puzzleSolution });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#2 -- Solve a puzzle with missing puzzle string: POST request to /api/solve", done => {
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({})
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Required field missing" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#3 -- Solve a puzzle with invalid characters: POST request to /api/solve", done => {
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: invalidCharacterPuzzleString })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#4 -- Solve a puzzle with incorrect length: POST request to /api/solve", done => {
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: invalidLengthPuzzleString })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long"
          });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#5 -- Solve a puzzle that cannot be solved: POST request to /api/solve", done => {
      chai
        .request(server)
        .post("/api/solve")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: invalidLengthPuzzleString })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long"
          });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });

  suite("Check Sudoku Functional Tests", () => {
    test("#6 -- Check a puzzle placement with all fields: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString, coordinate: "B5", value: 8 })
        .end((err, res) => {
          assert.deepEqual(res.body, { valid: true });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#7 -- Check a puzzle placement with single placement conflict: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString, coordinate: "B5", value: 9 })
        .end((err, res) => {
          assert.deepEqual(res.body, { conflict: ["region"], valid: false });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#8 -- Check a puzzle placement with multiple placement conflicts: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString, coordinate: "D6", value: 1 })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            conflict: ["row", "column"],
            valid: false
          });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#9 -- Check a puzzle placement with all placement conflicts: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString, coordinate: "D2", value: 6 })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            conflict: ["row", "column", "region"],
            valid: false
          });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#10 -- Check a puzzle placement with missing required fields: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ puzzle: validPuzzleString, coordinate: "D2" })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Required field(s) missing" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#11 -- Check a puzzle placement with invalid characters: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: invalidCharacterPuzzleString,
          coordinate: "D2",
          value: 6
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#12 -- Check a puzzle placement with incorrect length: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: invalidLengthPuzzleString,
          coordinate: "D2",
          value: 6
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: "Expected puzzle to be 81 characters long"
          });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#13 -- Check a puzzle placement with invalid placement coordinate: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: validPuzzleString,
          coordinate: "N4",
          value: 6
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid coordinate" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });

    test("#14 -- Check a puzzle placement with invalid placement value: POST request to /api/check", done => {
      chai
        .request(server)
        .post("/api/check")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          puzzle: validPuzzleString,
          coordinate: "D2",
          value: 0
        })
        .end((err, res) => {
          assert.deepEqual(res.body, { error: "Invalid value" });
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});
