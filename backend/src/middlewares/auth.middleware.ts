import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query.token) {
    token = req.query.token as string;
  }

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = verifyToken(token) as any;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
