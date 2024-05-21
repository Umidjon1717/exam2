import express from 'express';
import pool from '../config/db.js'
const router = express.Router()




export const GetAll =  async (req, res) => {
    try {
        const result = await pool.query('select * from "task" RETURNING *',)
        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}



export const selectById =  async (req, res) => {
    const id = parseInt(req.params.taskId);
    try {
        const result = await pool.query('select * from books where id=$1 ', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}

export const Post = async (req, res) => {
    const { title, order, description } = req.body
    try {
        const result = await pool.query('Insert into "task" ("title", "order", "description") values($1, $2, $3) RETURNING *',
            [title, order, description])
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}


export const UpdateById =  async (req, res) => {
    const id = parseInt(req.params.taskId);
    const { title, order, description } = req.body
    try {
        const result = await pool.query('update "task" set title=$1, order=$2, description=$3 where id=$4 RETURNING *',
            [title, order, description, id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}


export const DeleteById =  async (req, res) => {
    const id = parseInt(req.params.taskId);
    try {
        const result = await pool.query('delete from "task" where id=$1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.status(204).json({ message: 'Task deleted successfully' })
        console.log('Task deleted successfully');
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}