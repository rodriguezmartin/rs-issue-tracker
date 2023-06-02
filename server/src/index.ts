import express, { Express } from 'express'
import 'dotenv/config'

const app: Express = express()

const { PORT = 5000 } = process.env

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
