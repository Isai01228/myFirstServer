const jwt = require(`jsonwebtoken`)

exports.tokenVerify = async(req, res, next) => {
    const token = req.get(`token`)
    jwt.verify(token, process.env.JWTSECRET.toString(), (err, decodedToken) => {
        if (err) return res.status(401).json({ ok: false, err })

        req.user = decodedToken.user
        next()
    })
}