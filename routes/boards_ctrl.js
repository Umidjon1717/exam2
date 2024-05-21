import express from 'express'
import {GetAll, selectById, Post, UpdateById, DeleteById } from '../controllers/boards.js'

const router= express.Router()
router.get('/boards', GetAll)
router.get('/boards/:boardId', selectById)
router.post('/boards', Post)
router.put('/boards/:boardId', UpdateById)
router.delete('/boards/:boardId', DeleteById)

export default router