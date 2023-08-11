import pool from "../config/Database.js";

export const getTodos = (req, res) => {
    try {
        const query = `SELECT * FROM todo WHERE userid=$1`
        const values = [req.params.userid]
        
        pool.query(query, values, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        })

    } catch (error) {
        res.status(403).json({msg: 'error dalam mengambil data'})
    }
}

export const createTodos = async(req,res) => {
    const { title, description, status, deadline } = req.body
    const query = `INSERT INTO todo (title, description, status, deadline, userid)
    VALUES ($1, $2, $3, $4, $5)`
    const values = [title, description, status, deadline, req.params.userid]

    try {
        await pool.query(query, values)
        res.status(201).json({msg: 'Todo Dibuat!'})
    } catch (error) {
        res.status(500).json({error: 'an error occurred while creating the todo item.'})
    }
}

export const deleteTodos = async (req,res) => {
    try {
        await pool.query(`DELETE FROM todo WHERE id=${req.params.id}`)
        res.status(200).json({msg: `Todo dengan id ${req.params.id} berhasil dihapus`})
    } catch (error) {
        res.status(500).json({error: "Error!!!"})
    }
}

export const updateTodos = async (req,res) => {
    const {title, description, status, deadline} = req.body
    const query = `UPDATE todo SET
    title = $1,
    description = $2,
    status = $3,
    deadline = $4,
    userid = $5
    WHERE id = $6`
    const values = [title, description, status, deadline, req.params.userid, req.params.id]

    try {
        await pool.query(query, values)
        res.status(200).json({msg: 'Todo Diupdate~'})
    } catch (error) {
        res.status(500).json({error: 'Error Occured ketika Update Todo!'})
    }
}