import express from "express";
import db from "../../../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import crypto from "crypto";
import authToken from "../middleware/authToken.js";
import { requireRole } from "../middleware/role-base.js";

const router = express.Router();

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

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing search query (q)" });
    }

    const data = await db("snippets").where(function () {
      this.where("title", "like", `%${q}%`).orWhere(
        "contents",
        "like",
        `%${q}%`,
      );
    });

    if (data.length === 0) {
      return res.status(404).json({ error: "No snippets found" });
    }

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await db("snippets").where({ user_id: userId });

    if (data.length === 0) {
      return res.status(404).json({ error: "No snippets for this user" });
    }

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const { title, contents } = req.body;
    const user_id = req.user.userId;

    if (!title?.trim() || !contents?.trim()) {
      return res.status(400).json({ error: "Missing title or contents" });
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

router.get("/:id", async (req, res) => {
  try {
    const row = await db("snippets").where({ id: req.params.id }).first();

    if (!row) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

router.delete("/:id", authToken, requireRole("admin"), async (req, res) => {
  try {
    const deleted = await db("snippets").where({ id: req.params.id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.json({ message: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

    const snippet = await db("snippets").where({ id: snippetId }).first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const tag = await db("tags").where({ id: tagId }).first();

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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role // just faking it for now not really in Database
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: "1h" 
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login-token", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await db("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await db("tokens").insert({
      user_id: user.id,
      token,
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout-token", async (req, res) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(400).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];

    await db("tokens").where({ token }).del();

    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existing = await db("users").where({ email }).first();
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [id] = await db("users").insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
