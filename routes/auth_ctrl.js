import express from 'express'
import { Post_Register, Post_Login } from '../controllers/auth.js'

const router = express.Router()
router.post('/register', Post_Register)
router.post('/login', Post_Login)

export default router
