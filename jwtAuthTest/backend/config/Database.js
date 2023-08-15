import pkg from 'pg'
const {Pool} = pkg

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'todolist',
    user: 'postgres',
    password: 'admin123'
})

export default pool