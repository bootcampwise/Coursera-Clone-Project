import { Router } from "express";
import { syncGoogleUser } from "../controllers/user.controller";

const router = Router();

router.post("/sync-google", syncGoogleUser);

export default router;
