import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error for debugging
  console.error(`Status: ${status}, Message: ${message}`);
  if (err.stack) console.error(err.stack);

  res.status(status).json({ message });
};

export default errorMiddleware;
