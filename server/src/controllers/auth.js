const jwt = require('jsonwebtoken');

const createAccessToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}

const createRefreshToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY })
}

module.exports = {
    createAccessToken,
    createRefreshToken
}