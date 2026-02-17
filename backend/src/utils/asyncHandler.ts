import { Request, Response, NextFunction } from 'express';
import type { AsyncRouteHandler } from '../types';

const asyncHandler = (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
