import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });
  const [, token] = auth.split(" ");
  try {
    const payload = verifyToken(token as string) as any;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
