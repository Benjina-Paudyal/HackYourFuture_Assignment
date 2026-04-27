import express from "express";
import db from "../../../database.js"

const router = express.Router();

// Get all
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!name) {
      return res.status(400).json({ error: "Missing tag name" });
    }

    const updated = await db("tags")
      .where({ id })
      .update({ name });

    if (!updated) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const updatedTag = await db("tags").where({ id }).first();

    res.json(updatedTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by Id
router.get("/:id", async (req, res) => {
  try {
    const row = await db("tags")
      .where({ id: req.params.id })
      .first();

    if (!row) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing tag name" });
    }

    const [id] = await db("tags").insert({ name });

    res.status(201).json({
      id,
      name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({error: "Invalid ID"});
    }

    if (!name) {
      return res.status(400).json({ error: "Missing tag name" });
    }

    const updated = await db("tags")
      .where({ id: req.params.id })
      .update({ name });

    if (!updated) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("tags")
      .where({ id: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;