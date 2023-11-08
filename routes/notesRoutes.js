import express from "express";
import {
  createNote,
  listNotes,
  showNote,
  editNote,
  deleteNote,
  addCollaborator,
  deleteCollaborator,
} from "../controllers/notesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, listNotes).post(checkAuth, createNote);
router
  .route("/:id")
  .get(checkAuth, showNote)
  .put(checkAuth, editNote)
  .delete(checkAuth, deleteNote);

router.post("/add-collab/:id", checkAuth, addCollaborator);
router.post("/delete-collab/:id", checkAuth, deleteCollaborator);

export default router;
