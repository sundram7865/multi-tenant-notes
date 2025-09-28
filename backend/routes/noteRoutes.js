const express = require("express");
const router = express.Router();
const { getNotes, createNote, getNote, updateNote, deleteNote } = require("../controllers/notesController");
const {protect} = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
