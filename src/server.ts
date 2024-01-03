import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import http from 'http'
import publicRoutes from './routes/public'
import userRoutes from './routes/auth'
import { requestMiddleware } from './middleware/request'
import { errorMiddleware } from './middleware/error'

const app = express()
app.use(cors())
app.use(express.json())

app.all('*', requestMiddleware)
app.use('/', publicRoutes)
app.use('/auth', userRoutes)
app.use(errorMiddleware)

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`APP runing at port: ${port}`)
  })
}

const devServer = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
  console.log('rodando em produção')
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000
  runServer(serverPort, devServer)
}
