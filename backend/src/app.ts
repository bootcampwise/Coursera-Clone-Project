import express from "express";
import path from "path";
import routes from "./routes";
import uploadRoutes from "./routes/upload.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routes
app.use("/api/v1/upload", uploadRoutes); // Mount upload routes specifically
app.use(routes); // Mount general routes

app.use(errorMiddleware);

export default app;
