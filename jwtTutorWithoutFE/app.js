const express = require('express');
const jwt = require('jsonwebtoken');

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'pass', (err, authData) => {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Post berhasil',
                authData
            })
        }
    })
    
})

app.post('/api/login' , (req, res) => {
    // mockup user
    const user = {
        id: 1,
        username: 'gus',
        email: 'gus@gmail.com'
    }

    jwt.sign({user:user}, 'pass', (err, token) => {
        res.json({token})
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}


app.listen(5000, () => console.log('Server Mulai pada port 5000'))