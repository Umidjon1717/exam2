import express from 'express';
import pool from '../config/db.js'



export const GetAll= async(req, res)=>{
    try{   
        const result = await pool.query('select * from "user" ',)
        res.status(201).json({name: result.rows[0].name, email: result.rows[0].email});

    }catch(err){
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}


export const selectById= async(req, res)=>{
    const id = req.params.id;
    try{
        const result=await pool.query('select * from "user" where id=$1',[id])
        if(result.rows.length===0){
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json({name:result.rows[0].name, email: result.rows[0].email})
    }catch(err){
        res.status(500).json({error: err.message})
        console.log(err);
    }
}


export const UpdateById=async(req, res)=>{
    const id = parseInt(req.params.id);
    const{name, email, password}=req.body
    try{
        const result= await pool.query('update "user" set name=$1, email=$2, password=$3 where id=$4 RETURNING *', 
        [name, email, password, id])

        if(result.rows.length===0){
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


export const DeleteById= async(req, res)=>{
    const id = parseInt(req.params.id);
    try{
        const result= await pool.query('delete from "user" where id=$1 RETURNING *', [id])
        if(result.rows.length===0){
            return res.status(404).json({error: 'User not found'})
        }
        res.status(204).json({message:'User deleted successfully'})
        console.log('User deleted successfully');
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
