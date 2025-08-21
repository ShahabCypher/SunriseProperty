import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", apiRouter);

export default app;
