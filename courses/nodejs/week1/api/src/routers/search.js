import express from "express";
import db from "../../../database.js"

const router = express.Router();

// GET /search?q=
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      const all = await db("snippets");
      return res.json(all);
    }

    const results = await db("snippets").where(function () {
      this.where("title", "like", `%${q}%`).orWhere(
        "contents",
        "like",
        `%${q}%`
      );
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /search
router.post("/", async (req, res) => {
  try {
    const { q } = req.query;
    const { fields } = req.body;

    if (!q && !fields) {
      return res.status(400).json({
        error: "You must provide either q or fields",
      });
    }

    if (q && fields) {
      return res.status(400).json({
        error: "Provide either q or fields, not both",
      });
    }

    if (q) {
      const results = await db("snippets").where(function () {
        this.where("title", "like", `%${q}%`).orWhere(
          "contents",
          "like",
          `%${q}%`
        );
      });

      return res.json(results);
    }

    if (fields?.tags) {
      const results = await db("snippets")
        .join("snippet_tags", "snippets.id", "snippet_tags.snippet_id")
        .join("tags", "tags.id", "snippet_tags.tag_id")
        .where("tags.name", fields.tags)
        .distinct()
        .select("snippets.*");

      return res.json(results);
    }

    const all = await db("snippets");
    res.json(all);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;