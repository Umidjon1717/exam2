import express from 'express'
import bodyParser from 'body-parser'
import Auth from './routes/auth_ctrl.js'
import User from './routes/user_ctrl.js'
import Boards from './routes/boards_ctrl.js'
import Task from './routes/task_ctrl.js'


import dotenv from 'dotenv'

dotenv.config()

const app = express()


const PORT = process.env.PORT || 3002

app.use(bodyParser.json())
app.use(Auth)
app.use(User)
app.use(Boards)
app.use(Task)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

