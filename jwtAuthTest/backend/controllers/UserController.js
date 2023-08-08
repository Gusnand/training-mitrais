import pool from '../config/Database.js'
import bcrypt from 'bcrypt'


export const getUsers = async(req, res) => {
    try {
        pool.query(`SELECT * FROM users`, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.log(error)
    }
}

export const Regist = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: 'password tidak sama!'})

    const salt = await bcrypt.genSalt()
    const hashPass = await bcrypt.hash(password, salt)
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`
    const values = [name, email, hashPass]
    try {
        await pool.query(query, values)
        res.status(200).json({msg: 'Register Berhasil'})
    } catch (error) {
        console.log(error);
    }
}