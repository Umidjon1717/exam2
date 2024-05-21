import express from 'express'
import { GetAll, selectById, Post, UpdateById, DeleteById } from '../controllers/task.js'

const router = express.Router()
router.get('/boards/:boardId', GetAll)
router.get('boards/:boardId/tasks', selectById)
router.post('/boards/tasks', Post)
router.put('/boards/:boardId', UpdateById)
router.delete('/boards/:boardId', DeleteById)

export default router