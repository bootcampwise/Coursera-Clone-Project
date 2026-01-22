import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler'
import * as authService from '../services/auth.service';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.json(result);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser({ name, email, password });
  res.status(201).json(user);
});
