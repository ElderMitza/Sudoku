const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
  exampleStr: { type: String, required: true },
  exampleArr: [String],
  exampleNum: { type: Number, default: 0 }
});

module.exports.exampleSchema = mongoose.model("example", exampleSchema);
