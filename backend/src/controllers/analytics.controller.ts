import { Response } from "express";
import type { AuthenticatedRequest } from '../types';
import asyncHandler from "../utils/asyncHandler";
import * as analyticsService from "../services/analytics.service";

export const getAdminAnalytics = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const result = await analyticsService.getAdminAnalytics();
    res.json(result);
  },
);

export const getInstructorAnalytics = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await analyticsService.getInstructorAnalytics(userId);
    res.json(result);
  },
);
