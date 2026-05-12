I used JWT for authentication in this project.

Users log in with their email and password. The password is checked using bcrypt.

If the login is correct, the server creates a JWT token and sends it back to the user.

The token must be included in the request header as:
Authorization: Bearer <token>

A middleware checks the token and allows or blocks access. It also handles errors like missing, invalid, or expired tokens.

The API uses simple role-based logic. The role is included in the JWT token (not stored in the database). Based on this role, some actions like deleting snippets are restricted to certain users.

All users can read snippets, logged-in users can create snippets, and only specific users are allowed to delete snippets.