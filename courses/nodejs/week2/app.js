import express from "express";
import snippetsRouter from "./api/src/routers/snippets.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = YAML.load("./openapi.yml");

app.use(express.json());
app.use("/api/snippets", snippetsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});