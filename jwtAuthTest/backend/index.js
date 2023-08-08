import express from 'express'
import cors from 'cors'

const app = express()
// app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json())

app.listen(5000, () => console.log('Server running...'))