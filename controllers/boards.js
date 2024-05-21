import express from 'express';
import pool from '../config/db.js'
const router = express.Router()




export const GetAll = async (req, res) => {
    try {
        const result = await pool.query('select * from "board" ',)
        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}


export const selectById =async (req, res) => {
    const id = req.params.boardId;
    try {
        const result = await pool.query('select * from "board" where id=$1 ', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Board not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}


export const Post = async (req, res) => {
    const { title, columns } = req.body
    try {
        const result = await pool.query('Insert into "board"(title, columns) values($1, $2) RETURNING *',
            [title, columns])
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}


export const UpdateById = async (req, res) => {
    const id = parseInt(req.params.boardId);
    const { title, columns } = req.body
    try {
        const result = await pool.query('update "board" set title=$1, columns=$2 where id=$3 RETURNING *',
            [title, columns, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Board not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}


export const DeleteById =  async (req, res) => {
    const id = parseInt(req.params.boardId);
    try {
        const result = await pool.query('delete from "board" where id=$1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Board not found' })
        }
        res.status(204).json({ message: 'Board deleted successfully' })
        console.log('Deleted Successfully');
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}