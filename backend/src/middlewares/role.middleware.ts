import { Request, Response, NextFunction } from 'express';

export const requireRole = (roles: string[]) => (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;
  if (!userRole || !roles.includes(userRole)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

export default requireRole;
