import { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from '../types';

export const requireRole =
  (allowedRoles: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role?.toLowerCase();

    
    const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());

    
    if (normalizedAllowedRoles.includes("admin")) {
      normalizedAllowedRoles.push("administrator");
    }

    if (!userRole || !normalizedAllowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

export default requireRole;
