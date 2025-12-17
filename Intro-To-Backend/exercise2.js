import express from "express";
import knex from "knex";

const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static("public"));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to SQLite database using Knex
const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./tasks.sqlite3",
  },
  useNullAsDefault: true,
});

// 1. Get all users sorted by ID ascending
app.get("/all-users", async (req, res) => {
  try {
    const rows = await db.raw("SELECT * FROM user ORDER BY id ASC;");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get a specific user by id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await db.raw("SELECT * FROM user WHERE id = ?;", [id]);

    // If no user found
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get all unconfirmed users
app.get("/unconfirmed-users", async (req, res) => {
  try {
    const rows = await db.raw("SELECT * FROM user WHERE confirmed = 0 ORDER BY id ASC;");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 4. Get all users with a Gmail email
app.get("/gmail-users", async (req, res) => {
  try {
    const rows = await db.raw("SELECT * FROM user WHERE email LIKE '%@gmail.com' ORDER BY id ASC;");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 5. Get all users created in 2022
app.get("/2022-users", async (req, res) => {
  try {
    const rows = await db.raw(
      "SELECT * FROM user WHERE strftime('%Y', created_at) = '2022' ORDER BY id ASC;"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Count of users created in 2022
app.get("/2022-user-count", async (req, res) => {
  try {
    const rows = await db.raw(
      "SELECT COUNT(*) AS count FROM user WHERE strftime('%Y', created_at) = '2022';"
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 7. Get count of users grouped by last name
app.get("/last-name-count", async (req, res) => {
  try {
    const rows = await db.raw(`
      SELECT last_name, COUNT(*) AS count
      FROM user
      GROUP BY last_name
      ORDER BY last_name ASC;
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Get the first user by ID
app.get("/first-user", async (req, res) => {
  try {
    const rows = await db.raw(
      "SELECT * FROM user ORDER BY id ASC LIMIT 1;"
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 9. Get all confirmed users
app.get("/confirmed-users", async (req, res) => {
  try {
    const rows = await db.raw(
      "SELECT * FROM user WHERE confirmed = 1 ORDER BY id ASC;"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 10. Get the latest 5 users
app.get("/latest-users", async (req, res) => {
  try {
    const rows = await db.raw(
      "SELECT * FROM user ORDER BY created_at DESC LIMIT 5;"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. Get users by email domain (dynamic)
app.get("/users/email-domain/:domain", async (req, res) => {
  const { domain } = req.params;

  try {
    const rows = await db.raw(
      "SELECT * FROM user WHERE email LIKE ? ORDER BY id ASC;",
      [`%@${domain}`]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 12. Counting total users
app.get("/user-count", async (req, res) => {
  try {
    const rows = await db.raw("SELECT COUNT(*) AS count FROM user;");
    res.json(rows[0]); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 13. POST route to add a new user
app.post("/new-user", async (req, res) => {
  const { id, name, email, phone } = req.body;

  // Validate required input
  if (
    !id ||
    !name || name.trim().length === 0 ||
    !email || email.trim().length === 0
  ) {
    return res.status(400).json({ error: "Invalid input data: id, name, and email are required" });
  }

  const created_at = new Date().toISOString();

  try {
    // Insert the new user
    await db.raw(
      `INSERT INTO user (id, name, email, phone,created_at) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, phone || null, created_at ]
    );

    res.status(201).json({
      message: "User created successfully",
      data: { id, name, email, phone: phone || null, created_at},
    });
  } catch (error) {
    // Handle possible errors like duplicate id
    res.status(500).json({ error: error.message });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
