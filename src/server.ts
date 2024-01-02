import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
// import https from 'https'
import publicRoutes from './routes/public'
import { requestMiddleware } from './utils/requestMiddleware'

const app = express()
app.use(cors())
app.use(express.json())

app.all('*', requestMiddleware)
app.use('/', publicRoutes)

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
