import jwt from 'jsonwebtoken'

export const verifyRefreshToken = async(req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token==null) return res.sendStatus(401)
    try {
        const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if(data){
            next()
        }else{
            res.status(403).json({msg: 'data tidak ada'})
        }
    } catch (error) {
        res.status(403).json({msg: 'catch error verify reftoken'})
    }
}