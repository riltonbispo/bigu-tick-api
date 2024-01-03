import { RequestHandler } from 'express'

export const requestMiddleware: RequestHandler = (req, res, next) => {
  console.log(
    `--> ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`,
  )
  next()
}
