const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        notebookId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Note", NotesSchema);

module.exports = {
    Note,
}