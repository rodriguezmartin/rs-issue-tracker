import { Router } from 'express'
import getMembers from './handlers/getMembers'

const router = Router()

router.get('/', getMembers)

export default router
