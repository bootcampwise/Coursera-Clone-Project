import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { prisma } from "../config/prisma";

/**
 * @desc    Get transcript for a specific lesson
 * @route   GET /api/lessons/:id/transcript
 * @access  Private
 */
export const getTranscript = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // Querying with where clause to find all lines for the lesson
    const transcript = await prisma.transcriptLine.findMany({
      where: {
        lessonId: id as string,
      },
      orderBy: {
        order: "asc",
      },
    });

    res.json(transcript);
  },
);
