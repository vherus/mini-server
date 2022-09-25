const jwt = require('jsonwebtoken');

const createAccessToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}

const createRefreshToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY })
}

module.exports = {
    createAccessToken,
    createRefreshToken
}