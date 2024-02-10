// TODO authmiddleware and refresh token
const jwt = require('jsonwebtoken')
const authValid = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(403)
    jwt.verify(token, process.env.JWT_TOKEN, (error) => {
        if (error){
            res.sendStatus(403)
        }else{
            next()
        }
    });
}
module.exports = authValid