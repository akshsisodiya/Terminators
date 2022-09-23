const mongoose = require("mongoose");

const JuiceSchema = mongoose.Schema({
  name: String,
  available: Number,
});

module.exports = mongoose.model("Juices", JuiceSchema);
