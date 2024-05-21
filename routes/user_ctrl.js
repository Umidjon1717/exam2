import express from 'express'
import { GetAll, selectById, UpdateById, DeleteById } from '../controllers/user.js'

const router = express.Router()

router.get('/user', GetAll)
router.get('/user:id', selectById)
router.put('/user:id', UpdateById)
router.delete('/user:id', DeleteById)

export default router