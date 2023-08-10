import pool from '../config/Database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export const DeleteAcc = async (req, res) => {
    //user login dulu sebelum delete
    try {
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);
      const user = result.rows[0];
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ msg: 'Password salah!' });

      try {
        const deleteQuery = 'DELETE FROM users WHERE id = $1';
        const deleteValues = [req.params.id];
        
        await pool.query(deleteQuery, deleteValues);
        res.status(200).json({ msg: 'Akun terhapus!' });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const LoginUser = async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE email = $1`, [req.body.email])
        const user = result.rows[0]
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({msg: 'Password salah!'})
        
        //masuk ke pembuatan TOKEN
        const userID = user.id
        const nameID = user.name
        const emailID = user.email
        const passID = user.password
        const accessTOKEN = jwt.sign({userID, nameID, emailID, passID}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '120s'})
        const refreshTOKEN = jwt.sign({userID, nameID, emailID, passID}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
        res.status(200).json({msg: 'Berhasil Login', accessTOKEN, refreshTOKEN})        
    } catch (error) {
        res.status(200).json({msg: 'Email tidak ditemukan'})
    }
}

export const LogoutUser = async(req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE email = $1`, [req.body.email])
        const user = result.rows[0]
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({msg: 'Password Anda Tidak Benar untuk Logout!'})
        res.status(200).json({msg: 'Logout Berhasil'})
    } catch (error) {
        res.status(200).json({msg: 'Email tidak ditemukan'})
    }
}