import express from "express";
import db from "../../../database.js"

const router = express.Router();




// Week 2: Part A - Demonstrate and fix SQL injection
// Get all
router.get("/", async (req, res) => {
  try {
    let query = db.select("*").from("snippets");

    const allowedColumns = ["id", "title", "created_at"];
    const allowedDirections = ["asc", "desc"];

    if (req.query.sort) {
      const parts = req.query.sort.toString().split(" ");

      const column = parts[0];
      const direction = parts[1] ? parts[1].toLowerCase() : "asc";

      if (!allowedColumns.includes(column)) {
        return res.status(400).json({ error: "Invalid sort column" });
      }

      if (!allowedDirections.includes(direction)) {
        return res.status(400).json({ error: "Invalid sort direction" });
      }

      query = query.orderBy(column, direction);
    }

    console.log("SAFE SQL", query.toSQL().sql);

    const data = await query;
    res.json({ data });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});


// /api/snippets/search?title=....
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing search query (q)" });
    }

    const data = await db("snippets").where(function () {
  this.where("title", "like", `%${q}%`)
      .orWhere("contents", "like", `%${q}%`);
});

    if (data.length === 0) {
      return res.status(404).json({ error: "No snippets found" });
    }

    res.json({ data });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Part B - Extend the Snippets API
// /api/snippets/user/1
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await db("snippets")
      .where({ user_id: userId });

    if (data.length === 0) {
      return res.status(404).json({ error: "No snippets for this user" });
    }

    res.json({ data });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// Part C - Error handling and validation
router.post("/", async (req, res) => {
  try {
    const { title, contents, user_id } = req.body;

    if (!title?.trim() || !contents?.trim() || !user_id) {
      return res.status(400).json({ error: "Missing title, contents, or user_id" });
    }

    if (isNaN(Number(user_id))) {
      return res.status(400).json({ error: "Invalid user_id" });
    }

    const [id] = await db("snippets").insert({
      title,
      contents,
      user_id,
    });

    res.status(201).json({ id, title, contents, user_id });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// FROM WEEK 1 

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const row = await db("snippets")
      .where({ id: req.params.id })
      .first();

    if (!row) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;

    const updated = await db("snippets")
      .where({ id: req.params.id })
      .update({ title, contents });

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json({ message: "Snippet updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db("snippets")
      .where({ id: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json({ message: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Link tag to snippet (many to many relation)
router.post("/:id/tags", async (req, res) => {
  try {
    const snippetId = Number(req.params.id);
    const { tagId } = req.body;

    if (isNaN(snippetId)) {
      return res.status(400).json({ error: "Invalid snippet ID" });
    }

    if (!tagId || isNaN(Number(tagId))) {
      return res.status(400).json({ error: "Missing or invalid tagId" });
    }

    const snippet = await db("snippets")
      .where({ id: snippetId })
      .first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const tag = await db("tags")
      .where({ id: tagId })
      .first();

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const existing = await db("snippet_tags")
      .where({ snippet_id: snippetId, tag_id: tagId })
      .first();

    if (existing) {
      return res.status(400).json({
        error: "Tag already linked to this snippet",
      });
    }

    await db("snippet_tags").insert({
      snippet_id: snippetId,
      tag_id: tagId,
    });

    res.status(201).json({
      message: "Tag added to snippet",
      snippetId,
      tagId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;