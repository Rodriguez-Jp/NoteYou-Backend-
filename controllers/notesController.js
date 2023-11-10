import Notes from "../models/Notes.js";

const createNote = async (req, res) => {
  const note = new Notes(req.body);
  note.author = req.user.id;
  console.log(note);

  try {
    const savedNote = await note.save();
    return res.json(savedNote);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "There was an error" });
  }
};

const listNotes = async (req, res) => {
  const notes = await Notes.find().where("author").equals(req.user);
  res.json(notes);
};

const showNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);

    if (!note) {
      const error = new Error("Note not found");
      return res.status(404).json({ msg: error.message });
    }

    if (note.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized");
      return res.status(404).json({ msg: error.message });
    }
    res.json(note);
  } catch (error) {
    res.status(404).json({ msg: "Invalid Id" });
  }
};

const editNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);

    if (!note) {
      const error = new Error("Note not found");
      return res.status(404).json({ msg: error.message });
    }

    if (note.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized");
      return res.status(404).json({ msg: error.message });
    }

    note.title = req.body.title || note.title;
    note.description = req.body.description || note.description;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(404).json({ msg: "Invalid Id" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);

    if (!note) {
      const error = new Error("Note not found");
      return res.status(404).json({ msg: error.message });
    }

    if (note.author.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized");
      return res.status(404).json({ msg: error.message });
    }

    await note.deleteOne();
    res.json({ msg: "Note deleted" });
  } catch (error) {
    res.status(404).json({ msg: "Invalid Id" });
  }
};

const addCollaborator = async (req, res) => {
  console.log("hello");
};

const deleteCollaborator = async (req, res) => {
  console.log("hello");
};

export {
  createNote,
  listNotes,
  showNote,
  editNote,
  deleteNote,
  addCollaborator,
  deleteCollaborator,
};
