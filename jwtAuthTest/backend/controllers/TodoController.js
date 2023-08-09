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