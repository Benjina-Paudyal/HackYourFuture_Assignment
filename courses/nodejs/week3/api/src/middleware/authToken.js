export default async function authToken(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];

    const dbToken = await db("tokens").where({ token }).first();

    if (!dbToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = { id: dbToken.user_id };

    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
