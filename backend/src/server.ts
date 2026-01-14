import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import coursesRouter from "./routes/courses";
import { apiKeyAuth } from "./middleware/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(apiKeyAuth);
app.use("/courses", coursesRouter);

app.use((_, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
