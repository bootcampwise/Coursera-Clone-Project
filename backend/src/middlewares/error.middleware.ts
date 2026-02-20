import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (err as { statusCode?: number }).statusCode || 500;
  const message =
    (err as { message?: string }).message || "Internal Server Error";

  res.status(status).json({ message });
};

export default errorMiddleware;
