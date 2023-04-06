const express = require("express");
const { createNote, getNotes, deleteNote, updateNote } = require("../controllers/noteConteoller");
const noteRouter = express.Router();
const auth = require("../middleware/auth")

noteRouter.post("/", auth, createNote);

noteRouter.get("/", auth, getNotes);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;