import { Router } from 'express'
import getIssues from './handlers/getIssues'

const router = Router()

router.get('/', getIssues)

export default router
