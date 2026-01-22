import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export default app;
