const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotebooksSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Notebook = mongoose.model("Notebook", NotebooksSchema);

module.exports = {
    Notebook,
}