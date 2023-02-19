const express = require("express");
const { NoteModel } = require("../model/node.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const notes = await NoteModel.find();
  res.send(notes);
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const note = new NoteModel(payload);
  await note.save();
  res.send("create");
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  await NoteModel.findByIdAndDelete({ __id: noteID });
  res.send(`delete ${noteID}`);
});
module.exports = { noteRouter };