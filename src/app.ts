import express from "express";
import cors from "cors";
import router from "./Routes";
import { errorHandler } from "./Middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Mount ALL API routes under /api/v1
app.use("/api/v1", router);

// Error handler MUST be last
app.use(errorHandler);

export default app;
