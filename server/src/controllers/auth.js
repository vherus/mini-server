const jwt = require('jsonwebtoken');

// function generateJwt(userId) {
//     return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
// }

const createAccessToken = (email) => {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}

const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY })
}


module.exports = {
    createAccessToken,
    createRefreshToken
}