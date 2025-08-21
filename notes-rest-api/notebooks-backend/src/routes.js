const express = require('express');
const mongoose = require("mongoose");
const { Notebook } = require('./models');

const notebookRouter = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid notebook ID" });
    }
    next();
}

notebookRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const notebook = new Notebook({ name, description });
        await notebook.save();
        res.status(201).json({ data: notebook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
notebookRouter.get('/', async (req, res) => {
    try {
        const notebooks = await Notebook.find();
        res.status(200).json({ data: notebooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
notebookRouter.get('/:id', validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findById(req.params.id);
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }
        res.status(200).json({ data: notebook });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
notebookRouter.put('/:id', validateId, async (req, res) => {
    try {
        const { name, description } = req.body;
        const notebook = await Notebook.findByIdAndUpdate(
            req.params.id, 
            { name, description }, 
            { new: true }
        );
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }
        res.status(200).json({ data: notebook });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
notebookRouter.delete('/:id', validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findByIdAndDelete(req.params.id);
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found" });
        }
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});



notebookRouter.get('/', (req, res) => {
    res.send('Hello from notebooks route!');
});

module.exports = {
    notebookRouter,
};