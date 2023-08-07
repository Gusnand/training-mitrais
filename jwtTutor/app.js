const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to API'
    })
})

app.post('/api/posts', (req, res) => {
    res.json({
        message: 'posts dibuat'
    })
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'gus',
        email: 'gus@gmail.com'
    }

    jwt.sign({user:user}, 'pass', (err, token) => {
        res.json({
            token
        })
    })
})

app.listen(5000, () => console.log('Server 5000'))