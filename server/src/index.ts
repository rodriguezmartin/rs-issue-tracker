import express, { Express } from 'express'
import 'dotenv/config'

import memberRoutes from './entities/members/routes'
import issueRoutes from './entities/issues/routes'

const app: Express = express()

if (!process.env.ORGANIZATION || !process.env.REPOSITORY) {
  throw new Error('ORGANIZATION and REPOSITORY environment variables are required')
}

const { PORT = 5000 } = process.env

app.use('/members', memberRoutes)
app.use('/issues', issueRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
