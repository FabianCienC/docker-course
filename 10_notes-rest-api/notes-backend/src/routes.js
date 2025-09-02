const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');
const { Note } = require('./models');

const notebooksApiUrl = process.env.NOTEBOOKS_API_URL


const noteRouter = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note ID" });
    }
    next();
}

noteRouter.post('/', async (req, res) => {
    try {
        const { title, content, notebookId } = req.body;

        let validateNotebookId = null;

        if (!notebookId) {
            console.info({
                message: "No notebookId provided, skipping validation"
            });
        } 
        else if (!mongoose.Types.ObjectId.isValid(notebookId)) {
            return res.status(404).json({ error: "Notebook not valid", notebookId });
        } 
        else {
            try {
                await axios.get(`${notebooksApiUrl}/${notebookId}`);
            } 
            catch (err) {
                const jsonError = err.toJSON();
                if (jsonError.status === 404) {
                    return res
                        .status(400)
                        .json({ error: "Notebook not found", notebookId });
                } 
                else {
                    console.error({
                        message: "Error verigynd notebookId. Notenooks service might be down, storign note with provided notebookId for later validation",
                        notebookId,
                        error: err.message
                    });
                    // Post somethin in queue for later validation
                }
            } 
            finally {
                validateNotebookId = notebookId;
            }
        }
            
        if (!title || !content) {
            return res
                .status(400)
                .json({ error: "title and content are required" });
        }

        const note = new Note({ title, content, notebookId: validateNotebookId });
        await note.save();
        res.status(201).json({ data: note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
noteRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ data: notes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
noteRouter.get('/:id', validateId, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ data: note });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
noteRouter.put('/:id', validateId, async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content }, 
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ data: note });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
noteRouter.delete('/:id', validateId, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});



noteRouter.get('/', (req, res) => {
    res.send('Hello from note route!');
});

module.exports = {
    noteRouter,
};