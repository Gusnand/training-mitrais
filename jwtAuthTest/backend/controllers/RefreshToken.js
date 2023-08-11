import jwt, { decode } from 'jsonwebtoken'

export const refreshToken = async(req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const refreshToken = authHeader && authHeader.split(' ')[1]
        if (!refreshToken){
            return res.sendStatus(401)
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403)
            //pembuatan token
            const userID = decoded.id
            const nameID = decoded.name
            const emailID = decoded.email
            const passID = decoded.password

            const accessToken = jwt.sign({userID, nameID, emailID, passID}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '50s'
            })
            res.json({accessToken})
        })
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}