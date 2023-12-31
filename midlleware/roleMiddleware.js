const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method  === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)
            if (!token) {
                return res.status(403).json({message: "Unauthorized1"})
            }
            const {roles: userRole} = jwt.verify(token, secret)
            let hasRole = false
            userRole.forEach(role =>{
                if (roles.includes(role)) { hasRole = true}
            })
            if (!hasRole) {
                return res.status(403).json({message: "U dont have permissions"})
            }
            next()
        }
        catch (e) {
            console.log(e)
            return res.status(403).json({message: "Unauthorized"})
        }
    }
}