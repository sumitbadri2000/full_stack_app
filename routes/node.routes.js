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
  res.send({ msg: "something create"});
});

noteRouter.update("/update/:id", async (req, res) => {
  const noteID = req.params.id;
  const payload=req.body
  await NoteModel.findByIdAndUpdate({ __id: noteID },payload);
  res.send({msg:`update ${noteID}`});
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteID = req.params.id;
  await NoteModel.findByIdAndDelete({ __id: noteID });
  res.send({msg:`deleted ${noteID}`});
});
module.exports = { noteRouter };
