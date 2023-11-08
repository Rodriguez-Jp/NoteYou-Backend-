import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
