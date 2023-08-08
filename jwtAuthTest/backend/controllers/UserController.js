import pool from '../config/Database'

export const getUsers = async(req, res) => {
    try {
        pool.query(`SELECT * FROM users`, (error, results) => {
            if (err) throw error
            res.status(200).json(results.row)
        })
    } catch (error) {
        console.log(error)
    }
}