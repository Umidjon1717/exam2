import express from 'express';
import pool from '../config/db.js'
import bcrypt from 'bcrypt'

export const Post_Register = async (req, res) => {

    const { name, email, password } = req.body
    const parol = password
    const rounds = 10
    const salt = await bcrypt.genSaltSync(rounds)
    const hash = await bcrypt.hashSync(parol, salt)
    try {
        const result = await pool.query('insert into "user"(name, email, password) values($1, $2, $3) RETURNING *',
            [name, email, hash])
            console.log(result)
        res.status(200).json(result.rows[0])

    } catch (err) {
        res.status(500).json({ err })
        console.log(err);
    }
}

export const Post_Login = async (req, res) => {
    const { name, password } = req.body
    try {
        const result = await pool.query('select * from "user" where name=$1',
            [name])
        const check= bcrypt.compareSync(password, result.rows[0].password)
        if (check) {
            res.status(200).json({name: result.rows[0].name, email: result.rows[0].email})
        } else {
            res.status(404).json('Not Found or Wrong Password')
        }


    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log(err);
    }
}