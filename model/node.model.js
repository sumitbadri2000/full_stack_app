const mongoose = require("mongoose");

const nodeSchema = mongoose.Schema({
  title: String,
  note: String,
  category: String,
});

const NoteModel = mongoose.model("note", nodeSchema);

module.exports = { NoteModel };
