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
  const note = await Notes.findById(id);

  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }

  //   if (note.author.toString() !== req.user._id.toString()) {
  //     return res.status(401).json({ msg: "Not authorized" });
  //   }

  res.json(note);
};

const editNote = async (req, res) => {
  console.log("hello");
};

const deleteNote = async (req, res) => {
  console.log("hello");
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
