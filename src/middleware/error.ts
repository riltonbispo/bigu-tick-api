import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/api-errors'

export const errorMiddleware = (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500
  const message = err.statusCode ? err.message : 'Internal server Error'

  res.status(statusCode).json({ message })
}
