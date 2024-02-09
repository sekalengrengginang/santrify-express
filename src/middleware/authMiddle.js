// TODO authmiddleware
const jwt = require('jsonwebtoken')
const authValid = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    if (token == null) return res.send('token not found!')

    jwt.verify(token, process.env.JWT_TOKEN, (error, user) => {
        if ((error)) return res.send('error!')
        req.user
        next()
    });
}
module.exports = authValid